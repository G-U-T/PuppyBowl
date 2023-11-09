let currentPlayers = [];

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
	const pup = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2310-fsa-et-web-ft-sf/players`,
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

const constructCard = (player, isMain) => {
	const cardBase = document.createElement(`section`);
	cardBase.classList.add(`center-flex`);
	puppyGrid.appendChild(cardBase);

	const cardLink = document.createElement(`button`);
	cardLink.innerText = player.name;
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
		const breedLabel = document.createElement(`label`);
		breedLabel.innerText = `Breed: ` + player.breed;
		cardBase.appendChild(breedLabel);

		const statusLabel = document.createElement(`label`);
		statusLabel.innerText = `Status: ` + player.status;
		cardBase.appendChild(statusLabel);

		const dupeButton = document.createElement(`button`);
		dupeButton.innerText = `Duplicate Puppy`;
		dupeButton.addEventListener(`click`, () => {
			postPuppy(player);
		});
		cardBase.appendChild(dupeButton);
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
	const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2310-fsa-et-web-ft-sf/players`);
	const responseJSON = await response.json();
	return responseJSON;
};

const main = async () => {
	const json = await getJSON();
	const players = json.data.players;
	currentPlayers = players;
	render();
};

main();