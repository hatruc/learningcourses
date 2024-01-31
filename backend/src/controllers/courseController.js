import courseService from '../services/courseService'

// get all courses
const readFunc = async (req, res) => {

    try {

        // console.log('>>> check req.user: ', req.user); // assign from middleware JwtAction.checkUserJwt
        if (!!req.query.page && !!req.query.limit) {

            let page = req.query.page
            let limit = req.query.limit

            let data = await courseService.getCourseWithPagination(+page, +limit)

            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                DT: data.DT, // data
            })

        } else {

            let data = await courseService.getAllCourses()

            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                DT: data.DT, // data
            })
        }

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: 2, // error code
            DT: '', // data
        })
    }

}

// get one course
const getOneCourse = async (req, res) => {

    try {

        let data = await courseService.getOneCourseService(req.params.courseName)

        if (req.params.courseName) {

            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                DT: data.DT, // data
            })

        } else {
            return res.status(200).json({
                EM: `Unknown course courseName !`, // error message
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


const createFunc = async (req, res) => {

    try {
        // validate
        let data = await courseService.createCourse(req.body)

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

const updateFunc = async (req, res) => {

    try {
        // validate

        let data = await courseService.updateCourse(req.body)

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

        let data = await courseService.deleteCourse(req.query.id)

        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data
            LS: data.LS, // all lesson of course deleted
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
    readFunc, // get all course with pagination
    getOneCourse, // course detail page
    updateFunc,
    deleteFunc,
}