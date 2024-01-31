import express from 'express'
import chapterController from '../controllers/chapterController'
import { authAdminMiddleWare, authLoginMiddleware } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/create-chapter', authAdminMiddleWare, chapterController.createFunc) //admin
router.get('/all-chapter/:courseId', chapterController.readFunc) // get all chapter of course
router.put('/update-chapter', authAdminMiddleWare, chapterController.updateFunc) //admin
router.delete('/delete-chapter', authAdminMiddleWare, chapterController.deleteFunc) // admin 

export default router