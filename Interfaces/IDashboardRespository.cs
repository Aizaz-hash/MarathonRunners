using Marathonrunner.Models;

namespace Marathonrunner.Interfaces
{
    public interface IDashboardRespository
    {
        Task<List<Races>> GetAllUserRaces();
        Task<List<Club>> GetAllUserClubs();
        Task<Users> GetUserById(string id);
        Task<Users> GetUserByIdNoTracking(string id);

        bool UpdateUser(Users users);

        public bool Save();



    }
}
