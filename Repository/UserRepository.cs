using Marathonrunner.Data;
using Marathonrunner.Interfaces;
using Marathonrunner.Models;
using Microsoft.EntityFrameworkCore;

namespace Marathonrunner.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }
        public bool Add(Users user)
        {
            throw new NotImplementedException();
        }

        public bool Delete(Users user)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Users>> GetAllUsers()
        {
            return await _context.Users.ToListAsync(); 
        }

        public async Task<Users> GetUsersById(string id)
        {
            return await _context.Users.FindAsync(id);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();

            return saved >0?true : false;
        }

        public bool Update(Users user)
        {
            _context.Users.Update(user);
            return Save();
        }
    }
}
