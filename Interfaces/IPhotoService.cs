using CloudinaryDotNet.Actions;

namespace Marathonrunner.Interfaces
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> UploadImageAsync(IFormFile file);
        Task<DeletionResult> DeleteImageAsync(string id);
    }
}
