using Marathonrunner.Data;
using Marathonrunner.Interfaces;
using Marathonrunner.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace Marathonrunner.Controllers
{
    public class ClubController : Controller
    {
        private readonly IClubRepository _clubRepository;

        public ClubController(DataContext context  , IClubRepository clubRepository)
        {
            _clubRepository = clubRepository;
        }

        public async Task<IActionResult> Index()
        {

           IEnumerable<Club> clubs = await _clubRepository.GetAll();

            return View(clubs);
        }


        public async Task<IActionResult> Details(int id) 
        {
            Club club = await _clubRepository.GetByIdAsync(id);

            return View(club);
        }

        public async Task<IActionResult> Create()
        {
            return View();
        }

        [HttpPost]

        public async Task<IActionResult> Create(Club club)
        {
            if (!ModelState.IsValid)
            {
                return View(club);
            }
            _clubRepository.AddClub(club);

            return RedirectToAction("Index");
        }

    }
}
