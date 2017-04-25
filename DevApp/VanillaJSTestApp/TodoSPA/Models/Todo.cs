namespace TodoSPA.Models
{
    public class Todo
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public string Owner { get; set; }

        public Todo(int id, string description, string owner)
        {
            this.ID = id;
            this.Description = description;
            this.Owner = owner;
        }
    }
}