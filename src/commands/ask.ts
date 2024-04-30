import {scheduler} from 'node:timers/promises'

import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { channel } from 'node:diagnostics_channel';


export default {
    data: new SlashCommandBuilder()
        .setName('ask')
        .setDescription('Ask yo friends for some help')
        .addStringOption(options => options.setName('title').setDescription('Title of your inquiry').setRequired(true))
        .addStringOption(option => option.setName('inquiry').setDescription('Description of your inquiry').setRequired(true))
        .addRoleOption(option => option.setName('category').setDescription('Which Subject/Class is this inquiry for?').setRequired(true))
        .addAttachmentOption(option => option.setName('file_attachment').setDescription('File(s) to attach to this inquiry')),
    
    async execute(interaction: ChatInputCommandInteraction){
        await interaction.deferReply({ephemeral: true})

        const title = interaction.options.getString('title',true)
        const inquiry = interaction.options.getString('inquiry')
        const category = interaction.options.getRole('category')
        const file = interaction.options.getAttachment('file_attachment')

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setAuthor({name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL()})
            .setDescription(inquiry)
            .setTimestamp(new Date())

        const postBtn = new ButtonBuilder()
            .setCustomId('yes')
            .setLabel('Yes bru.')
            .setStyle(ButtonStyle.Success)
        const cancelBtn = new ButtonBuilder()
            .setCustomId('no')
            .setLabel('Nah.')
            .setStyle(ButtonStyle.Danger)

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents([postBtn,cancelBtn])

        await interaction.followUp({content: 'You tryna post ts?',embeds: [embed],components: [row], ephemeral: true})

    }

}