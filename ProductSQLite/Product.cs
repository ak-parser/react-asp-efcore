using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using Microsoft.Data.Sqlite;

namespace ProductSQLite
{
    internal class Product
    {
        private int _id;
        public string Name { get; set; }
        public double Price { get; set; }
        public double Weight { get; set; }
        public DateTime CreateDate { get; set; }

        public Product() { }

        public Product(int id, string name, double price, double weight, DateTime createDate)
        {
            _id = id;
            Name = name;
            Price = price;
            Weight = weight;
            CreateDate = createDate;
        }

        public override string ToString()
        {
            return $"{Name} - {Price} - {Weight} - {CreateDate}";
        }

        public static Product Create(IDataRecord data)
        {
            return new Product(Convert.ToInt32(data["_id"]), data["Name"].ToString(), Convert.ToDouble(data["Price"]), 
                Convert.ToDouble(data["Weight"]), DateTime.Parse(data["CreateDate"].ToString()));
        }
    }
}
