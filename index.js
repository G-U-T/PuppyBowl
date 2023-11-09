let currentPlayers = [];

const puppyGrid = document.getElementById(`puppy-grid`);

const constructCard = (player) => {
	const cardBase = document.createElement(`section`);
	cardBase.classList.add(`center-flex`);
	puppyGrid.appendChild(cardBase);

	const cardLink = document.createElement(`button`);
	cardLink.innerText = player.name;
	cardBase.appendChild(cardLink);

	const image = document.createElement(`img`);
	image.src = player.imageUrl;
	cardBase.appendChild(image);
};

const render = () => {
	currentPlayers.forEach((player) => {
		constructCard(player);
	});
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