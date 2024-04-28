"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// node dependencies
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
// discord.js
const discord_js_1 = require("discord.js");
const token = process.env.TOKEN;
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
// SETUP
const commands = new discord_js_1.Collection();
const commandsDir = node_fs_1.default.readdirSync(node_path_1.default.join(__dirname, 'commands'));
commandsDir.forEach(cmd => {
    const commandPath = node_path_1.default.join(__dirname, 'commands', cmd);
    const command = require(commandPath);
    console.log(command.default);
});
client.once(discord_js_1.Events.ClientReady, client => {
    console.log(`${client.user.username} is Online!`);
});
// client.login(token)
