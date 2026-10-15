using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSWebLoginApplication.Domain.Model
{
    public class EMailSettings
    {
        public bool EnableEmailNotifications { get; set; }
        public string PrimaryDomain { get; set; }

        public int PrimaryPort { get; set; }

        public bool enableSsl { get; set; }
        public bool defaultCredentials { get; set; }
        public string UsernameEmail { get; set; }
        public string UsernamePassword { get; set; }
        public string FromEmail { get; set; }
        public string ToEmail_1 { get; set; }
        public string ToEmail_2 { get; set; }
        public string ToEmail_3 { get; set; }
        public string ToEmail_4 { get; set; }
        public string ToEmail_5 { get; set; }
    }
}
