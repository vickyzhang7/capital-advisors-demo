import json
import subprocess

# Load dependencies from JSON
with open('dependencies.json', 'r') as file:
    data = json.load(file)

# Install dependencies
for package, version in data['dependencies'].items():
    subprocess.run(['pip', 'install', f'{package}=={version}'])
