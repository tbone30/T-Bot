const { REST, Routes } = require('discord.js');
const { clientId, guildId1, guildId2, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');


// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
        console.log('Started wiping all global commands.');

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

        console.log('Global commands wiped.');

	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();