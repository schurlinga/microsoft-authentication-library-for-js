namespace TodoSPA.Migrations
{
    using System.Data.Entity.Migrations;

    public partial class initialcreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Todoes",
                c => new
                {
                    ID = c.Int(nullable: false, identity: true),
                    Description = c.String(),
                    Owner = c.String(),
                })
                .PrimaryKey(t => t.ID);
        }

        public override void Down()
        {
            DropTable("dbo.Todoes");
        }
    }
}