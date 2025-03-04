import requests
import json
import os

# URL of the version manifest
URL = 'https://piston-meta.mojang.com/mc/game/version_manifest_v2.json'
VERSIONS_FILE = 'minecraft_version_data.json'

# Fetch the version manifest data
response = requests.get(URL)
data = response.json()

# Load existing versions.json if it exists
if os.path.exists(VERSIONS_FILE):
	with open(VERSIONS_FILE, 'r') as file:
		versions_dict = json.load(file)
else:
	versions_dict = {}

# Extract new versions from the API
new_versions = {
	version['id']: version['releaseTime'].split('T')[0]
	for version in data['versions']
	if version['id'] not in versions_dict
}

# If no new versions, exit early
if not new_versions:
	print("No updates needed. minecraft_version_data.json is already up to date.")
	exit()

# Merge old and new versions
versions_dict.update(new_versions)

# Sort by release date first, then by version ID lexicographically
sorted_versions = dict(
	sorted(versions_dict.items(), key=lambda item: (item[1], item[0]))
)

# Convert to JSON and write back to file
with open(VERSIONS_FILE, 'w', encoding="utf-8") as file:
	json.dump(sorted_versions, file, indent=4)

print("minecraft_version_data.json has been updated.")
