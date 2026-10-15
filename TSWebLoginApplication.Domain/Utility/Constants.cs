using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSWebLoginApplication.Domain.Utility
{
    public class Constants
    {
        public class DateFormats
        {
            public const string YYYYMMDD = "yyyy/MM/dd";
            public const string ZERO_YYYYMMDD = "{0:yyyy/MM/dd}";
            public const string ZERO_MMDDYYYY = "{0:MM/dd/yyyy}";
            public const string YYYYMMDD_HHMM = "yyyy/MM/dd HH:mm";
            public const string YYYYMMDD_HHMMSS = "yyyy/MM/dd hh:mm:ss";
            public const string YYYYMMDD_HH24MMSS = "yyyy/MM/dd HH:mm:ss";
            public const string MMDDYYYY = "MM/dd/yyyy";
            public const string MMDDYYYY_HHMM = "MM/dd/yyyy HH:mm";
            public const string DDMMYYYY = "dd/MM/yyyy";
            public const string DDMMYYYY_HHMM = "dd/MM/yyyy HH:mm";
            public const string DD_MMM_YY_HH_MM_SS = "dd-MMM-yy_hh_mm_ss";
            public const string YYYY_MM_DD_HH_MM_SS = "yyyyMMdd_HHmmss";
            public const string YYYY_MM_DD_HH_MM_SS_FFF = "yyyy_MM_dd_HH_mm_ss_fff";
            public const string YYYYMMDD_HHMMSS_FFF = "yyyyMMdd_HHmmss_fff";
            public const string DD_MMM_YY = "dd-MMM-yy";
            public const string YYMMDD = "yy/MM/dd";

        }
        public class StringValues
        {
            public const string COMPANY_NAME = "HSK";
            public const string DASH = "-";
            public const string UNDERSCORE = "_";
        }
        public class FileType
        {
            public const string TEXT = ".txt";
        }
    }
}
