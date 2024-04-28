import { ChatInputCommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('test'),
    async execute(interaction: ChatInputCommandInteraction){
        await interaction.reply('ping')
    }
}