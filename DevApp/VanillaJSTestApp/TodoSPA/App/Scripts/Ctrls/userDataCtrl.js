/// <reference path="../Msal.js" />
console.log(Msal);
(function() {
    // The HTML for this View
    var viewHTML;
    // Instantiate the ADAL AuthenticationContext

    function refreshViewData() {
        // Empty Old View Contents
        var $dataContainer = $(".data-container");
        $dataContainer.empty();
        var $loading = $(".view-loading");
        var scopes = document.getElementById('scopesButton').value;
        scopes = scopes.split(' ');
        // Acquire Token for Backend
        userAgentApplication.acquireTokenSilent(['mail.read'], function (errorDesc, token, error) {
            // Handle ADAL Error
            var $html = $(viewHTML);
            var $template = $html.find(".data-container");
            var output = '';

            if (errorDesc || error) {
                var $entry = $template;
                $entry.find(".view-data-claim").html('errorDesc');
                $entry.find(".view-data-value").html(errorDesc);
                output += $entry.html();
                // Update the UI
                $loading.hide();
                $dataContainer.html(output);
                return;
            }

            // Get TodoList Data
            $.ajax({
                type: "GET",
                url: "https://graph.microsoft.com/v1.0/me",
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            }).done(function (data) {
              
                for (var property in data) {
                    if (data.hasOwnProperty(property)) {
                        var $entry = $template;
                        $entry.find(".view-data-claim").html(property);
                        $entry.find(".view-data-value").html(data[property]);
                        output += $entry.html();
                    }
                }

                // Update the UI
                $loading.hide();
                $dataContainer.html(output);

            }).fail(function () {
                //printErrorMessage('Error getting todo list data')
            }).always(function () {
                // Register Handlers for Buttons in Data Table
                //registerDataClickHandlers();
            });
        });
    };
    // Module
    window.userDataCtrl = {
        requireADLogin: true,
        preProcess: function (html) {
        },
        postProcess: function (html) {
            viewHTML = html;
            refreshViewData();
        },
    };
}());