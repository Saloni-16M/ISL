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

        // Save the image temporarily
        var tempImagePath = Path.GetTempFileName();
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

        return Results.Ok(new { prediction = lastPrediction });
    })
    .WithName("GetPrediction")
    .WithOpenApi();

app.Run();

string RunPythonYOLOScript(string imagePath)
{

    string outputFilePath = "./../../model/detected_classes.txt";
    var processStartInfo = new System.Diagnostics.ProcessStartInfo
    {
        FileName = "./../../model/venv/bin/python",
        Arguments = $"./../../model/main.py --image {imagePath} --model ./../../model/trained1.pt",
        RedirectStandardOutput = true,
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
