import os

directory = "node_modules"  # Replace with the actual directory path

# Get the list of folder names in the directory
folder_names = sorted([name for name in os.listdir(directory) if os.path.isdir(os.path.join(directory, name))])

# Create and write the folder names to a text file
with open("folder_names.txt", "w") as file:
    for name in folder_names:
        file.write(name + "\n")
