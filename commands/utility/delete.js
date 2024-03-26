const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('Deletes a command.')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('The command to delete.')
				.setRequired(true)),
	async execute(interaction) {
		const commandName = interaction.options.getString('command', true).toLowerCase();
		const command = interaction.client.commands.get(commandName);

        if (!command) {
			return interaction.reply(`There is no command with name \`${commandName}\`!`);
		}

		delete require.cache[require.resolve(`./${command.data.name}.js`)];

        try {
            interaction.client.commands.delete(command.data.name);
            await interaction.reply(`Command \`${command.data.name}\` was deleted!`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`There was an error while deleting a command \`${command.data.name}\`:\n\`${error.message}\``);
        }
	},
};
