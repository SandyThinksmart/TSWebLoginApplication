using Microsoft.Extensions.Configuration;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using TSWebLoginApplication.Domain.Utility;

namespace TSWebLoginApplication.Infrastructure.Repositories
{
    public abstract class BaseRepository
    {
        public string status = "Default";
      
        protected string connectionString = null;
        public BaseRepository(IConfiguration _configuration)
        {
            connectionString = _configuration.GetConnectionString("OracleDBConnection");
        }

        protected void Initialize(string connectionString)
        {
            this.connectionString = connectionString;
        }

        protected OracleConnection Connection()
        {
            try
            {
                return new OracleConnection(this.connectionString);
            }
            catch (Exception)
            {
                throw;
            }
        }

        protected void ExecuteNonQuery(string query)
        {
            try
            {
                using OracleConnection dbConnection = Connection();
                using (OracleCommand cmd = dbConnection.CreateCommand())
                {
                    dbConnection.Open();
                    cmd.CommandText = query;
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                ex.Data.Add("sql", query);
                throw ex;
            }
        }

        protected object ExecuteScalar(string query)
        {
            object returnVal;
            try
            {
                using OracleConnection dbConnection = Connection();
                using (OracleCommand cmd = dbConnection.CreateCommand())
                {
                    dbConnection.Open();
                    cmd.CommandText = query;
                    returnVal = cmd.ExecuteScalar();
                }
            }
            catch (Exception ex)
            {
                ex.Data.Add("sql", query);
                throw ex;
            }
            return returnVal;
        }

        protected T ExecuteQuerySingleResult<T>(string query)
        {
            T returnVal;
            try
            {
                using OracleConnection dbConnection = Connection();
            using (OracleCommand cmd = dbConnection.CreateCommand())
            {
                dbConnection.Open();
                cmd.CommandText = query;
                OracleDataReader rdr = cmd.ExecuteReader();
                var dataTable = new DataTable();
                dataTable.Load(rdr);
                returnVal = CommonConvertMethods.ConvertDataTableToClass<T>(dataTable);
            }
            }
            catch (Exception ex)
            {
                ex.Data.Add("sql", query);
                throw ex;
            }
            return returnVal;
        }

        protected List<T> ExecuteQueryMultiResult<T>(string query)
        {
           
            List<T> returnVal;
            try
            {
                status = "Intilising Connection";
              
                using OracleConnection dbConnection = Connection();
            status = "Creating Command Object";
              
                using (OracleCommand cmd = dbConnection.CreateCommand())
            {
              
                 status = "CreatedCommand Object";
                dbConnection.Open();
                status = "Open connection";
              
                 cmd.CommandText = query;
                   
                OracleDataReader rdr = cmd.ExecuteReader();
                 status = "Excute SQL";
              
                var dataTable = new DataTable();
                dataTable.Load(rdr);
                returnVal = CommonConvertMethods.ConvertDataTable<T>(dataTable);
              

            }
                
                return returnVal;
            }
            catch (Exception ex)
            {
                ex.Data.Add("sql", query);
                throw ex;
            }
           
           
        }

        protected DataTable ExecuteQueryDataTable(string query)
        {
            var dataTable = new DataTable();
            try
            {
                using OracleConnection dbConnection = Connection();
            using (OracleCommand cmd = dbConnection.CreateCommand())
            {
                dbConnection.Open();
                cmd.CommandText = query;
                OracleDataReader rdr = cmd.ExecuteReader();
                dataTable.Load(rdr);
            }
            }
            catch (Exception ex)
            {
                ex.Data.Add("sql", query);
                throw ex;
            }
            return dataTable;
        }
    }
}
