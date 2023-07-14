using Marathonrunner.Data;
using Marathonrunner.Interfaces;
using Marathonrunner.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Marathonrunner.Controllers
{
    public class DashboardController : Controller
    {
        private readonly IDashboardRespository _dashboardRespository;

        public DashboardController(IDashboardRespository dashboardRespository )
        {
            _dashboardRespository = dashboardRespository;
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
    }
}
