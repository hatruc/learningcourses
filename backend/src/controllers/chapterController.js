import chapterService from '../services/chapterService'

// get all lesson of course
const readFunc = async (req, res) => {

    try {

        if (req.params.courseId) {

            let courseId = req.params.courseId

            let data = await chapterService.getAllChapterOfCourse(courseId)

            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                DT: data.DT, // data
            })

        } else {

            return res.status(200).json({
                EM: `get chapter fail !`, // error message
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
        let data = await chapterService.createChapter(req.body)

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

        let data = await chapterService.updateChapter(req.body)

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

        let data = await chapterService.deleteChapter(req.query.id)

        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data
            LS: data.LS
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
    createFunc,
    readFunc,
    updateFunc,
    deleteFunc,
}

