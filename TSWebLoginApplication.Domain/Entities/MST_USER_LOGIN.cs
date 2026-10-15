using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSWebLoginApplication.Domain.Entities
{
    public class MST_USER_LOGIN
    {
       public int USER_ID { get; set; }
       public int LOCATION_CD { get; set; }
       public int EMPLOYEE_CD { get; set; }
       public string  SYSTEM_NAME { get; set; }
       public string? PASSWORD { get; set; }
       public int IS_ADMIN { get; set; }
       public DateTime CREATED_DATE { get; set; }
       public DateTime UPDATED_DATE { get; set; }
       public int LOGGED_STATUS { get; set; }
        public bool IsSuccess { get; set; }
        public string COOKIEVAL { get; set; }

        public string Authorized_Value { get; set; }

        #region "Trn_Login_Status"
        public long LOGIN_STATUS_CODE { get; set; }
        public string WORKSTATION_NAME { get; set; }
        public DateTime LAST_USED_TIME { get; set; }
        public string BROWSER_ID { get; set; }
        public string COOKIES_UNIQUE_ID { get; set; }
        #endregion



    }
}
