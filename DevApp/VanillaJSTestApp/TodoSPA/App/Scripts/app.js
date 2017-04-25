
var logger = new Msal.Logger(Msal.Utils.createNewGuid());
logger.level = Msal.LogLevel.Info;
logger.localCallback = function (level, message, containsPii) {
    console.log(message);
}
document.getElementById('scopesButton').value = 'user.read';

var userAgentApplication = new Msal.UserAgentApplication("0813e1d1-ad72-46a9-8665-399bba48c201", null, function (errorDes, token, error, tokenType) {
    console.log(tokenType);
    var user = userAgentApplication.getUser();
    if (user) {
        $signInButton.hide();
        $signOutButton.show();
    } else {
        $signInButton.show();
        $signOutButton.hide();
    }
});

$("select").on('focus', function () {
    // Store the current value on focus and on change
    previous = this.value;
}).change(function () {
    // Do something with the previous value after the change
    // Make sure the previous value is updated
    userAgentApplication.interactionMode = this.value;
});

// Get UI jQuery Objects
var $panel = $(".panel-body");
var $signInButton = $(".app-login");
var $signOutButton = $(".app-logout");
var $acquireTokenSilentButton = $(".app-acquireTokenSilent");
var $acquireTokenRedirectButton = $(".app-acquireTokenRedirect");
var $acquireTokenPopupButton = $(".app-acquireTokenPopup");

$signOutButton.click(function () {
    userAgentApplication.logout();
});

$signInButton.click(function () {
    var authenticationModes = document.getElementById("AuthenticationModes");
    var mode = authenticationModes.options[authenticationModes.selectedIndex].value;
    userAgentApplication.interactionMode = mode;
    if (userAgentApplication.interactionMode === 'redirect') {
        userAgentApplication.loginRedirect(['contacts.read', 'user.read']);
    }
    else {
        userAgentApplication.loginPopup().then(function (token) {
            var user = userAgentApplication.getUser();
            if (user) {
                $signInButton.hide();
                $signOutButton.show();
            } else {
                $signInButton.show();
                $signOutButton.hide();
            }
        }, function (error) {
            console.log(error);
        });
    }

});

$acquireTokenSilentButton.click(function () {
    var scopes = document.getElementById('scopesButton').value;
    scopes = scopes.split(' ');
    userAgentApplication.acquireTokenSilent(scopes).then(function (token) {
        console.log("ATS promise resolved");
    }, function (error) {
        console.log("ATS promise rejected");
    });


});

$acquireTokenRedirectButton.click(function () {
    var scopes = document.getElementById('scopesButton').value;
    scopes = scopes.split(' ');
    userAgentApplication.acquireTokenRedirect(scopes);

});

$acquireTokenPopupButton.click(function () {
    var scopes = document.getElementById('scopesButton').value;
    scopes = scopes.split(' ');
    userAgentApplication.acquireTokenPopup(scopes).then(function (token) {
        console.log("ATP promise resolved");
    }, function (error) {
        console.log("ATP promise rejected");
    });

});

var isCallback = userAgentApplication.isCallback(window.location.hash);
if (isCallback)
    userAgentApplication.handleAuthenticationResponse(window.location.hash);

var user = userAgentApplication.getUser();
if (user) {
    $signInButton.hide();
    $signOutButton.show();
} else {
    $signInButton.show();
    $signOutButton.hide();
}