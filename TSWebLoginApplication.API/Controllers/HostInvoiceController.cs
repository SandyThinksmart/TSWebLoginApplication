using Microsoft.AspNetCore.Mvc;
using TSWebLoginApplication.Application.Persistence.Services;
using TSWebLoginApplication.Application.Services;
using TSWebLoginApplication.Domain.Entities;
using TSWebLoginApplication.Domain.Resources;
using UAParser;

namespace TSWebLoginApplication.API.Controllers
{
    [Route("[Controller]")]
    [ApiController]
    public class HostInvoiceController : Controller
    {
        private readonly IHostInvoiceService _hostInvoiceService;

        private readonly LocalizationServices _localization;
        protected Int32 logoutHours;

        public HostInvoiceController(LocalizationServices localization, IHostInvoiceService HostInvoiceService, IConfiguration _configuration)
        {

            _localization = localization;
            _hostInvoiceService = HostInvoiceService;
            logoutHours = Convert.ToInt32(_configuration.GetSection("Logout").GetSection("Hours").Value);


        }
        [HttpPost("DecryptCookie")]
        public IActionResult DecryptCookie(string CookieValue, string authorizedUser)
        {

            var browserName = string.Empty;
            string randomVal = string.Empty;


            var userAgent = HttpContext.Request.Headers["User-Agent"];
            var uaParser = Parser.GetDefault();
            ClientInfo c = uaParser.Parse(userAgent);
            browserName = c.UA.Family;
            byte[] decrypt = Convert.FromBase64String(CookieValue);
            string uniqueId = Convert.ToString(System.Text.ASCIIEncoding.ASCII.GetString(decrypt));

            string[] spitId = uniqueId.Split('-');

            var result = _hostInvoiceService.CheckUserLastActivity(Convert.ToString(spitId[1]), browserName, Convert.ToString(spitId[0]));
            if (result != null)
            {
                result.IsSuccess = true;
                if (authorizedUser == "true" && spitId[5] == "false")
                {
                    result.IsSuccess = false;
                }
                else
                {

                    _hostInvoiceService.UpdateLastUsedTime(result.COOKIES_UNIQUE_ID);
                }

            }

            return Ok(new { Authorized_Value = Convert.ToString(spitId[5]), message = result });
        }
        [HttpPost("CheckUserLastActivity")]
        public IActionResult CheckUserLastActivity(string CookieValue, string authorizedUser)
        {


            var browserName = string.Empty;
            string randomVal = string.Empty;


            var userAgent = HttpContext.Request.Headers["User-Agent"];
            var uaParser = Parser.GetDefault();
            ClientInfo c = uaParser.Parse(userAgent);
            browserName = c.UA.Family;

            byte[] decrypt = Convert.FromBase64String(CookieValue);
            string uniqueId = Convert.ToString(System.Text.ASCIIEncoding.ASCII.GetString(decrypt));
            string[] spitId = uniqueId.Split('-');


            var result = _hostInvoiceService.CheckUserLastActivity(Convert.ToString(spitId[1]), browserName, Convert.ToString(spitId[0]));

            if (result != null)
            {
                DateTime startTime = DateTime.Now; //Current Date

                DateTime lastUsedTime = result.LAST_USED_TIME; //Parse the String to the DateTime
                TimeSpan span = startTime.Subtract(lastUsedTime);

                int Hoursdiff = span.Hours;
                if (Hoursdiff >= logoutHours && authorizedUser == "true")
                {
                    _hostInvoiceService.DeleteLoginData(result.COOKIES_UNIQUE_ID);
                    result.IsSuccess = false;
                }
                else
                {

                    _hostInvoiceService.UpdateLastUsedTime(result.COOKIES_UNIQUE_ID);


                    result.IsSuccess = true;
                }
            }

            return Ok(new { message = result });

        }
        [HttpPost("ValidateLoginUser")]
        public IActionResult ValidateLoginUser(string userName, string? pass, string authorizedUser)
        {
            List<MST_USER_LOGIN> result = new List<MST_USER_LOGIN>();

            result = _hostInvoiceService.ValidateLoginUser(userName.ToLower(), pass);
            if (result.Count > 0)
            {
                foreach (var details in result)
                {
                    if (!string.IsNullOrEmpty(pass))
                    {
                        pass = pass.ToLower();
                    }

                    if (!string.IsNullOrEmpty(details.PASSWORD))
                    {
                        details.PASSWORD = details.PASSWORD.ToLower();
                    }
                    if (userName.ToLower() == details.SYSTEM_NAME.ToLower() && pass == details.PASSWORD)
                    {
                        var browserName = string.Empty;
                        string randomVal = string.Empty;


                        var userAgent = HttpContext.Request.Headers["User-Agent"];
                        var uaParser = Parser.GetDefault();
                        ClientInfo c = uaParser.Parse(userAgent);
                        browserName = c.UA.Family;

                        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                        var stringChars = new char[10];
                        var random = new Random();

                        for (int i = 0; i < stringChars.Length; i++)
                        {
                            stringChars[i] = chars[random.Next(chars.Length)];
                        }
                        randomVal = new String(stringChars);


                        _hostInvoiceService.SaveLoginDetails(userName, browserName, randomVal);

                        randomVal = randomVal + "-" + userName + "-" + details.USER_ID + "-" + details.LOCATION_CD + "-" + details.IS_ADMIN + "-" + authorizedUser;

                        byte[] encrypt = System.Text.ASCIIEncoding.ASCII.GetBytes(randomVal);

                        string encrypted = Convert.ToBase64String(encrypt);

                        details.IsSuccess = true;

                        details.COOKIEVAL = encrypted;

                    }
                    else
                    {

                        details.IsSuccess = false;

                    }

                }

            }
            else
            {

            }
            return Ok(new { message = result });

        }

    }
}
