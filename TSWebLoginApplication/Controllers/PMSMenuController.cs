using Microsoft.AspNetCore.Mvc;

namespace TSWebLoginApplication.Controllers
{
    public class PMSMenuController : Controller
    {
        protected string authorizeduser;
        protected string aspxurl;
        protected string coreurl;
        public PMSMenuController(IConfiguration _configuration)
        {
            authorizeduser = _configuration.GetSection("AuthorizationUser").GetSection("AuthorizedUser").Value;
            aspxurl = _configuration.GetSection("PMSASPX").GetSection("ASPXURL").Value;
            coreurl = _configuration.GetSection("PMSCORE").GetSection("COREURL").Value;
        }
        public IActionResult PMSMenuPage()
        {
            ViewBag.Authorizeduser = authorizeduser.ToLower();
            ViewBag.aspxurl = aspxurl.ToLower();
            ViewBag.coreurl = coreurl.ToLower();
            return View();
        }
    }
}
