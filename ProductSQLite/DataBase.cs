using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using Microsoft.Data.Sqlite;

namespace ProductSQLite
{
    internal class DataBase
    {
        public SqliteConnection Connection { get; set; }

        public DataBase() { }

        public DataBase(string sqliteConnection)
        {
            Connection = new SqliteConnection(sqliteConnection);
        }

        public void ExecuteSQL(string sqlRequest)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();
                    SqliteCommand command = new(sqlRequest, Connection);

                    command.ExecuteNonQuery();
                }
                catch (SqliteException ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }

        public List<T> GetList<T>(string sqlRequest, Func<IDataRecord, T> convertor) where T : notnull
        {
            List<T> resultList = new();
            using (Connection)
            {
                try
                {
                    Connection.Open();
                    SqliteCommand command = new(sqlRequest, Connection);

                    using (IDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                            resultList.Add(convertor(reader));
                    }
                }
                catch(SqliteException ex)
                {
                    Console.WriteLine(ex.Message);
                    return resultList;
                }
            }
            return resultList;
        }
    }
}
