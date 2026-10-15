using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSWebLoginApplication.Application.Persistence.Services
{
    public interface IEMailSenderService
    {
        Task SendEmail(string txtfileName);
    }
}
