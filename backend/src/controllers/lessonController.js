import lessonService from '../services/lessonService'

// get one lesson
const getOneLesson = async (req, res) => {

    try {

        let data = await lessonService.getOneLesson(req.params.id)

        if (req.params.id) {

            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                DT: data.DT, // data
            })

        } else {
            return res.status(200).json({
                EM: `Unknown lesson id !`, // error message
                EC: 1, // error code
                DT: '', // data
            })
        }
    }

    catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: 2, // error code
            DT: '', // data
        })
    }

}

// get all lesson of course
const readFunc = async (req, res) => {

    try {

        if (req.params.courseId) {

            let courseId = req.params.courseId

            let data = await lessonService.getAllLessonOfCourse(courseId)

            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                DT: data.DT, // data
            })

        } else {

            return res.status(200).json({
                EM: `get lesson fail !`, // error message
                EC: 1, // error code
                DT: [], // data
            })
        }

    } catch (error) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: 2, // error code
            DT: '', // data
        })
    }

}

const getAllLessonOfChapter = async (req, res) => {

    try {

        if (req.params.courseId && req.params.chapterNumber) {

            let courseId = req.params.courseId
            let chapterNumber = req.params.chapterNumber

            let data = await lessonService.getAllLessonOfChapter(courseId, chapterNumber)

            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                DT: data.DT, // data
            })

        } else {

            return res.status(200).json({
                EM: `get lesson fail !`, // error message
                EC: 2, // error code
                DT: [], // data
            })
        }

    } catch (error) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: 2, // error code
            DT: '', // data
        })
    }

}

const createFunc = async (req, res) => {

    try {
        // validate
        let data = await lessonService.createLesson(req.body)

        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT // data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: `error from server`, // error message
            EC: 2, // error code
            DT: '', // data
        })
    }

}

const updateFunc = async (req, res) => {

    try {
        // validate

        let data = await lessonService.updateLesson(req.body)

        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: `error from server`, // error message
            EC: 2, // error code
            DT: '', // data
        })
    }

}

const deleteFunc = async (req, res) => {

    try {

        let data = await lessonService.deleteLesson(req.query.id)

        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: `error from server`, // error message
            EC: 2, // error code
            DT: '', // data
        })

    }

}

module.exports = {
    getOneLesson,
    readFunc,
    getAllLessonOfChapter,
    createFunc,
    updateFunc,
    deleteFunc,
}
