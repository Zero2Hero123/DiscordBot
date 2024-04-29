import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from "discord.js";

import fs from 'node:fs'
import path from 'node:path'
import { config } from "dotenv";
config()

import { Command } from "./main";

const clientId = '1234152041706684428'
const token = process.env.TOKEN!

const commandsAsJson: RESTPostAPIChatInputApplicationCommandsJSONBody[] = []

const commands = fs.readdirSync(path.join(__dirname,'commands'))
commands.forEach(cmd => {
    const commandPath = path.join(__dirname,'commands',cmd)

    const command: Command = require(commandPath).default

    commandsAsJson.push(command.data.toJSON())
})

const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data: any = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commandsAsJson },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();