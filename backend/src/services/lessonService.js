import db from "../models";

const checkLessonNameExist = async (lessonNameInput, courseId, chapterNumber) => {

    let lesson = await db.Lesson.findOne({
        where: {
            lessonName: lessonNameInput,
            courseId: courseId,
            chapterNumber: chapterNumber,
        }
    })

    if (lesson) {
        return true
    }

    return false

}

const checkLessonNumberExist = async (lessonNumberInput, courseId, chapterNumber) => {

    let lesson = await db.Lesson.findOne({
        where: {
            courseId: courseId,
            chapterNumber: chapterNumber,
            lessonNumber: lessonNumberInput
        }
    })

    if (lesson) {
        return true
    }

    return false
}

const getOneLesson = async (id) => {

    try {

        let lesson = await db.Lesson.findOne({
            where: { id: id },
            attributes: ["id", "chapterNumber", "courseId", "lessonName", "video", "videoDuration"],
            // include: { model: db.Group, attributes: ['name', 'description'] },
        })
        if (lesson) {
            return {
                EM: 'get lesson success, exist lesson !',
                EC: 0,
                DT: lesson
            }
        } else {
            return {
                EM: 'get course fail !',
                EC: 1,
                DT: []
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'somethings wrong!',
            EC: 2,
            DT: []
        }
    }

}

const getAllLessonOfCourse = async (courseId) => {

    try {

        let lesson = await db.Lesson.findAll({
            where: { courseId: courseId },
            attributes: ["id", "chapterNumber", "courseId", "lessonNumber", "lessonName", "video", "videoDuration"],
        })
        if (lesson) {
            // const lessonArr = lesson.map((item) => item.toJSON())
            // console.log(lessonArr);
            return {
                EM: 'get data success, exist lesson !!!!!!!!!',
                EC: 0,
                DT: lesson
            }
        } else {
            return {
                EM: 'get data fail !',
                EC: 1,
                DT: lesson
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'somethings wrong!',
            EC: 2,
            DT: []
        }
    }

}

// get all lesson of chapter
const getAllLessonOfChapter = async (courseId, chapterNumber) => {

    try {

        let lesson = await db.Lesson.findAll({
            where: {
                courseId: courseId,
                chapterNumber: chapterNumber
            },
            attributes: ["id", "chapterNumber", "lessonNumber", "courseId", "lessonName", "video", "videoDuration"],
            order: [['lessonNumber', 'asc']]
            // include: { model: db.Group, attributes: ['name', 'description'] },
        })
        if (lesson) {
            return {
                EM: 'get data success, exist lesson !',
                EC: 0,
                DT: lesson
            }
        } else {
            return {
                EM: 'get data fail !',
                EC: 1,
                DT: []
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'somethings wrong!',
            EC: 2,
            DT: []
        }
    }

}

const createLesson = async (newLesson) => {

    try {

        // check lesson name exist
        let isLessonNameExist = await checkLessonNameExist(newLesson.lessonName, newLesson.courseId, newLesson.chapterNumber)
        if (isLessonNameExist === true) {
            return {
                EM: 'Lesson name is already exist !',
                EC: 1,
            }
        }

        // check lesson number exist
        let isLessonNumberExist = await checkLessonNumberExist(newLesson.lessonNumber, newLesson.courseId, newLesson.chapterNumber)
        if (isLessonNumberExist === true) {
            return {
                EM: 'Lesson number is already exist !',
                EC: 1,
            }
        }

        const course = await db.Course.findOne({
            where: { id: newLesson.courseId },
        })

        await course.update({
            ...course,
            totalLesson: course.totalLesson + 1,
        })

        const chapter = await db.Chapter.findOne({
            where: {
                chapterNumber: newLesson.chapterNumber,
                courseId: newLesson.courseId
            }
        })

        await chapter.update({
            ...chapter,
            totalLesson: chapter.totalLesson + 1,
        })

        // create new course
        const lessonData = await db.Lesson.create({
            chapterNumber: newLesson.chapterNumber,
            courseId: newLesson.courseId,
            chapterId: chapter.id,
            lessonNumber: newLesson.lessonNumber,
            lessonName: newLesson.lessonName,
            video: newLesson.video,
            // videoDuration: newLesson.videoDuration,
        })

        return {
            EM: 'A new Lesson is created successfully !',
            EC: 0,
            DT: lessonData
        }
    }
    catch (e) {
        console.log(e);
        return {
            EM: 'somethings wrong in courseService.createCourse...',
            EC: 2
        }
    }

}

const updateLesson = async (lessonUpdate) => {

    try {

        let lesson = await db.Lesson.findOne({
            where: { id: lessonUpdate.id }
        })

        // check chapter name exist
        if (lessonUpdate.lessonName !== lesson.lessonName) {
            let isLessonNameExist = await checkLessonNameExist(lessonUpdate.lessonName, lessonUpdate.courseId, lessonUpdate.chapterNumber)
            if (isLessonNameExist === true) {
                return {
                    EM: 'lesson name is already exist !',
                    EC: 1,
                }
            }
        }

        // check chapter number exist
        if (+lessonUpdate.lessonNumber !== lesson.lessonNumber) {
            let isLessonNumberExist = await checkLessonNumberExist(lessonUpdate.lessonNumber, lessonUpdate.courseId, lessonUpdate.chapterNumber)
            if (isLessonNumberExist === true) {
                return {
                    EM: 'lesson number is already exist !',
                    EC: 1,
                }
            }
        }

        if (lesson) {

            // update
            await lesson.update({
                // chapterNumber: lessonUpdate.chapterNumber,
                // courseId: lessonUpdate.courseId,
                // chapterId: lessonUpdate.chapterId,
                lessonNumber: lessonUpdate.lessonNumber,
                lessonName: lessonUpdate.lessonName,
                video: lessonUpdate.video,
            })

            return {
                EM: 'Update lesson successfully!', // error message
                EC: 0, // error code
                DT: lesson, // course before update
            }

        } else {
            // not found
            return {
                EM: 'Lesson not found !', // error message
                EC: 1, // error code
                DT: '', // data
            }

        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'Somethings wrong with server', // error message
            EC: 2, // error code
            DT: [], // data
        }
    }
}

const deleteLesson = async (id) => {

    try {

        let lesson = await db.Lesson.findOne(({
            where: { id: id }
        }))

        if (lesson) {

            await lesson.destroy()

            const course = await db.Course.findOne({
                where: { id: lesson.courseId }
            })

            await course.update({
                ...course,
                totalLesson: course.totalLesson - 1,
            })

            const chapter = await db.Chapter.findOne({
                where: { id: lesson.chapterId, courseId: lesson.courseId }
            })

            await chapter.update({
                ...chapter,
                totalLesson: chapter.totalLesson - 1,
            })

            return {
                EM: 'Delete lesson succeed!',
                EC: 0,
                DT: lesson // lesson deleted
            }

        } else {
            return {
                EM: 'lesson not exist!',
                EC: 1,
                DT: []
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'Somethings wrong !',
            EC: 2,
            DT: []
        }
    }
}

module.exports = {
    getOneLesson,
    getAllLessonOfCourse,
    getAllLessonOfChapter,
    createLesson,
    updateLesson,
    deleteLesson,
}