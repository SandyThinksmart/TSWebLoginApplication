using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSWebLoginApplication.Domain.Entities;

namespace TSWebLoginApplication.Application.Persistence.Repositories
{
    public interface IMenuRepository
    {
        public void UpdateLastUsedTime(string uniqueId);
        public MST_USER_LOGIN GetActivityTime(string workstationName, string browserName, string randomValue);
        public void DeleteLoginInfo(string uniqueId);
        public void SaveData(string userName, string browser, string randomCode);
        public List<MST_USER_LOGIN> Validate(string userName, string pass);
    }
}
