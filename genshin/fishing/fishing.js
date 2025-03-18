document.addEventListener("DOMContentLoaded", async () => {
	const fishSelector = document.getElementById("fishSelector");
	const locationsDiv = document.getElementById("locations");

	const baitImageMap = {
		"Fruit Paste Bait": "UI_ItemIcon_111023",
		"Redrot Bait": "UI_ItemIcon_111024",
		"False Worm Bait": "UI_ItemIcon_111025",
		"Fake Fly Bait": "UI_ItemIcon_111026",
		"Sugardew Bait": "UI_ItemIcon_111028",
		"Sour Bait": "UI_ItemIcon_111030",
		"Flashing Maintenance Mek Bait": "UI_ItemIcon_111031",
		"Spinelgrain Bait": "UI_ItemIcon_111033",
		"Emberglow Bait": "UI_ItemIcon_111034"
	};

	try {
		// Fetch fishing data
		const fishingResponse = await fetch("fishing_info.json");
		const fishingData = await fishingResponse.json();

		// Fetch image mapping data
		const mappingResponse = await fetch("https://raw.githubusercontent.com/Blackout-Webhooks-Actions/GameData/refs/heads/main/image_mapping_data.json");
		const mappingData = await mappingResponse.json();

		// Fetch bait info
		const baitResponse = await fetch("bait_info.json");
		const baitData = await baitResponse.json();

		// Extract fish image mappings
		const fishImageMap = mappingData.Monsters.Animals;

		// Reverse bait mapping (Fish → Bait)
		const fishToBait = {};
		Object.entries(baitData).forEach(([bait, fishList]) => {
			fishList.forEach(fish => {
				fishToBait[fish] = bait;
			});
		});

		// Collect unique fish names
		const fishSet = new Set();
		Object.values(fishingData).forEach(location => {
			location.Day.forEach(fish => fishSet.add(fish));
			location.Night.forEach(fish => fishSet.add(fish));
		});

		// Convert set to array and sort
		const fishList = Array.from(fishSet).sort();

		// Create fish image selector
		fishList.forEach(fish => {
			if (fishImageMap[fish]) {
				const img = document.createElement("img");
				img.src = `https://api.hakush.in/gi/UI/${fishImageMap[fish]}.webp`;
				img.alt = fish;
				img.classList.add("fish");
				img.dataset.fish = fish;
				fishSelector.appendChild(img);

				img.addEventListener("click", () => {
					img.classList.toggle("selected");
					const selectedFish = getSelectedFish();
					filterLocations(selectedFish);
				});
			}
		});

		// Function to get all selected fish
		function getSelectedFish() {
			const selectedImages = document.querySelectorAll(".fish.selected");
			const selectedFish = [];
			selectedImages.forEach(img => selectedFish.push(img.dataset.fish));
			return selectedFish;
		}

		// Function to filter locations and display images with bait
		function filterLocations(selectedFish) {
			locationsDiv.innerHTML = "";

			// If no fish are selected, show all locations
			const showAll = selectedFish.length === 0;

			Object.entries(fishingData).forEach(([location, data]) => {
				// Always show both Day and Night sections, regardless of selection
				const inDay = showAll || selectedFish.some(fish => data.Day.includes(fish));
				const inNight = showAll || selectedFish.some(fish => data.Night.includes(fish));

				if (inDay || inNight) {
					const locationDiv = document.createElement("div");
					locationDiv.classList.add("location");

					const title = document.createElement("h2");
					title.textContent = location;
					locationDiv.appendChild(title);

					// Show Day section
					const dayInfo = document.createElement("p");
					dayInfo.innerHTML = `<span class="time">Day:</span>`;
					locationDiv.appendChild(dayInfo);

					const dayFishContainer = document.createElement("div");
					dayFishContainer.classList.add("fish-container");
					// Show all fish in the Day section, regardless of selection
					data.Day.forEach(fish => {
						if (fishImageMap[fish]) {
							const fishBox = createFishElement(fish);
							dayFishContainer.appendChild(fishBox);
						}
					});
					locationDiv.appendChild(dayFishContainer);

					// Show Night section
					const nightInfo = document.createElement("p");
					nightInfo.innerHTML = `<span class="time">Night:</span>`;
					locationDiv.appendChild(nightInfo);

					const nightFishContainer = document.createElement("div");
					nightFishContainer.classList.add("fish-container");
					// Show all fish in the Night section, regardless of selection
					data.Night.forEach(fish => {
						if (fishImageMap[fish]) {
							const fishBox = createFishElement(fish);
							nightFishContainer.appendChild(fishBox);
						}
					});
					locationDiv.appendChild(nightFishContainer);

					locationsDiv.appendChild(locationDiv);
				}
			});
		}

		// Function to create a fish image with bait overlay
		function createFishElement(fish) {
			const fishBox = document.createElement("div");
			fishBox.classList.add("fish-box");

			const fishImg = document.createElement("img");
			fishImg.src = `https://api.hakush.in/gi/UI/${fishImageMap[fish]}.webp`;
			fishImg.alt = fish;

			fishBox.appendChild(fishImg);

			// Add bait icon if available
			if (fishToBait[fish] && baitImageMap[fishToBait[fish]]) {
				const baitId = baitImageMap[fishToBait[fish]];
				const baitImg = document.createElement("img");
				baitImg.src = `https://api.hakush.in/gi/UI/${baitId}.webp`;
				baitImg.alt = fishToBait[fish];
				baitImg.classList.add("bait-icon");
				fishBox.appendChild(baitImg);
			}

			return fishBox;
		}

		// Initially show all locations and fish
		filterLocations([]);
	} catch (error) {
		console.error("Error loading fishing data:", error);
	}
});
