using Marathonrunner.Data;
using Microsoft.AspNetCore.Mvc;

namespace Marathonrunner.Controllers
{
    public class ClubController : Controller
    {
        private readonly DataContext _context;

        public ClubController(DataContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {

            var clubs = _context.clubs.ToList();
         
            return View(clubs );
        }
    }
}
