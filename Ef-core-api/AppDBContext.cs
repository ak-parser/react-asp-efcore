using Ef_core_api.Models;
using Microsoft.EntityFrameworkCore;

namespace Ef_core_api
{
    public class AppDBContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Customer> Customers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(@"Data Source = products.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasOne(product => product.Customer)
                .WithMany(customer => customer.Products)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Product>().Navigation(elem => elem.Customer).AutoInclude();
            modelBuilder.Entity<Customer>().Navigation(elem => elem.Products).AutoInclude();
        }
    }
}
