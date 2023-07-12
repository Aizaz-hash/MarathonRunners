using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Marathonrunner.Helpers;
using Marathonrunner.Interfaces;
using Microsoft.Extensions.Options;

namespace Marathonrunner.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _options;

        public PhotoService(IOptions<CloudinarySettings>  options)
        {
            var acc = new Account(

                options.Value.CloudName,
                options.Value.ApiKey, 
                options.Value.ApiSecret
                
                );

            _options = new Cloudinary( acc );
        }
        public async Task<DeletionResult> DeleteImageAsync(string id)
        {
            var deletionParams = new DeletionParams(id);
            var result = await _options.DestroyAsync(deletionParams);
            return result;
        }

        public async Task<ImageUploadResult> UploadImageAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();

            if (file.Length>0)
            {
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face")
                };

                uploadResult = await _options.UploadAsync(uploadParams);
            }
            return uploadResult;
        }

    }
}
