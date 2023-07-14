using Marathonrunner.Data;
using Marathonrunner.Interfaces;
using Marathonrunner.Models;
using Marathonrunner.Repository;
using Marathonrunner.Services;
using Marathonrunner.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Diagnostics;

namespace Marathonrunner.Controllers
{
    public class RaceController : Controller
    {
        private readonly IRaceRepository _raceRepository;
        private readonly IPhotoService _photoService;
        private readonly IHttpContextAccessor _httpContextAccessor;


        public RaceController(IRaceRepository raceRepository , IPhotoService photoService, IHttpContextAccessor httpContextAccessor)
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
            var curUserId = HttpContext.User.GetUserId();
            var RaceVM = new CreateRaceViewModel
            {
                userId = curUserId
            };
            return View(RaceVM);
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
                    //userId = raceVM.userId,
                    raceCategory = raceVM.raceCategory,
                    Address = new Address
                    {
                        city = raceVM.Address.city,
                        state = raceVM.Address.state,
                        street = raceVM.Address.street
                    }
                };
                _raceRepository.AddRace(race);
                return RedirectToAction("Index" , "Dashboard");
            }

            else
            {
                TempData["RaceError"] = "Cannot Add new Race , Please try Again";
                ModelState.AddModelError("", "Photo Upload failed !");
            }

            return View(raceVM);

        }


        public async Task<IActionResult> Edit(int id)
        {
            Debug.WriteLine("1");

            var race = await _raceRepository.GetByIdAsync(id);

            if (race == null)
            {
                return View("Error");
            }

            Debug.WriteLine("2");

            var raceVM = new EditRaceViewModel
            {

                Title = race.Title,
                Description = race.Description,
                AddressId = race.AddressId,
                userId = race.userId,
                Address = race.Address,
                URL = race.Image,
                RaceCategory = race.raceCategory
            };
            Debug.WriteLine("3");


            return View(raceVM);
        }


       [HttpPost]
        public async Task<IActionResult> Edit(int id, EditRaceViewModel raceVM)
        {
            Debug.WriteLine("4");

            if (!ModelState.IsValid)
            {
                ModelState.AddModelError("", "Failed to Edit Race");
                return View("Edit", raceVM);

            }
            Debug.WriteLine("5");


            var userRace = await _raceRepository.GetByIdAsyncNoTracking(id);

            if (userRace != null)
            {
                Debug.WriteLine("6");

                try
                {
                    await _photoService.DeleteImageAsync(userRace.Image);

                }

                catch (Exception ex)
                {
                    ModelState.AddModelError("", "Could not delete Photo" + ex);
                    return View(raceVM);
                }

                var photoResult = await _photoService.UploadImageAsync(raceVM.Image);

                var race = new Races
                {
                    Id = id,
                    Title = raceVM.Title,
                    Description = raceVM.Description,
                    Image = photoResult.Url.ToString(),
                    AddressId = (int)(raceVM.AddressId),
                    Address = raceVM.Address,
                    userId = raceVM.userId
                };

                Debug.WriteLine("7");

                _raceRepository.UpdateRace(race);
                return RedirectToAction("Index", "Dashboard");
            }


            else
                Debug.WriteLine("8");

            {
                TempData["RaceEditError"] = "Cannot Edit Race , Please try Again";
                return View(raceVM);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var raceDetails = await _raceRepository.GetByIdAsync(id);
            if (raceDetails == null) return View("Error");
            return View(raceDetails);
        }

        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteRace(int id)
        {
            var raceDetails = await _raceRepository.GetByIdAsync(id);

            if (raceDetails == null)
            {
                return View("Error");
            }

            if (!string.IsNullOrEmpty(raceDetails.Image))
            {
                _ = _photoService.DeleteImageAsync(raceDetails.Image);
            }

            _raceRepository.DeleteRace(raceDetails);
            return RedirectToAction("Index", "Dashboard");
        }
    }
}
