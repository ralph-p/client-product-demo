namespace CustomerAPI.Models
{
    public class Customer
    {
        public long Id { get; set; }
        public required string Name { get; set; }
        public string Description { get; set; } = "";

        public virtual ICollection<Product>? Products { get; set; }
    }
}
