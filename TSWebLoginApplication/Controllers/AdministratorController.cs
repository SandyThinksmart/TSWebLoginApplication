using Microsoft.AspNetCore.Mvc;

namespace TSWebLoginApplication.Controllers
{

    public class AdministratorController : Controller
    {
        protected string authorizeduser;
        protected string aspxurl;
        public AdministratorController(IConfiguration _configuration)
        {
            authorizeduser = _configuration.GetSection("AuthorizationUser").GetSection("AuthorizedUser").Value;
            aspxurl = _configuration.GetSection("PMSASPX").GetSection("ASPXURL").Value;
           
        }
        public IActionResult Administrator()
        {
            ViewBag.Authorizeduser = authorizeduser.ToLower();
            ViewBag.aspxurl = aspxurl.ToLower();
            return View();
        }
    }
}
