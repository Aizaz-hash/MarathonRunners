using Marathonrunner.Data;
using Marathonrunner.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        public IActionResult Details(int id)
        {
            Races race = _context.races.Include(a => a.Address).FirstOrDefault(r => r.Id == id);

            return View(race);
        }
    }
}
