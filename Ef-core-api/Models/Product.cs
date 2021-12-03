using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Ef_core_api.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public double Weight { get; set; }
        public DateTime CreateDate { get; set; }

        [JsonIgnore]
        public Customer Customer { get; set; }

        [NotMapped]
        public string CustomerUsername
        {
            get => Customer?.Username;
        }
    }
}
