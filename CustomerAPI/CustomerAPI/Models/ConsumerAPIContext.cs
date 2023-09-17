using Microsoft.EntityFrameworkCore;
namespace CustomerAPI.Models;
    public class ConsumerAPIContext : DbContext
    {
        public ConsumerAPIContext(DbContextOptions<ConsumerAPIContext> options) : base(options) { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>()
                .HasMany(c => c.Products)
                .WithOne(c => c.Customer)
                .HasForeignKey(c => c.CustomerId)
                .HasPrincipalKey(e => e.Id);
        }

    }