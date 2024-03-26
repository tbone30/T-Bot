const { REST, Routes } = require('discord.js');
const { clientId, guildId1, guildId2, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		// Clear all existing commands
        // Fetch all commands
		/* nonfunctional code to clear all commands
		let removeCommands1 = await rest.get(
			Routes.applicationGuildCommands(clientId, guildId1)
		);
		
		// Delete all commands
		for (let command of removeCommands1) {
			await rest.delete(
				Routes.applicationGuildCommand(clientId, guildId1, command.id)
			);
		}

		let removeCommands2 = await rest.get(
			Routes.applicationGuildCommands(clientId, guildId2)
		);
		
		// Delete all commands
		for (let command of removeCommands2) {
			await rest.delete(
				Routes.applicationGuildCommand(clientId, guildId2, command.id)
			);
		} */

        // console.log(`Cleared all existing application (/) commands.`);

		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set

		const data1 = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId1),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data1.length} application (/) commands to the bone zone.`);

		const data2 = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId2),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data2.length} application (/) commands to the touchy feelies.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();