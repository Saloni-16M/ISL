from ultralytics import YOLO
import cv2
import sys
import os


# Clear previous outputs (if running in Jupyter Notebook)
# Load the trained YOLO model

# Ensure a file path is provided as an argument
if len(sys.argv) < 5:
    print("Please provide the image file path as a command-line argument.")
    sys.exit(1)

# Get the file path from the command line argument
for i,arg in enumerate(sys.argv):
    if arg == "--image":
        image_path = sys.argv[i+1]
    if arg == "--model":
        model_path = sys.argv[i+1]

# Check if the provided file path exists
if not os.path.exists(image_path):
    print(f"File {image_path} not found.")
    sys.exit(1)

if not os.path.exists(model_path):
    print(f"File {model_path} not found.")
    sys.exit(1)
# Load the image using OpenCV

image = cv2.imread(image_path)
model = YOLO(model_path)

if image is None:
    print(f"Failed to load image {image_path}.")
    sys.exit(1)

# Make detections using the YOLO model
results = model.predict(source=image)

# Assuming 'results' contains predictions for the image
output_classes = []

# Iterate over the prediction results
for result in results:
    for box in result.boxes:
        # Get the class ID, assuming 'cls' is the attribute for the class label in 'box'
        class_id = int(box.cls)

        # Check if class_id is valid and get the class name from model.names
        if class_id < len(model.names):
            class_name = model.names[class_id]
        else:
            class_name = "Unknown"  # In case there's an invalid class_id

        # Append the class name to the output list
        output_classes.append(class_name)

output_file_path = "detected_classes.txt"  # Change this to your desired file path

# Write detected class names to the file
with open(output_file_path, 'w') as file:
    if output_classes:
        file.write(" ".join(output_classes))  # Write class names separated by space
    else:
        file.write("No objects detected.")  # Write message if no classes were detected
