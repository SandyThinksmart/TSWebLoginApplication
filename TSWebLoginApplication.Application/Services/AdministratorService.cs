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
    public class AdministratorService : IAdministratorService
    {
        private readonly IAdministratorRepository _administratorRepository;
        public AdministratorService(IAdministratorRepository administratorRepository)
        {
            _administratorRepository = administratorRepository;

        }
        public MST_USER_LOGIN CheckUserLastActivity(string workstationName, string browserName, string randomValue)
        {
            return _administratorRepository.GetActivityTime(workstationName, browserName, randomValue);


        }
        public void UpdateLastUsedTime(string uniqueId)
        {
            _administratorRepository.UpdateLastUsedTime(uniqueId);

        }
        public void DeleteLoginData(string uniqueId)
        {
            _administratorRepository.DeleteLoginInfo(uniqueId);

        }
        public void SaveLoginDetails(string userName, string browser, string randomCode)
        {

            _administratorRepository.SaveData(userName, browser, randomCode);
        }
        public List<MST_USER_LOGIN> ValidateLoginUser(string userName, string pass)
        {

            var obj = _administratorRepository.Validate(userName, pass);

            return obj;
        }
    }
}
