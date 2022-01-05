using System.ComponentModel.DataAnnotations;

namespace react_asp.Models
{
    public class Customer
    {
        [Key]
        [Required]
        public string Username { get; set; }
        public string Password { get; set; }

        public ICollection<Product> Products { get; set; }

        public Customer()
        {
            Products = new HashSet<Product>();
        }
    }
}
