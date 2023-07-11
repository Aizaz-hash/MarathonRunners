using Marathonrunner.Data;
using Microsoft.AspNetCore.Mvc;

namespace Marathonrunner.Controllers
{
    public class RaceController : Controller
    {
        private readonly DataContext _context;

        public RaceController(DataContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            var races = _context.races.ToList();
            return View(races);
        }
    }
}
