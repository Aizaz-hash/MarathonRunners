using Marathonrunner.Data;
using Marathonrunner.Interfaces;
using Marathonrunner.Models;
using Marathonrunner.Repository;
using Marathonrunner.Services;
using Marathonrunner.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Marathonrunner.Controllers
{
    public class RaceController : Controller
    {
        private readonly IRaceRepository _raceRepository;
        private readonly IPhotoService _photoService;

        public RaceController(IRaceRepository raceRepository , IPhotoService photoService)
        {
            _raceRepository = raceRepository;
            _photoService = photoService;
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
        public async Task<IActionResult> Create(CreateRaceViewModel raceVM)
        {
            if (ModelState.IsValid)
            {
                var result = await _photoService.UploadImageAsync(raceVM.Image);
                var race = new Races
                {

                    Title = raceVM.Title,
                    Description = raceVM.Description,
                    Image = result.Url.ToString(),
                    Address = new Address
                    {
                        city = raceVM.Address.city,
                        state = raceVM.Address.state,
                        street = raceVM.Address.street
                    }
                };
                _raceRepository.AddRace(race);
                return RedirectToAction("Index");
            }

            else
            {
                ModelState.AddModelError("", "Photo Upload failed !");
            }

            return View(raceVM);

        }
    }
}
