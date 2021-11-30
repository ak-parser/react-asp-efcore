using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;

namespace ProductSQLite
{
    internal static class DataBaseHelper
    {
        public static List<Product> GetProductList(this DataBase dataBase)
        {
            return dataBase.GetList("Select * from Products", Product.Create);
        }

        public static Product GetProductByName(this DataBase dataBase, string name)
        {
            return dataBase.GetList($"Select * from Products Where Name Like '{name}' Limit 1", Product.Create)?.FirstOrDefault();
        }

        public static Product GetProductByNameLinq(this DataBase dataBase, string name)
        {
            return dataBase.GetProductList().Where(product => product.Name.Equals(name, StringComparison.OrdinalIgnoreCase)).FirstOrDefault();
        }
    }
}
