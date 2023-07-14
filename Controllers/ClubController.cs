using Marathonrunner.Data;
using Marathonrunner.Interfaces;
using Marathonrunner.Models;
using Marathonrunner.Repository;
using Marathonrunner.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace Marathonrunner.Controllers
{
    public class ClubController : Controller
    {
        private readonly IClubRepository _clubRepository;
        private readonly IPhotoService _photoService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ClubController(IClubRepository clubRepository , IPhotoService photoService , IHttpContextAccessor httpContextAccessor)
        {
            _clubRepository = clubRepository;
            _photoService = photoService;
            _httpContextAccessor = httpContextAccessor;
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
            var curUserId = HttpContext.User.GetUserId();
            var ClubVM =new CreateClubViewModel
            {
                userId = curUserId
            };
            return View(ClubVM);
        }

        [HttpPost]

        public async Task<IActionResult> Create(CreateClubViewModel clubVM)
        {
            if (ModelState.IsValid)
            {
                var result = await _photoService.UploadImageAsync(clubVM.Image);
                var club = new Club
                {
                    Title = clubVM.Title,
                    Description = clubVM.Description,
                    Image = result.Url.ToString(),
                    userId = clubVM.userId,
                    clubCategory = clubVM.clubCategory,
                    Address = new Address
                    {
                        city = clubVM.Address.city,
                        state = clubVM.Address.state,
                        street=clubVM.Address.street
                    }
                };
                _clubRepository.AddClub(club);
                return RedirectToAction("Index" , "Dashboard");
            }

            else
            {
                TempData["ClubError"] = "Cannot Add Race , Please try Again";
                ModelState.AddModelError("", "Photo Upload failed !");
            }

            return View(clubVM);

        }

        public async Task<IActionResult> Edit(int id)
        {
            var club = await _clubRepository.GetByIdAsync(id);

            if (club == null)
            {
                return View("Error");
            }


            var ClubVM = new EditClubViewModel
            {
                Title = club.Title,
                Description = club.Description,
                AddressId = club.AddressId,
                userId = club.userId,
                Address = club.Address,
                URL = club.Image,
                ClubCategory = club.clubCategory
            };

            return View(ClubVM);

        }

        [HttpPost]

        public async Task<IActionResult> Edit(int id , EditClubViewModel clubVM)
        {
            if (!ModelState.IsValid)
            {
                ModelState.AddModelError("", "Failed to Edit Race");
                return View("Edit", clubVM);
            }

            var userclub = await _clubRepository.GetByIdAsyncNoTracking(id);

            if (userclub != null)
            {
                try
                {
                    await _photoService.DeleteImageAsync(userclub.Image);

                }

                catch (Exception ex)
                {
                    ModelState.AddModelError("", "Could not delete Photo" + ex);
                    return View(clubVM);
                }

                var photoResult = await _photoService.UploadImageAsync(clubVM.Image);

                var club = new Club
                {
                    Id = id,
                    Title = clubVM.Title,
                    Description = clubVM.Description,
                    Image = photoResult.Url.ToString(),
                    AddressId = Int32.Parse(clubVM.AddressId.ToString()),
                    //(int)clubVM.AddressId,
                    Address = clubVM.Address,
                    userId = clubVM.userId
                };

                _clubRepository.UpdateClub(club);
                return RedirectToAction("Index", "Dashboard");
            }
            else
            {
                TempData["RaceEditError"] = "Cannot Edit Race , Please try Again";
                return View(clubVM);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var clubDetails = await _clubRepository.GetByIdAsync(id);
            if (clubDetails == null) return View("Error");
            return View(clubDetails);
        }

        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteClub(int id)
        {
            var clubDetails = await _clubRepository.GetByIdAsync(id);

            if (clubDetails == null)
            {
                return View("Error");
            }

            if (!string.IsNullOrEmpty(clubDetails.Image))
            {
                _ = _photoService.DeleteImageAsync(clubDetails.Image);
            }

            _clubRepository.DeleteClub(clubDetails);
            return RedirectToAction("Index", "Dashboard");
        }
    }


}
