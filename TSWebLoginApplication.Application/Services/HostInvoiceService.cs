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
    public class HostInvoiceService : IHostInvoiceService
    {
        private readonly IHostInvoiceRepository _hostInvoiceRepository;
        public HostInvoiceService(IHostInvoiceRepository HostInvoiceRepository)
        {
            _hostInvoiceRepository = HostInvoiceRepository;

        }
        public MST_USER_LOGIN CheckUserLastActivity(string workstationName, string browserName, string randomValue)
        {
            return _hostInvoiceRepository.GetActivityTime(workstationName, browserName, randomValue);


        }
        public void UpdateLastUsedTime(string uniqueId)
        {
            _hostInvoiceRepository.UpdateLastUsedTime(uniqueId);

        }
        public void DeleteLoginData(string uniqueId)
        {
            _hostInvoiceRepository.DeleteLoginInfo(uniqueId);

        }
        public void SaveLoginDetails(string userName, string browser, string randomCode)
        {

            _hostInvoiceRepository.SaveData(userName, browser, randomCode);
        }
        public List<MST_USER_LOGIN> ValidateLoginUser(string userName, string pass)
        {

            var obj = _hostInvoiceRepository.Validate(userName, pass);

            return obj;
        }
    }
}
