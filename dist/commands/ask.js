"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('ask')
        .setDescription('Ask yo friends for some help')
        .addStringOption(options => options.setName('title').setDescription('Title of your inquiry').setRequired(true))
        .addStringOption(option => option.setName('inquiry').setDescription('Description of your inquiry').setRequired(true))
        .addRoleOption(option => option.setName('category').setDescription('Which Subject/Class is this inquiry for?').setRequired(true))
        .addAttachmentOption(option => option.setName('file_attachment').setDescription('File(s) to attach to this inquiry')),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply({ ephemeral: true });
            const title = interaction.options.getString('title', true);
            const inquiry = interaction.options.getString('inquiry');
            const category = interaction.options.getRole('category');
            const file = interaction.options.getAttachment('file_attachment');
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle(title)
                .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() })
                .setDescription(inquiry)
                .setTimestamp(new Date());
            const postBtn = new discord_js_1.ButtonBuilder()
                .setCustomId('yes')
                .setLabel('Yes bru.')
                .setStyle(discord_js_1.ButtonStyle.Success);
            const cancelBtn = new discord_js_1.ButtonBuilder()
                .setCustomId('no')
                .setLabel('Nah.')
                .setStyle(discord_js_1.ButtonStyle.Danger);
            const row = new discord_js_1.ActionRowBuilder().addComponents([postBtn, cancelBtn]);
            yield interaction.followUp({ content: 'You tryna post ts?', embeds: [embed], components: [row], ephemeral: true });
        });
    }
};
