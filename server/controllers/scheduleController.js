import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import pkg from 'whatsapp-web.js'
const { Client, LocalAuth } = pkg

import qrcode from 'qrcode-terminal'
import idGenerator from "../utils/idGenerator.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '..', 'db', 'schedules.json')

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
})

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
    console.log('🍃 Whatsapp Client Ready')
})

client.initialize()

// DB "Connection"
let schedules = []
const schedulesData = fs.readFileSync(dbPath, 'utf-8')
schedules = schedulesData ? JSON.parse(schedulesData) : []


// send schedule
function sendSchedule(req, res) {
    try {
        const { name, whatsapp, intentDate, intentHour, service } = req.body

        const message = `
            **Novo Agendamento Dany** 🌸! \n
            Nome: ${name},
            Intenção de Data: ${intentDate},
            Intenção de Horário: ${intentHour},
            Serviço: ${service},
            Whatsapp: ${whatsapp}
        `

        const storedMessage = {
            id: idGenerator.generateUniqueId(schedules),
            customerName: name,
            whatsapp: whatsapp,
            intentDate: intentDate,
            intentHour: intentHour,
            serviceRequested: service
        }

        schedules.push(storedMessage)

        const targetNumber = '5511949098312@c.us'

        client.sendMessage(targetNumber, message)
        .then(response => {
            console.log('Intenção de agendamento feita com sucesso 🟢')
            res.status(200).json({
                message: 'Intenção de agendamento feita com sucesso 🟢',
                data: storedMessage
            })
        }).catch(err => {
            console.error('Erro ao enviar mensagem:', err)
            res.status(500).send('Erro ao enviar confirmação.')
        })

        fs.writeFileSync(dbPath, JSON.stringify(schedules, null, 2))

    } catch (error) {
        res.status(200).json({
            message: 'Erro ao tentar criar novo agendamento ☹️'
        })
    }
}

//all schedules [future feature]

export default {
    sendSchedule
}
