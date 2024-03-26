const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('insult_user')
		.setDescription('Insults any User!')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('the user to insult')
                .setRequired(true)),
	async execute(interaction) {
        const user = interaction.options.getUser('user');
		await interaction.reply(`<@${user.id}> is a little slut`);
	},
};