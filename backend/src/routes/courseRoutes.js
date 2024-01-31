import express from 'express'
import courseController from '../controllers/courseController'
import { authAdminMiddleWare, authLoginMiddleware } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/create-course', authAdminMiddleWare, courseController.createFunc) //admin
router.get('/all-course', courseController.readFunc) // get all course
router.get('/course-detail/:courseName', courseController.getOneCourse) // get one course, only user login and admin
router.put('/update-course', authAdminMiddleWare, courseController.updateFunc) // admin
router.delete('/delete-course', authAdminMiddleWare, courseController.deleteFunc) // admin

export default router