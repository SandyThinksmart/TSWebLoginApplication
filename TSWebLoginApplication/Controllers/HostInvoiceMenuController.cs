using Microsoft.AspNetCore.Mvc;

namespace TSWebLoginApplication.Controllers
{
    public class HostInvoiceMenuController : Controller
    {
        public IActionResult HostInvoiceMenu()
        {
            return View();
        }
    }
}
