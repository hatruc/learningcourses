import userRoutes from './usersRoutes'
import courseRoutes from './courseRoutes'
import chapterRoutes from './chapterRoutes'
import lessonRoutes from './lessonRoutes'

const initAPIRoutes = (app) => {

    app.use('/api/v1/user', userRoutes)
    app.use('/api/v1/course', courseRoutes)
    app.use('/api/v1/chapter', chapterRoutes)
    app.use('/api/v1/lesson', lessonRoutes)

}

export default initAPIRoutes