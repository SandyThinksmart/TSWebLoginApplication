using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.Extensions;
using TSWebLoginApplication.Domain.Resources;
using TSWebLoginApplication.Application.Persistence.Services;
using UAParser;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using System.Drawing.Text;
using TSWebLoginApplication.Domain.Entities;
using TSWebLoginApplication.Application.Services;

namespace TSWebLoginApplication.API.Controllers
{
    [Route("[Controller]")]
    [ApiController]
    public class LoginController : Controller
    {

        private readonly ILoginService _loginService;

        private readonly LocalizationServices _localization;
        protected Int32 logoutHours;
        public LoginController(LocalizationServices localization, ILoginService loginService, IConfiguration _configuration)
        {

            _localization = localization;
            _loginService = loginService;
            logoutHours = Convert.ToInt32(_configuration.GetSection("Logout").GetSection("Hours").Value);

        }
        [HttpGet("ValidateLoginUser")]
        public IActionResult ValidateLoginUser(string userName, string? pass, string authorizedUser)
        {
            List<MST_USER_LOGIN> result = new List<MST_USER_LOGIN>();

            result = _loginService.ValidateLoginUser(userName.ToLower(), pass);

            if (result.Count > 0)
            {

                foreach (var details in result)
                {
                    if (!string.IsNullOrEmpty(pass))
                    {
                        pass = pass.ToLower();
                    }
                    else if (pass == null)
                    {
                        pass = string.Empty;
                    }
                    else
                    {
                        pass = string.Empty;
                    }

                    if (!string.IsNullOrEmpty(details.PASSWORD))
                    {
                        details.PASSWORD = details.PASSWORD.ToLower();
                    }
                    else if (details.PASSWORD == null)
                    {
                        details.PASSWORD = string.Empty;
                    }
                    if (userName.ToLower() == details.SYSTEM_NAME.ToLower() && pass.Trim() == details.PASSWORD.Trim())
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

                        _loginService.SaveLoginDetails(userName, browserName, randomVal);
                        randomVal = randomVal + "-" + userName + "-" + details.USER_ID + "-" + details.LOCATION_CD + "-" + details.IS_ADMIN + "-" + authorizedUser;

                        byte[] encrypt = System.Text.ASCIIEncoding.ASCII.GetBytes(randomVal);

                        string encrypted = Convert.ToBase64String(encrypt);

                        details.IsSuccess = true;

                        details.COOKIEVAL = encrypted;

                    }

                }

            }

            return Ok(new { message = result });


        }
        [HttpPost("DecryptCookie")]
        public IActionResult DecryptCookie(string CookieValue)
        {
            byte[] decrypt = Convert.FromBase64String(CookieValue);
            string uniqueId = Convert.ToString(System.Text.ASCIIEncoding.ASCII.GetString(decrypt));

            string[] spitId = uniqueId.Split('-');

            var result = Convert.ToString(spitId[5]);

            return Ok(new { message = result });
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


            var result = _loginService.CheckUserLastActivity(Convert.ToString(spitId[1]), browserName, Convert.ToString(spitId[0]));

            if (result != null)
            {
                DateTime startTime = DateTime.Now;

                DateTime lastUsedTime = result.LAST_USED_TIME;
                TimeSpan span = startTime.Subtract(lastUsedTime);

                int Hoursdiff = span.Hours;
                if (Hoursdiff >= logoutHours && authorizedUser == "true")
                {
                    _loginService.DeleteLoginData(result.COOKIES_UNIQUE_ID);
                    result.IsSuccess = false;
                }
                else
                {
                    if (authorizedUser == "true")
                    {
                        _loginService.UpdateLastUsedTime(result.COOKIES_UNIQUE_ID);
                    }

                    result.IsSuccess = true;
                }
            }

            return Ok(new { message = result });

        }

        [HttpPost("DeleteOverSixHoursOldData")]
        public IActionResult DeleteOverSixHoursOldData()
        {
            _loginService.DeleteOldData(logoutHours);

            return Ok(new { IsSuccess = true, message = "" });
        }

             
    }
    }
