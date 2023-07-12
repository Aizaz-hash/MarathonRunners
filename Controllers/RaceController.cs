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


        public async Task<IActionResult> Edit(int id)
        {
            var race = await _raceRepository.GetByIdAsync(id);

            if (race == null)
            {
                return View("Error");
            }


            var raceVM = new EditRaceViewModel
            {
                Title = race.Title,
                Description = race.Description,
                AddressId = race.AddressId,
                Address = race.Address,
                URL = race.Image,
                raceCategory = race.raceCategory
            };

            return View(raceVM);
        }


            [HttpPost]

        public async Task<IActionResult> Edit(int id, EditRaceViewModel raceVM)
        {
            if (!ModelState.IsValid)
            {
                ModelState.AddModelError("", "Failed to Edit Club");
                return View("Edit", raceVM);

            }

            var userclub = await _raceRepository.GetByIdAsyncNoTracking(id);

            if (userclub != null)
            {
                try
                {
                    await _photoService.DeleteImageAsync(userclub.Image);

                }

                catch (Exception ex)
                {
                    ModelState.AddModelError("", "Could not delete Photo");
                    return View(raceVM);
                }

                var photoResult = await _photoService.UploadImageAsync(raceVM.Image);

                var race = new Races
                {
                    Id = id,
                    Title = raceVM.Title,
                    Description = raceVM.Description,
                    Image = photoResult.Url.ToString(),
                    AddressId = raceVM.AddressId,
                    Address = raceVM.Address
                };

                _raceRepository.UpdateRace(race);
                return RedirectToAction("Index");
            }
            else
            {
                return View(raceVM);
            }
        }
    }
}
