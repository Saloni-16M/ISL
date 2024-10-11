using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:5173") // Your frontend URL
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();
app.UseCors("AllowSpecificOrigin");
app.UseHttpsRedirection();

string lastPrediction = string.Empty;

app.MapPost("/ISL", async (HttpRequest request) =>
    {
        if (!request.HasFormContentType || request.Form.Files.Count == 0)
        {
            return Results.BadRequest("No image file uploaded.");
        }
        
        var imageFile = request.Form.Files[0];

        // Get the MIME type and determine the appropriate extension
        var mimeType = imageFile.ContentType; // e.g., "image/jpeg" or "image/png"
        var extension = mimeType switch
        {
        "image/jpeg" => ".jpeg",
        "image/png" => ".png",
        _ => null
        };

        if (extension == null)
        {
        return Results.BadRequest("Unsupported file format. Please upload a JPEG or PNG image.");
        }

// Save the image with the appropriate extension
        var tempImagePath = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString() + extension);

        using (var stream = new FileStream(tempImagePath, FileMode.Create))
        {
            await imageFile.CopyToAsync(stream);
        }
        // Call the Python YOLO model
        lastPrediction = RunPythonYOLOScript(tempImagePath);

        // Clean up the image file
        File.Delete(tempImagePath);

        return Results.Ok(new { message = "Image processed", prediction = lastPrediction });
    })
    .WithName("ProcessImage")
    .WithOpenApi();

app.MapGet("/ISL", () =>
    {
        if (string.IsNullOrEmpty(lastPrediction))
            return Results.Ok(new { message = "No prediction available." });

        return Results.Ok(new { message = lastPrediction });
    })
    .WithName("GetPrediction")
    .WithOpenApi();

app.Run();

string RunPythonYOLOScript(string imagePath)
{

    string outputFilePath = Path.GetFullPath("./../../model/detected_classes.txt");
    var processStartInfo = new ProcessStartInfo
    {
        FileName = "./../../model/venv/bin/python",
        Arguments = $"./../../model/main.py --image {imagePath} --model ./../../model/trained1.pt",
        RedirectStandardOutput = false,
        UseShellExecute = false,
        CreateNoWindow = true
    };

    using (var process = Process.Start(processStartInfo))
    {
        if (process == null)
        {
            return String.Empty; // Handle case where process could not be started
        }

        process.WaitForExit();
    }

    if (File.Exists(outputFilePath))
    {
        return File.ReadAllText(outputFilePath); // Read and return the contents of the output file
    }
    else
    {
        return String.Empty;
    }
}
