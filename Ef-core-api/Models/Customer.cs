using System.Collections.Generic;

namespace Ef_core_api.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public ICollection<Product> Products { get; set; }

        public Customer()
        {
            Products = new HashSet<Product>();
        }
    }
}
