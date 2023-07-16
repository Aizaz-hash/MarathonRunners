using CloudinaryDotNet.Actions;
using Marathonrunner.Data;
using Marathonrunner.Interfaces;
using Marathonrunner.Models;
using Marathonrunner.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Marathonrunner.Controllers
{
    public class DashboardController : Controller
    {
        private readonly IDashboardRespository _dashboardRespository;

        public readonly IHttpContextAccessor _HttpContextAccessor;

        public readonly IPhotoService _PhotoService;

        public DashboardController(IDashboardRespository dashboardRespository,
            IHttpContextAccessor httpContextAccessor,
            IPhotoService photoService)
        {
            _dashboardRespository = dashboardRespository;
            _HttpContextAccessor = httpContextAccessor;
            _PhotoService = photoService;
        }

        private void MapUserEdit(Users users, EditUserDashboardViewModel editVM,
            ImageUploadResult imageUploadResult)
        {
            users.Id = editVM.Id;
            users.Pace = editVM.Pace;
            users.Mileage = editVM.Mileage;
            users.ProfileImageURL = imageUploadResult.Url.ToString();
            users.city = editVM.City;
            users.state = editVM.State;
        }
        public async Task<IActionResult> Index()
        {
            var userRaces = await _dashboardRespository.GetAllUserRaces();
            var userClubs = await _dashboardRespository.GetAllUserClubs();
            var dashboardViewModel = new DashboardViewModel()
            {
                Races = userRaces,
                Clubs = userClubs
            };
            return View(dashboardViewModel);
        }

        public async Task<IActionResult> EditUserProfile()
        {
            var currentUserID = _HttpContextAccessor.HttpContext.User.GetUserId();
            var user = await _dashboardRespository.GetUserById(currentUserID);

            if (user == null)
            {
                return View("Erro");
            }
            var EditUserDashboardVM = new EditUserDashboardViewModel()
            {
                Id = currentUserID,
                Pace = user.Pace,
                Mileage = user.Mileage,
                ProfileImageUrl = user.ProfileImageURL,
                City = user.city,
                State = user.state
            };
            return View(EditUserDashboardVM);
        }

        [HttpPost]

        public async Task<IActionResult> EditUserProfile(EditUserDashboardViewModel editVM)
        {
            if (!ModelState.IsValid)
            {
                ModelState.AddModelError("", "Cannot Edit Profile !");
                return View("EditUserProfile", editVM);
            }

            var user = await _dashboardRespository.GetUserByIdNoTracking(editVM.Id);

            if (user.ProfileImageURL == "" || user.ProfileImageURL == null)
            {
                var photo = await _PhotoService.UploadImageAsync(editVM.Image);
                MapUserEdit(user, editVM, photo);
                _dashboardRespository.UpdateUser(user);

                return RedirectToAction("Index", "Home");
            }

            else
            {
                try {

                    await _PhotoService.DeleteImageAsync(user.ProfileImageURL);
                }

                catch (Exception ex)
                {

                    ModelState.AddModelError("", "could not Delete Photo " + ex);
                    return View(editVM);
                }

                var photo = await _PhotoService.UploadImageAsync(editVM.Image);
                MapUserEdit(user, editVM, photo);
                _dashboardRespository.UpdateUser(user);

                return RedirectToAction("Index", "Home");
            }
        }


     
    }
}
