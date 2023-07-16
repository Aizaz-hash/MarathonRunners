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
                    userId = raceVM.userId,
                    RaceCategory = raceVM.RaceCategory,
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

        [HttpGet]

        public async Task<IActionResult> Edit(int id , int addressId)
        {
            var club = await _raceRepository.GetByIdAsync(id);

            if (club == null)
            {
                return View("Error");
            }

            var editraceVM = new EditRaceViewModel
            {
                Id = club.Id,
                Title = club.Title,
                Description = club.Description,
                AddressId = addressId,
                Address = club.Address,
                URL = club.Image,
                RaceCategory = club.RaceCategory,
                userId = club.userId,

            };
            return View(editraceVM);
        }


       [HttpPost]
        public async Task<IActionResult> Edit(int id, int addressId , EditRaceViewModel raceVM)
        {

            if (!ModelState.IsValid)
            {
                ModelState.AddModelError("", "Failed to edit club");
                return View("Edit", raceVM);
            }


            var userRaces = await _raceRepository.GetByIdAsyncNoTracking(id);

            if (userRaces != null)
            {
                try
                {
                    await _photoService.DeleteImageAsync(userRaces.Image);
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", "Could not delete Image");

                    return View("Edit", raceVM);
                }

                var photoresult = await _photoService.UploadImageAsync(raceVM.Image);

                var race = new Races
                {
                    Id = raceVM.Id,
                    Title = raceVM.Title,
                    Description = raceVM.Description,
                    Image = photoresult.Url.ToString(),
                    Address = raceVM.Address,
                    AddressId = addressId,
                    userId = raceVM.userId
                };

                _raceRepository.UpdateRace(race);

                return RedirectToAction("Index", "Dashboard");
            }

            else
            {
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
