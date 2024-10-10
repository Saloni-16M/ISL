from ultralytics import YOLO
import cv2
import sys
import os
from IPython.display import display
from PIL import Image as PILImage

# Clear previous outputs (if running in Jupyter Notebook)
display.clear_output()

# Load the trained YOLO model
model = YOLO('trained1.pt')

# Ensure a file path is provided as an argument
if len(sys.argv) < 2:
    print("Please provide the image file path as a command-line argument.")
    sys.exit(1)

# Get the file path from the command line argument
image_path = sys.argv[1]

# Check if the provided file path exists
if not os.path.exists(image_path):
    print(f"File {image_path} not found.")
    sys.exit(1)

# Load the image using OpenCV
image = cv2.imread(image_path)

if image is None:
    print(f"Failed to load image {image_path}.")
    sys.exit(1)

# Make detections using the YOLO model
results = model.predict(source=image)

output_classes = []
for result in results:
    for box in result.boxes:
        # Get the class ID
        class_id = int(box.cls)  # Class ID
        # Get the class name from results.names
        class_name = results.names[class_id]
        output_classes.append(class_name)

if output_classes:
    print(", ".join(output_classes))
else:
    print("No objects detected.")