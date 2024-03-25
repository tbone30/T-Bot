const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('insult_alex')
		.setDescription('Insults Alex!'),
	async execute(interaction) {
		await interaction.reply('<@443873513879633940> is a little bitch');
	},
};