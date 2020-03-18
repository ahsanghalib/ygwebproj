import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import express from 'express'
import cors from 'cors'
import {errorMiddleware} from './Middleware'
import {CareerDto, ContactDto} from './Dto'

admin.initializeApp(functions.config().firebase)
let db = admin.firestore()

const app = express()

app.use(cors({origin: true}))
app.use(errorMiddleware)


app.get("/hello", (req: express.Request, res: express.Response) => {
    res.status(200).json({message: "Hello World"})
})

app.post('/contact', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        let data: ContactDto = req.body

        data = {
            ...data,
            timestamp: new Date().toISOString()
        }

        const contactRef = await db.collection('contact').add(data)
        const contact = await contactRef.get()

        res.status(200).json({id: contact.id})

    } catch (error) {
        next(error)
    }
})

app.post('/career', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        let data: CareerDto = req.body

        data = {
            ...data,
            timestamp: new Date().toISOString()
        }

        const careerRef = await db.collection('career').add(data)
        const career = await careerRef.get()

        res.status(200).json({id: career.id})

    } catch (error) {
        next(error)
    }
})

export const api = functions.https.onRequest(app);
