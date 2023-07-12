using Marathonrunner.Data;
using Marathonrunner.Interfaces;
using Marathonrunner.Models;
using Microsoft.EntityFrameworkCore;

namespace Marathonrunner.Repository
{
    public class RaceRepository : IRaceRepository
    {
        private readonly DataContext _context;

        public RaceRepository(DataContext context)
        {
            _context = context;
        }


        public bool AddRace(Races race)
        {
            _context.Add(race);
            return Save();
        }

        public bool DeleteRace(Races race)
        {
            _context.Remove(race);

            return Save();
        }

        public async Task<IEnumerable<Races>> GetAll()
        {
            return await _context.races.ToListAsync();
        }

        public async Task<Races> GetByIdAsync(int id)
        {

            return await _context.races.Include(i => i.Address).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Races> GetByIdAsyncNoTracking(int id)
        {
            return await _context.races.Include(i => i.Address).AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<Races>> GetRaceByCategory(string category)
        {
            return await _context.races.Where(r=>r.raceCategory.Equals(category)).ToListAsync();
        }

        public async Task<IEnumerable<Races>> GetRaceByCity(string city)
        {
            return await _context.races.Where(c => c.Address.city.Contains(city)).ToListAsync();

        }

        public bool Save()
        {
            var saved = _context.SaveChanges();

            return saved > 0 ? true : false;
        }

        public bool UpdateRace(Races race)
        {
            _context.Update(race);

            return Save();
        }
    }
}
