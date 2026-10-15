using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSWebLoginApplication.Domain.Entities;

namespace TSWebLoginApplication.Application.Persistence.Repositories
{
    public interface ILoginRepository
    {
       // public string Validate(string userName, string pass);
        public List<MST_USER_LOGIN> Validate(string userName, string pass);
        public void SaveData(string userName, string browser, string randomCode);
        public void DeleteLoginInfo(string uniqueid);
        public MST_USER_LOGIN GetActivityTime(string workstationName, string browserName, string randomValue);
        public void UpdateLastUsedTime(string uniqueId);
        public void Delete(Int32 logoutHour);
    }
}
