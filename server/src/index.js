import api from "./route.js"

import { fileURLToPath } from 'url'
import path from "path"
import express from "express"
import cors from "cors"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const port = 3009

app.use(express.json())
app.use(cors())
app.use(api)

app.listen(port, () => {
    console.log(`🌿 Web Service Online`)
})