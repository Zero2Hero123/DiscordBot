import { Client } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const token: string = process.env.TOKEN!

const client = new Client({ intents: [] })

client.once('ready', client => {
    console.log(`${client.user.username} is Online!`)
})


client.login(token)