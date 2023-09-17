using System.Text.Json.Serialization;

namespace CustomerAPI.Models
{
    public class Customer
    {
        public long Id { get; set; }
        public required string Name { get; set; }
        public string Description { get; set; } = "";

        [JsonIgnore]
        public virtual ICollection<Product> Products { get; } = new List<Product>();
    }
}
