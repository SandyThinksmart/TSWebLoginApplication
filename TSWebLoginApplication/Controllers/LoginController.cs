using Microsoft.AspNetCore.Mvc;
namespace TSWebLoginApplication.Controllers
{
    public class LoginController : Controller
    {
        protected string authorizeduser;
       
        public LoginController(IConfiguration _configuration)
        {
            authorizeduser = _configuration.GetSection("AuthorizationUser").GetSection("AuthorizedUser").Value;
           
        }
       
            public IActionResult Login()
        {
            HttpContext.Response.Cookies.Delete(".AspNetCore.Culture"); // To set auto JP Culture removed 
            ViewBag.Authorizeduser = authorizeduser.ToLower();
          
            return View();
        }

        //public IActionResult OpenMenuPage()
        //{
        //   // return Redirect("/Menu/MenuPage");

        //    return RedirectToAction("MenuPage", "Menu");
        //}
       
   
    }

    }
