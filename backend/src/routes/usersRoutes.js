import express from 'express'
import usersController from '../controllers/usersController'
import { authAdminMiddleWare, authAdminUserMiddleWare } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/register', usersController.register)
router.post('/login', usersController.login)
router.get('/user-detail/:id', authAdminUserMiddleWare, usersController.getUserDetail)
router.post('/create-user', authAdminMiddleWare, usersController.createFunc) // admin
router.get('/read', usersController.readFunc) // admin get all user
router.put('/update-user/:id', authAdminUserMiddleWare, usersController.updateFunc) // admin
router.delete('/delete-user', authAdminMiddleWare, usersController.deleteFunc) // admin

export default router