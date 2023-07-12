using Marathonrunner.Models;

namespace Marathonrunner.Interfaces
{
    public interface IClubRepository
    {
        Task<IEnumerable<Club>> GetAll();
        Task<Club> GetByIdAsync(int id);
        Task<Club> GetByIdAsyncNoTracking(int id);

        Task<IEnumerable<Club>> GetClubByCity(string city);

        bool AddClub(Club club);

        bool UpdateClub(Club club);

        bool DeleteClub(Club club);
        bool Save();

    }
}
