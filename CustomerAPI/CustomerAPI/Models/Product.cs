namespace CustomerAPI.Models
{
    public class Product
    {
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Price { get; set; }
    public long CustomerId { get; set; }
    public required Customer Customer { get; set; } 
    }
}
