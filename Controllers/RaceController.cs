using Marathonrunner.Data;
using Marathonrunner.Interfaces;
using Marathonrunner.Models;
using Marathonrunner.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Marathonrunner.Controllers
{
    public class RaceController : Controller
    {
        private readonly IRaceRepository _raceRepository;

        public RaceController(IRaceRepository raceRepository)
        {
            _raceRepository = raceRepository;
        }
        public async Task<IActionResult> Index()
        {

            IEnumerable<Races> races = await _raceRepository.GetAll();

            return View(races);
        }


        public async Task<IActionResult> Details(int id)
        {
            Races race = await _raceRepository.GetByIdAsync(id);

            return View(race);
        }

        public async Task<IActionResult> Create()
        {
            return View();
        }

        [HttpPost]

        public async Task<IActionResult> Create(Races race)
        {
            if (!ModelState.IsValid)
            {
                return View(race);
            }
            _raceRepository.AddRace(race);

            return RedirectToAction("Index");
        }
    }
}
