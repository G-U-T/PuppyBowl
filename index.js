let currentPlayers = [];
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/2310-fsa-et-web-ft-sf/players`;

const puppyGrid = document.getElementById(`puppy-grid`);

const form = document.querySelector(`form`);
const nameInput = document.querySelector(`[name='name']`);
const imageInput = document.querySelector(`[name='image']`);
const statusInput = document.querySelector(`[name='status']`);
const breedInput = document.querySelector(`[name='breed']`);
const teamInput = document.querySelector(`[name='team-id']`);
const cohortInput = document.querySelector(`[name='cohort-id']`);

form.addEventListener(`submit`, (event) => {
	event.preventDefault();

	const createdPuppy = {
		name: nameInput.value,
		imageUrl: imageInput.value,
		status: statusInput.value,
		breed: breedInput.value,
		teamId: teamInput.value,
		cohortId: cohortInput.value,
	}
	postPuppy(createdPuppy);
});

const postPuppy = async (puppy) => {
	const pup = await fetch(API_URL,
	{
		method: `POST`,
		body: JSON.stringify({
			name: puppy.name,
			imageUrl: puppy.imageUrl,
			status: puppy.status,
			breed: puppy.breed,
			teamId: puppy.teamId,
			cohortId: puppy.cohortId,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});
	main();
};

const obliteratePuppy = async (puppy) => {
	const json = await getJSON();
	currentPlayers = json.data.players;

	let puppyID;
	currentPlayers.forEach((player) => {
		if (player.id === puppy.id) puppyID = player.id;
	});

	try {
		await fetch(
			API_URL + `/${puppyID}`,
			{method: `DELETE`},
		);
	}
	catch (error) {
		console.log(`ERROR: ${error}`);
	}

	main();
};

const constructCard = (player, isMain) => {
	const cardBase = document.createElement(`section`);
	cardBase.classList.add(`center-flex`);
	puppyGrid.appendChild(cardBase);

	const cardLink = document.createElement(`button`);
	cardLink.innerText = isMain ? `Back to puppy list`: player.name;
	if (isMain) {
		cardBase.classList.add(`focused-card`);
		cardLink.addEventListener(`click`, () => {
			main();
		});
	}
	else {
		cardLink.addEventListener(`click`, () => {
			renderSpecificPlayerDetails(player);
		});
	}
	
	cardBase.appendChild(cardLink);

	const image = document.createElement(`img`);
	image.src = player.imageUrl;
	cardBase.appendChild(image);

	if (isMain) {
		const puppyLabel = document.createElement(`label`);
		puppyLabel.innerText = `
		Name: ${player.name}\n
		Breed: ${player.breed}\n
		Status: ${player.status}\n
		Team ID: ${player.teamId}\n
		Cohort ID: ${player.cohortId}\n
		`;
		cardBase.appendChild(puppyLabel);

		const dupeButton = document.createElement(`button`);
		dupeButton.innerText = `Duplicate Puppy`;
		dupeButton.addEventListener(`click`, () => {
			postPuppy(player);
		});
		cardBase.appendChild(dupeButton);

		const obliterateButton = document.createElement(`button`);
		obliterateButton.innerText = `Destroy Puppy`;
		obliterateButton.classList.add("dangerous");
		obliterateButton.addEventListener(`click`, () => {
			obliteratePuppy(player);
		});
		cardBase.appendChild(obliterateButton);
	}
};

const render = () => {
	puppyGrid.innerHTML = ``;

	currentPlayers.forEach((player) => {
		constructCard(player, false);
	});
};

const renderSpecificPlayerDetails = (player) => {
	puppyGrid.innerHTML = ``;

	constructCard(player, true);
};

const getJSON = async () => {
	const response = await fetch(API_URL);
	const responseJSON = await response.json();
	return responseJSON;
};

const main = async () => {
	const json = await getJSON();
	currentPlayers = json.data.players;
	render();
};

main();