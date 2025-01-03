import {Router} from 'express'
import { fileURLToPath } from 'url'
import path,{ dirname } from 'path'
import {createUser, loginUser, currentUser, logout} from '../controllers/user.controller.js'
import upload from '../middlewares/multer.middleware.js'
import verifyJWT from '../middlewares/auth.middleware.js'

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)



const userRouter = Router()

userRouter.route('/create').post(upload.single("avatar"), createUser)

userRouter.route('/login').post(loginUser)

userRouter.route('/getuser').get(verifyJWT, currentUser)

userRouter.route('/logout').get(logout)

export default userRouter