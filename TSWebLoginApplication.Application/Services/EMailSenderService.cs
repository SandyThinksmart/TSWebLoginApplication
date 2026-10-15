using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSWebLoginApplication.Application.Persistence.Services;
using TSWebLoginApplication.Domain.Model;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using MimeKit;
using MimeKit.Text;
using MailKit.Net.Smtp;
using MailKit.Security;

namespace TSWebLoginApplication.Application.Services
{
    
    public class EMailSenderService : IEMailSenderService
    {
        public EMailSettings _emailSettings { get; }
        private readonly ILogger<EMailSenderService> _logger;
        public EMailSenderService(IOptions<EMailSettings> emailSettings, ILogger<EMailSenderService> logger)
    {
        _emailSettings = emailSettings.Value;
        _logger = logger;
    }

    public async Task SendEmail(string txtfileName)
    {
        try
        {
            if (_emailSettings.EnableEmailNotifications)
            {
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(_emailSettings.FromEmail));

                    if (!string.IsNullOrEmpty(_emailSettings.ToEmail_1))
                    {
                        email.To.Add(MailboxAddress.Parse(_emailSettings.ToEmail_1));
                    }
                    if (!string.IsNullOrEmpty(_emailSettings.ToEmail_2))
                    {
                        email.To.Add(MailboxAddress.Parse(_emailSettings.ToEmail_2));
                    }
                    if (!string.IsNullOrEmpty(_emailSettings.ToEmail_3))
                    {
                        email.To.Add(MailboxAddress.Parse(_emailSettings.ToEmail_3));
                    }
                    if (!string.IsNullOrEmpty(_emailSettings.ToEmail_4))
                    {
                        email.To.Add(MailboxAddress.Parse(_emailSettings.ToEmail_4));
                    }
                    if (!string.IsNullOrEmpty(_emailSettings.ToEmail_5))
                    {
                        email.To.Add(MailboxAddress.Parse(_emailSettings.ToEmail_5));
                    }
                    email.Subject = "HSKCORELOGINエラーログ";

                string template = Path.GetTempPath();
                string template1 = template + "\\" + txtfileName;
                string length = template1.Length.ToString();
                var errorText = File.ReadAllText(template1.Trim());
                errorText = errorText.ToString();

                email.Body = new TextPart(TextFormat.Plain) { Text = errorText };
                // send email
                using var smtp = new SmtpClient();
                smtp.Connect(_emailSettings.PrimaryDomain, _emailSettings.PrimaryPort, SecureSocketOptions.Auto);
                smtp.Authenticate(_emailSettings.FromEmail, _emailSettings.UsernamePassword);
                string result = smtp.Send(email);
                smtp.Disconnect(true);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
        }
    }
}
}


