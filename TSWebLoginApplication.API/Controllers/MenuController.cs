using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using TSWebLoginApplication.Application.Persistence.Services;
using TSWebLoginApplication.Domain.Resources;
using TSWebLoginApplication.Domain.Utility;
using Microsoft.VisualBasic;
using UAParser;
using TSWebLoginApplication.Application.Services;
using TSWebLoginApplication.Domain.Entities;

namespace TSWebLoginApplication.API.Controllers
{
  
    [Route("[Controller]")]
    [ApiController]
    public class MenuController : Controller
    {
        private readonly IMenuService _menuService;

        private readonly LocalizationServices _localization;
       
        protected int logoutHours;

        public MenuController(LocalizationServices localization, IMenuService menuService, IConfiguration _configuration)
        {

            _localization = localization;
            _menuService = menuService;
            logoutHours = Convert.ToInt32(_configuration.GetSection("Logout").GetSection("Hours").Value);

        }
        [HttpPost("DeleteLoginDetails")]
        public IActionResult DeleteLoginDetails(string CookieValue)
        {
          
            byte[] decrypt = Convert.FromBase64String(CookieValue);
            string uniqueId = Convert.ToString(System.Text.ASCIIEncoding.ASCII.GetString(decrypt));

            string[] spitId = uniqueId.Split('-');

            _menuService.DeleteLoginData(spitId[0]);
                  
            return Ok();

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

           var result = _menuService.CheckUserLastActivity(Convert.ToString(spitId[1]), browserName, Convert.ToString(spitId[0]));

            if (result != null)
            {
                if (authorizedUser == "true" && spitId[5].ToString() == "false")
                {
                    result.IsSuccess = false;

                }
                else
                {

                    DateTime startTime = DateTime.Now; //Current Date
               
                    DateTime lastUsedTime = result.LAST_USED_TIME; //Parse the String to the DateTime
                    TimeSpan span = startTime.Subtract(lastUsedTime);

               // int Secondsdiff = span.Seconds;
                //int Minutesdiff = span.Minutes;
                int Hoursdiff = span.Hours;

                    if (Hoursdiff >= logoutHours && authorizedUser == "true")
                    {
                        _menuService.DeleteLoginData(result.COOKIES_UNIQUE_ID);
                        result.IsSuccess = false;

                    }
                    else
                    {

                        _menuService.UpdateLastUsedTime(result.COOKIES_UNIQUE_ID);
                        result.IsSuccess = true;

                    }
                }
               
            }

           
            return Ok(new { Authorized_Value = Convert.ToString(spitId[5]), message = result });

        }
        [HttpPost("DecryptCookie")]
        public IActionResult DecryptCookie(string CookieValue)
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
            string authorizedUser = spitId[5];

          var result = _menuService.CheckUserLastActivity(Convert.ToString(spitId[1]), browserName, Convert.ToString(spitId[0]));
            if (result != null)
            {

                        _menuService.UpdateLastUsedTime(result.COOKIES_UNIQUE_ID);
                      
            }

            return Ok(new { Authorized_Value = Convert.ToString(spitId[5]), message= result });
        }

        [HttpPost("ValidateLoginUser")]
        public IActionResult ValidateLoginUser(string userName, string? pass, string authorizedUser)
        {
            var aa = ViewBag.AuthorizedUser;

            List<MST_USER_LOGIN> result = new List<MST_USER_LOGIN>();
            
            result = _menuService.ValidateLoginUser(userName.ToLower(), pass);
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


                        _menuService.SaveLoginDetails(userName, browserName, randomVal);

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
