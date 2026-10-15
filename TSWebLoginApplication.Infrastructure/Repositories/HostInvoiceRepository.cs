using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSWebLoginApplication.Application.Persistence.Repositories;
using TSWebLoginApplication.Domain.Entities;

namespace TSWebLoginApplication.Infrastructure.Repositories
{
    public class HostInvoiceRepository : BaseRepository, IHostInvoiceRepository
    {
        public HostInvoiceRepository(IConfiguration _configuration) : base(_configuration)
        {

        }
        public MST_USER_LOGIN GetActivityTime(string workstationName, string browserName, string randomValue)
        {
            StringBuilder selectQuery = new StringBuilder();


            selectQuery.Append("SELECT * ");
            selectQuery.Append("FROM TRN_LOGIN_STATUS ");
            selectQuery.Append("WHERE BROWSER_ID='" + browserName + "'AND COOKIES_UNIQUE_ID='" + randomValue + "'");

            selectQuery.Append(" AND WORKSTATION_NAME='" + workstationName + "'");


            var result = ExecuteQuerySingleResult<MST_USER_LOGIN>(selectQuery.ToString());

            return result;

        }
        public void DeleteLoginInfo(string uniqueId)
        {
            StringBuilder deleteQuery = new StringBuilder();

            deleteQuery.Append(" DELETE FROM TRN_LOGIN_STATUS ");
            deleteQuery.Append(" WHERE COOKIES_UNIQUE_ID = ");
            deleteQuery.Append(" '" + uniqueId + "' ");
            ExecuteNonQuery(deleteQuery.ToString());

        }
        public void UpdateLastUsedTime(string uniqueId)
        {
            StringBuilder updateQuery = new StringBuilder();

            updateQuery.Append(" UPDATE TRN_LOGIN_STATUS SET");
            updateQuery.Append(" LAST_USED_TIME = TO_DATE('" + DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") + "','yyyy/MM/dd HH24:MI:SS')");
            updateQuery.Append(" WHERE COOKIES_UNIQUE_ID = ");
            updateQuery.Append(" '" + uniqueId + "' ");
            ExecuteNonQuery(updateQuery.ToString());

        }
        public void SaveData(string userName, string browserName, string randomCode)
        {


            StringBuilder insertQuery = new StringBuilder();
            insertQuery.Append("INSERT INTO TRN_LOGIN_STATUS(");
            insertQuery.Append("LOGIN_STATUS_CODE,WORKSTATION_NAME,");
            insertQuery.Append("LAST_USED_TIME,BROWSER_ID, COOKIES_UNIQUE_ID) ");
            insertQuery.Append("values(");
            insertQuery.Append("LOGIN_STATUS_SEQ.NEXTVAL,");
            insertQuery.Append("'" + userName + "',");
            insertQuery.Append("TO_DATE('" + DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") + "','yyyy/MM/dd HH24:MI:SS'),");

            insertQuery.Append("'" + browserName + "', ");
            insertQuery.Append("'" + randomCode + "' )");
            ExecuteNonQuery(insertQuery.ToString());

        }
        public List<MST_USER_LOGIN> Validate(string userName, string pass)
        {
            List<MST_USER_LOGIN> result = new List<MST_USER_LOGIN>();
            StringBuilder selectQuery = new StringBuilder();
            selectQuery.Append("SELECT * FROM MST_USER_LOGIN UL ");
            selectQuery.Append(" WHERE LOWER(UL.SYSTEM_NAME) = '" + userName + "' ");

            if (pass == "" || pass == null)
                selectQuery.Append(" AND UL.PASSWORD IS NULL ");
            else
                selectQuery.Append(" AND LOWER(UL.PASSWORD) ='" + pass + "' ");
            result = ExecuteQueryMultiResult<MST_USER_LOGIN>(selectQuery.ToString());
            return result;
        }
    }

}
