using Marathonrunner.Interfaces;
using Marathonrunner.Models;
using Marathonrunner.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Marathonrunner.Controllers
{
    public class UsersController : Controller
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }


        [HttpGet("users")]
        public async Task<IActionResult> Index()
        {
            var usersList = await _userRepository.GetAllUsers();

            List<UsersViewModel> result = new List<UsersViewModel>();

            foreach (var user in usersList)
            {
                var userVM = new UsersViewModel
                {
                    Id = user.Id,
                    Username = user.UserName,
                    Pace = user.Pace,
                    Mileage = user.Mileage,
                    ProfileImageUrl = user.ProfileImageURL
                  
                };

                result.Add(userVM);
            }

            return View(result);
        }

        public async Task<IActionResult> Details(string id)
        {
            var user = await _userRepository.GetUsersById(id);
            var UserDetailVM = new UserDetailedViewModel()
            {
                Id = user.Id,
                Username = user.UserName,
                Pace = user.Pace,
                Mileage = user.Mileage,
                ProfileImageUrl = user.ProfileImageURL

            };

            return View(UserDetailVM);


        }
    }
}
