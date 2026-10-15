using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSWebLoginApplication.Application.Persistence.Repositories;
using TSWebLoginApplication.Application.Persistence.Services;
using TSWebLoginApplication.Domain.Entities;

namespace TSWebLoginApplication.Application.Services
{
    public class PMSMenuService : IPMSMenuService
    {
        private readonly IPMSMenuRepository _pmsmenuRepository;


        public PMSMenuService(IPMSMenuRepository PMSmenuRepository)
        {
            _pmsmenuRepository = PMSmenuRepository;

        }
        public MST_USER_LOGIN CheckUserLastActivity(string workstationName, string browserName, string randomValue)
        {
            return _pmsmenuRepository.GetActivityTime(workstationName, browserName, randomValue);


        }
        public void UpdateLastUsedTime(string uniqueId)
        {
            _pmsmenuRepository.UpdateLastUsedTime(uniqueId);

        }
        public void DeleteLoginData(string uniqueId)
        {
            _pmsmenuRepository.DeleteLoginInfo(uniqueId);

        }
        public void SaveLoginDetails(string userName, string browser, string randomCode)
        {

            _pmsmenuRepository.SaveData(userName, browser, randomCode);
        }
        public List<MST_USER_LOGIN> ValidateLoginUser(string userName, string pass)
        {

            var obj = _pmsmenuRepository.Validate(userName, pass);

            return obj;
        }
    }
}
