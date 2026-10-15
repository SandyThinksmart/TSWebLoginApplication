using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSWebLoginApplication.Application.Persistence.Repositories;
using TSWebLoginApplication.Application.Persistence.Services;
using TSWebLoginApplication.Application.Services;
using TSWebLoginApplication.Domain.Entities;

namespace TSWebLoginApplication.Application.Services
{
    public class MenuService : IMenuService
    {
        private readonly IMenuRepository _menuRepository;


        public MenuService(IMenuRepository menuRepository)
        {
            _menuRepository = menuRepository;

        }
        public MST_USER_LOGIN CheckUserLastActivity(string workstationName, string browserName, string randomValue)
        {
            return _menuRepository.GetActivityTime(workstationName, browserName, randomValue);


        }
        public void UpdateLastUsedTime(string uniqueId)
        {
            _menuRepository.UpdateLastUsedTime(uniqueId);

        }
        public void DeleteLoginData(string uniqueId)
        {
            _menuRepository.DeleteLoginInfo(uniqueId);

        }
        public void SaveLoginDetails(string userName, string browser, string randomCode)
        {

            _menuRepository.SaveData(userName, browser, randomCode);
        }
        public List<MST_USER_LOGIN> ValidateLoginUser(string userName, string pass)
        {

            var obj = _menuRepository.Validate(userName, pass);

            return obj;
        }
    }
}
