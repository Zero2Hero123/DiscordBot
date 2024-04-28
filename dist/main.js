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
// LOAD COMMANDS
const commands = new discord_js_1.Collection();
const commandsDir = node_fs_1.default.readdirSync(node_path_1.default.join(__dirname, 'commands'));
commandsDir.forEach(cmd => {
    const commandPath = node_path_1.default.join(__dirname, 'commands', cmd);
    const command = require(commandPath).default;
    commands.set(command.data.name, command);
});
client.once(discord_js_1.Events.ClientReady, client => {
    console.log(`${client.user.username} is Online!`);
});
// command handler
client.on(discord_js_1.Events.InteractionCreate, (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!interaction.isChatInputCommand())
        return;
    const command = commands.get((_a = interaction.command) === null || _a === void 0 ? void 0 : _a.name);
    if (!command) {
        console.warn(`Command ${(_b = interaction.command) === null || _b === void 0 ? void 0 : _b.name} does not exist.`);
        return;
    }
    try {
        yield command.execute(interaction);
    }
    catch (err) {
        console.error(err);
        yield interaction.reply('There was an error while executing this command');
    }
}));
client.login(token);
