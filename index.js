const getJSON = async () => {
	const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2310-fsa-et-web-ft-sf/players`);
	const responseJSON = await response.json();
	return responseJSON;
}

const main = async () => {
	const json = await getJSON();
	const players = json.data.players
	console.log(players);
};

main();