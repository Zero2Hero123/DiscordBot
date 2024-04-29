import dotenv from 'dotenv'
dotenv.config()

// node dependencies
import fs from 'node:fs'
import path from 'node:path'

// discord.js
import { ChatInputCommandInteraction, Client, Collection, Events, GatewayIntentBits, Interaction, SlashCommandBuilder } from 'discord.js'

const token: string = process.env.TOKEN!
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

// TYPES
export type Command = {
    data: SlashCommandBuilder
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>
}

// LOAD COMMANDS
const commands = new Collection<string,Command>()
const commandsDir = fs.readdirSync(path.join(__dirname,'commands'))
commandsDir.forEach(cmd => {
    const commandPath = path.join(__dirname,'commands',cmd)

    const command: Command = require(commandPath).default

    commands.set(command.data.name,command)
})

client.once(Events.ClientReady, client => {
    console.log(`${client.user.username} is Online!`)
})

// command handler
client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    if(!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.command?.name!)
    
    if(!command){
        console.warn(`Command ${interaction.command?.name} does not exist.`)
        return
    }

    try {
        await command.execute(interaction)
    } catch(err){
        console.error(err)
        await interaction.reply('There was an error while executing this command')
    }
})



client.login(token)