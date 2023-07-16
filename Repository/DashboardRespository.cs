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

        public async Task<Users> GetUserById(string id)
        {

            return await _context.Users.FindAsync(id);

        }   
        
        public async Task<Users> GetUserByIdNoTracking(string id)
        {

            return await _context.Users.Where(u=>u.Id==id).AsNoTracking().FirstOrDefaultAsync();

        }

        public bool UpdateUser(Users users)
        {
            _context.Users.Update(users);

            return Save();


        }


        public bool Save()
        {
            var saved = _context.SaveChanges();

            return saved > 0 ? true : false;

        }


        
    }
}
