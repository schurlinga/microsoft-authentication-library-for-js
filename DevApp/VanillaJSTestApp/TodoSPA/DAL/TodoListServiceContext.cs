using System.Data.Entity;
using TodoSPA.Models;

namespace TodoSPA.DAL
{
    public class TodoListServiceContext : DbContext
    {
        public TodoListServiceContext()
            : base("TodoListServiceContext")
        { }

        public DbSet<Todo> Todoes { get; set; }
    }
}