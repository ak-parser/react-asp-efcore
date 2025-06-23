using Microsoft.EntityFrameworkCore;
using react_asp.Models;

namespace react_asp
{
	public class AppDBContext : DbContext
	{
		public DbSet<Product>? Products { get; set; }
		public DbSet<Customer>? Customers { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlite("Data source = data.db");
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
