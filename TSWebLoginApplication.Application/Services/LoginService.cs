using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using TSWebLoginApplication.Application.Persistence.Repositories;
using TSWebLoginApplication.Application.Persistence.Services;
using TSWebLoginApplication.Domain.Entities;

namespace TSWebLoginApplication.Application.Services
{
    public class LoginService : ILoginService
    {
        private readonly ILoginRepository _loginRepository;


        public LoginService(ILoginRepository loginRepository)
        {
            _loginRepository = loginRepository;

        }
      public List<MST_USER_LOGIN> ValidateLoginUser(string userName, string pass)
       // public string ValidateLoginUser(string userName, string pass)
        {

            var obj = _loginRepository.Validate(userName, pass);

          return obj;
        }

        public void SaveLoginDetails(string userName, string browser, string randomCode)
        {

            _loginRepository.SaveData(userName, browser,randomCode);
        }
        public void DeleteLoginData(string uniqueId)
        {
            _loginRepository.DeleteLoginInfo(uniqueId);

        }
        public void UpdateLastUsedTime(string uniqueId)
        {
            _loginRepository.UpdateLastUsedTime(uniqueId);

        }
        public MST_USER_LOGIN CheckUserLastActivity(string workstationName, string browserName, string randomValue)
        {
            return _loginRepository.GetActivityTime(workstationName, browserName, randomValue);


        }
        public void DeleteOldData(Int32 logoutHours)
        {
            _loginRepository.Delete(logoutHours);

        }
    }

}
