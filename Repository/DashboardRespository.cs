using Marathonrunner.Data;
using Marathonrunner.Interfaces;
using Marathonrunner.Models;
using Microsoft.EntityFrameworkCore;

namespace Marathonrunner.Repository
{
    public class DashboardRespository : IDashboardRespository
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DashboardRespository(DataContext context , IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }


        public async Task<List<Club>> GetAllUserClubs()
        {
            var curUser = _httpContextAccessor.HttpContext?.User.GetUserId();
            var userClubs = _context.clubs.Where(r => r.Users.Id == curUser);
            return userClubs.ToList();
        }

        public async Task<List<Races>> GetAllUserRaces()
        {
            var curUser = _httpContextAccessor.HttpContext?.User.GetUserId();
            var userRaces = _context.races.Where(r => r.Users.Id == curUser);
            return userRaces.ToList();
        }
    }
}
