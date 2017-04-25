using System.Data.Entity;

namespace TodoSPA.DAL
{
    internal class TodoListServiceInitializer : DropCreateDatabaseIfModelChanges<TodoListServiceContext>
    {
    }
}