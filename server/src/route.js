import { Router } from "express"
import scheduleController from "../controllers/scheduleController.js"

const api = Router()

// Endpoints
api.post('/send-schedule', scheduleController.sendSchedule)

export default api