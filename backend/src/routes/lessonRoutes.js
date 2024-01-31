import express from 'express'
import lessonController from '../controllers/lessonController'
import { authAdminMiddleWare, authLoginMiddleware } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/create-lesson', authAdminMiddleWare, lessonController.createFunc) // admin
router.get('/all-lesson/:courseId', lessonController.readFunc) // get all lesson of course
router.get('/all-lesson/:courseId/:chapterNumber', lessonController.getAllLessonOfChapter) // get all lesson of chapter
router.get('/lesson-detail/:id', authLoginMiddleware, lessonController.getOneLesson) // get one lesson
router.put('/update-lesson', authAdminMiddleWare, lessonController.updateFunc) // admin
router.delete('/delete-lesson', authAdminMiddleWare, lessonController.deleteFunc) // admin

export default router