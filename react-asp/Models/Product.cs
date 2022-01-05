using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;

namespace react_asp.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public double Weight { get; set; }
        public DateTime CreateDate { get; set; }

        public string CustomerUsername { get; set; }

        [JsonIgnore]
        public Customer? Customer { get; set; }
    }
}
