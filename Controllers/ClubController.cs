using Marathonrunner.Data;
using Marathonrunner.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

            return View(clubs);
        }


        public IActionResult Details(int id) 
        {
            Club club = _context.clubs.Include(a=>a.Address).FirstOrDefault(c => c.Id == id);

            return View(club);
        }

    }
}
