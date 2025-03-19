document.addEventListener("DOMContentLoaded", async () => {
	const fishSelector = document.getElementById("fishSelector");
	const regionsDiv = document.getElementById("regions");

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
		const fishingResponse = await fetch("https://raw.githubusercontent.com/Blackout-Webhooks-Actions/FishingData/refs/heads/main/fishing_info.json");
		const fishingData = await fishingResponse.json();

		// Fetch image mapping data
		const mappingResponse = await fetch("https://raw.githubusercontent.com/Blackout-Webhooks-Actions/GameData/refs/heads/main/image_mapping_data.json");
		const mappingData = await mappingResponse.json();

		// Fetch bait info
		const baitResponse = await fetch("https://raw.githubusercontent.com/Blackout-Webhooks-Actions/FishingData/refs/heads/main/bait_info.json");
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
		Object.values(fishingData).forEach(region => {
			Object.values(region).forEach(location => {
				location.Day.forEach(fish => fishSet.add(fish));
				location.Night.forEach(fish => fishSet.add(fish));
			});
		});

		// Convert set to array and sort
		const fishList = Array.from(fishSet).sort();

		// Create fish image selector
		fishList.forEach(fish => {
			if (fishImageMap[fish]) {
				const img = document.createElement("img");
				img.src = `https://api.hakush.in/gi/UI/${fishImageMap[fish]}.webp`;
				img.alt = fish;
				img.title = fish;
				img.classList.add("fish-selector");
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
			return Array.from(document.querySelectorAll(".fish-selector.selected")).map(img => img.dataset.fish);
		}

		// Function to get all selected fish
		function filterLocations(selectedFish) {
			regionsDiv.innerHTML = "";

			// If no fish are selected, show all locations
			const showAll = selectedFish.length === 0;

			Object.entries(fishingData).forEach(([region, locations]) => {
				let regionHasLocations = false;

				// Create the region div
				const regionDiv = document.createElement("div");
				regionDiv.classList.add("region");

				// Create the region title
				const regionTitle = document.createElement("h2");
				regionTitle.textContent = region;
				regionDiv.appendChild(regionTitle);

				// Create the #locations container for this region
				const locationsContainer = document.createElement("div");
				locationsContainer.id = "locations"; // Separate locations container
				regionDiv.appendChild(locationsContainer);


				Object.entries(locations).forEach(([location, data]) => {
					// Always show both Day and Night sections, regardless of selection
					const inDay = showAll || selectedFish.some(fish => data.Day.includes(fish));
					const inNight = showAll || selectedFish.some(fish => data.Night.includes(fish));

					if (inDay || inNight) {
						const locationDiv = document.createElement("div");
						locationDiv.classList.add("location");

						const title = document.createElement("h3");
						title.textContent = location;
						locationDiv.appendChild(title);

						// Show Day section
						const dayInfo = document.createElement("p");
						dayInfo.innerHTML = `<span class="time">Day:</span>`;
						locationDiv.appendChild(dayInfo);

						const dayFishContainer = document.createElement("div");
						dayFishContainer.classList.add("fish-container");
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
						data.Night.forEach(fish => {
							if (fishImageMap[fish]) {
								const fishBox = createFishElement(fish);
								nightFishContainer.appendChild(fishBox);
							}
						});
						locationDiv.appendChild(nightFishContainer);

						// Create location dropdown
						const dropdownContainer = document.createElement("div");
						dropdownContainer.classList.add("location-dropdown");

						const dropdownButton = document.createElement("button");
						dropdownButton.textContent = "Show Location";
						dropdownButton.classList.add("dropdown-button");

						const dropdownContent = document.createElement("div");
						dropdownContent.classList.add("dropdown-content");

						// Map Image
						const mapImg = document.createElement("img");
						mapImg.src = `https://raw.githubusercontent.com/Blackout-Webhooks-Actions/FishingData/refs/heads/main/images/Fishing Point ${location} Map.webp`;
						mapImg.alt = `${location} Map`;
						mapImg.classList.add("location-image");

						// Area Image
						const areaImg = document.createElement("img");
						areaImg.src = `https://raw.githubusercontent.com/Blackout-Webhooks-Actions/FishingData/refs/heads/main/images/Fishing Point ${location} Area.webp`;
						areaImg.alt = `${location} Area`;
						areaImg.classList.add("location-image");

						// Append images to dropdown
						dropdownContent.appendChild(mapImg);
						dropdownContent.appendChild(areaImg);

						// Toggle dropdown visibility on button click
						dropdownButton.addEventListener("click", () => {
							const allDropdowns = document.querySelectorAll(".dropdown-content");
							allDropdowns.forEach(dropdown => {
								dropdown.classList.toggle("show");
							});
						});

						// Append dropdown elements
						dropdownContainer.appendChild(dropdownButton);
						dropdownContainer.appendChild(dropdownContent);
						locationDiv.appendChild(dropdownContainer);

						// Add the location div to the locations container of the region
						locationsContainer.appendChild(locationDiv);
						regionHasLocations = true;
					}
				});

				if (regionHasLocations) {
					regionsDiv.appendChild(regionDiv);
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
			fishImg.title = fish;
			fishImg.classList.add("fish");
			fishImg.dataset.fish = fish;

			// Add click event listener to toggle selection
			fishImg.addEventListener("click", () => {
				// Toggle selected class on the clicked location fish
				fishImg.classList.toggle("selected");

				// Find the corresponding fish in the selector
				const selectorFishImg = document.querySelector(`#fishSelector img[data-fish="${fish}"]`);
				if (selectorFishImg) {
					selectorFishImg.classList.toggle("selected"); // Toggle selection
				}

				// Update location filtering based on selected fish
				const selectedFish = getSelectedFish();
				filterLocations(selectedFish);
			});

			fishBox.appendChild(fishImg);

			// Add bait icon if available
			if (fishToBait[fish] && baitImageMap[fishToBait[fish]]) {
				const baitId = baitImageMap[fishToBait[fish]];
				const baitImg = document.createElement("img");
				baitImg.src = `https://api.hakush.in/gi/UI/${baitId}.webp`;
				baitImg.alt = fishToBait[fish];
				baitImg.title = fishToBait[fish];
				baitImg.classList.add("bait");
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
