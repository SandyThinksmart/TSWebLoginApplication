using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSWebLoginApplication.Domain.Entities;

namespace TSWebLoginApplication.Application.Persistence.Services
{
    public interface ILoginService
    {
        public List<MST_USER_LOGIN> ValidateLoginUser(string userName, string pass);
      // public string ValidateLoginUser(string userName, string pass);
        public void SaveLoginDetails(string userName, string browser, string randomCode);
        public void DeleteLoginData(string uniqueId);
        public MST_USER_LOGIN CheckUserLastActivity(string workstationName, string browserName, string randomValue);
        public void UpdateLastUsedTime(string uniqueId);
        public void DeleteOldData(Int32 logoutHour);
    }
}
