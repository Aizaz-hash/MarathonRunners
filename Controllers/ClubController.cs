using Marathonrunner.Data;
using Marathonrunner.Interfaces;
using Marathonrunner.Models;
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

        public ClubController(DataContext context  , IClubRepository clubRepository , IPhotoService photoService)
        {
            _clubRepository = clubRepository;
            _photoService = photoService;
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
                    Address = new Address
                    {
                        city = clubVM.Address.city,
                        state = clubVM.Address.state,
                        street=clubVM.Address.street
                    }
                };
                _clubRepository.AddClub(club);
                return RedirectToAction("Index");
            }

            else
            {
                ModelState.AddModelError("", "Photo Upload failed !");
            }

            return View(clubVM);

        }

    }
}
