using System;
using ProductSQLite;

DataBase dataBase = new DataBase("Data Source=product.db");

Console.WriteLine("Product list: ");
foreach (var elem in dataBase.GetProductList())
    Console.WriteLine(elem);

Console.Write("Enter product name: ");
string name = Console.ReadLine();

Console.WriteLine("Result: ");
Console.WriteLine(dataBase.GetProductByName(name));
Console.WriteLine("With Linq: " + dataBase.GetProductByNameLinq(name));