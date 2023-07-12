using Marathonrunner.Data;
using Marathonrunner.Interfaces;
using Marathonrunner.Models;
using Microsoft.EntityFrameworkCore;

namespace Marathonrunner.Repository
{
    public class ClubRespository : IClubRepository
    {
        private readonly DataContext _context;

        public ClubRespository(DataContext context)
        {
            _context = context;
        }
        public bool AddClub(Club club)
        {
            _context.Add(club);

            return Save();
        }

        public bool DeleteClub(Club club)
        {
            _context.Remove(club);

            return Save();
        }

        public async  Task<IEnumerable<Club>> GetAll()
        {
          return  await _context.clubs.ToListAsync();
        }

        public async Task<Club> GetByIdAsync(int id)
        {
            return await _context.clubs.Include(i=>i.Address).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<Club>> GetClubByCity(string city)
        {
            return await _context.clubs.Where(c=>c.Address.city.Contains(city)).ToListAsync();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();

            return saved > 0 ? true : false;
        }

        public bool UpdateClub(Club club)
        {
            _context.Update(club);
            return Save();
        }
    }
}
