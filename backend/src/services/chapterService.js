import db from "../models";
import { Op } from "sequelize";

const checkChapterNameExist = async (chapterNameInput, courseId) => {

    let chapter = await db.Chapter.findOne({
        where: { chapterName: chapterNameInput, courseId: courseId }
    })

    if (chapter) {
        return true
    }

    return false

}

const checkChapterNumberExist = async (chapterNumberInput, courseId) => {

    let chapter = await db.Chapter.findOne({
        where: {
            chapterNumber: chapterNumberInput,
            courseId: courseId
        }
    })

    if (chapter) {
        return true
    }

    return false
}

const getAllChapterOfCourse = async (courseId) => {

    try {

        let chapter = await db.Chapter.findAll({
            where: { courseId: courseId },
            attributes: ["id", "courseId", "chapterName", "chapterNumber", "totalLesson"],
            order: [['chapterNumber', 'asc']]
            // include: { model: db.Group, attributes: ['name', 'description'] },
        })
        if (chapter) {
            return {
                EM: 'get data success, exist chapter !',
                EC: 0,
                DT: chapter
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

const createChapter = async (newChapter) => {

    try {

        // check chapter name exist
        let isChapterNameExist = await checkChapterNameExist(newChapter.chapterName, newChapter.courseId)
        if (isChapterNameExist === true) {
            return {
                EM: 'chapter name is already exist !',
                EC: 1,
            }
        }

        // check chapter number exist
        let isChapterNumberExist = await checkChapterNumberExist(newChapter.chapterNumber, newChapter.courseId)
        if (isChapterNumberExist === true) {
            return {
                EM: 'chapter number is already exist !',
                EC: 1,
            }
        }

        // create new chapter
        const chapterData = await db.Chapter.create({
            courseId: newChapter.courseId,
            chapterName: newChapter.chapterName,
            chapterNumber: newChapter.chapterNumber,
            totalLesson: 0,
        })

        return {
            EM: 'A new Chapter is created successfully !',
            EC: 0,
            DT: chapterData
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

const updateChapter = async (chapterUpdate) => {

    try {

        let chapter = await db.Chapter.findOne({
            where: { id: chapterUpdate.id }
        })

        // check chapter name exist
        if (chapterUpdate.chapterName !== chapter.chapterName) {
            let isChapterNameExist = await checkChapterNameExist(chapterUpdate.chapterName, chapterUpdate.courseId)
            if (isChapterNameExist === true) {
                return {
                    EM: 'chapter name is already exist !',
                    EC: 1,
                }
            }
        }

        // check chapter number exist
        if (+chapterUpdate.chapterNumber !== chapter.chapterNumber) {
            let isChapterNumberExist = await checkChapterNumberExist(chapterUpdate.chapterNumber, chapterUpdate.courseId)
            if (isChapterNumberExist === true) {
                return {
                    EM: 'chapter number is already exist !',
                    EC: 1,
                }
            }
        }

        if (chapter) {

            await chapter.update({
                // courseId: chapterUpdate.courseId,
                chapterName: chapterUpdate.chapterName,
                chapterNumber: chapterUpdate.chapterNumber,
                // totalLesson: chapterUpdate.totalLesson,
            })

            return {
                EM: 'Update chapter successfully!', // error message
                EC: 0, // error code
                DT: chapter, // chapter before update
            }

        } else {
            // not found
            return {
                EM: 'Chapter not found', // error message
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

const deleteChapter = async (id) => {

    try {

        let chapter = await db.Chapter.findOne(({
            where: { id: id }
        }))

        if (chapter) {

            let lesson = await db.Lesson.findAll({
                where: {
                    courseId: chapter.courseId,
                    chapterNumber: chapter.chapterNumber
                }
            })

            let course = await db.Course.findOne({
                where: {
                    id: chapter.courseId
                }
            })

            await chapter.destroy()

            await db.Lesson.destroy({
                where: {
                    chapterNumber: chapter.chapterNumber
                }
            })

            await course.update({
                ...course,
                totalLesson: course.totalLesson - lesson.length
            })

            return {
                EM: 'Delete chapter succeed!',
                EC: 0,
                DT: chapter, // chapter deleted
                LS: lesson
            }

        } else {
            return {
                EM: 'chapter not exist!',
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
    getAllChapterOfCourse,
    createChapter,
    updateChapter,
    deleteChapter,
}