import db from "../models";

const checkCourseNameExist = async (courseNameInput) => {

    let course = await db.Course.findOne({
        where: { courseName: courseNameInput }
    })

    if (course) {
        return true
    }

    return false

}

const getAllCourses = async () => {

    try {

        let course = await db.Course.findAll({
            attributes: ["id", "adminId", "courseName", "description", "contentText", "level", "totalLesson", "imgCourse"],
            // include: { model: db.Group, attributes: ['name', 'description'] },
        })
        if (course) {
            return {
                EM: 'get data success, exist course !',
                EC: 0,
                DT: course
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

const getOneCourseService = async (courseName) => {

    try {

        let course = await db.Course.findOne({
            where: { courseName: courseName },
            attributes: ["id", "adminId", "courseName", "description", "contentText", "level", "totalLesson", "imgCourse"],
            // include: { model: db.Group, attributes: ['name', 'description'] },
        })
        if (course) {
            return {
                EM: 'get course success, exist course !',
                EC: 0,
                DT: course
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

const getCourseWithPagination = async (page, limit) => {

    try {

        let offset = (page - 1) * limit

        let { count, rows } = await db.Course.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "adminId", "courseName", "description", "contentText", "level", "totalLesson", "imgCourse"],
            // include: { model: db.Group, attributes: ['name', 'description', 'id'] },
            order: [['id', 'asc']]
        })

        let totalPages = Math.ceil(count / limit)
        let data = {
            totalRows: count,
            totalPages: totalPages,
            courses: rows
        }

        // console.log('>>> check data: ', data);

        return {
            EM: 'get courses pagination successfully !',
            EC: 0,
            DT: data
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

const createCourse = async (newCourse) => {

    try {

        // check course name exist
        let isCourseNameExist = await checkCourseNameExist(newCourse.courseName)
        if (isCourseNameExist === true) {
            return {
                EM: 'Course name is already exist !',
                EC: 1,
            }
        }

        // create new course
        const courseData = await db.Course.create({
            adminId: newCourse.adminId,
            courseName: newCourse.courseName,
            description: newCourse.description,
            contentText: newCourse.contentText,
            level: newCourse.level,
            totalLesson: 0,
            imgCourse: newCourse.imgCourse
        })

        return {
            EM: 'A new Course is created successfully !',
            EC: 0,
            DT: courseData
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

const updateCourse = async (courseUpdate) => {

    try {

        // check course name exist
        // let isCourseNameExist = await checkCourseNameExist(courseUpdate.courseName)
        // if (isCourseNameExist === true) {
        //     return {
        //         EM: 'Course name is already exist !',
        //         EC: 1,
        //     }
        // }

        let course = await db.Course.findOne({
            where: { id: courseUpdate.id }
        })

        if (course) {

            // update
            await course.update({
                // adminId: courseUpdate.adminId,
                courseName: courseUpdate.courseName,
                description: courseUpdate.description,
                contentText: courseUpdate.contentText,
                level: courseUpdate.level,
                // totalLesson: courseUpdate.totalLesson,
                imgCourse: courseUpdate.imgCourse
            })

            return {
                EM: 'Update course successfully!', // error message
                EC: 0, // error code
                DT: course, // course before update
            }

        } else {
            // not found
            return {
                EM: 'Course not found', // error message
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

const deleteCourse = async (id) => {

    try {

        let course = await db.Course.findOne(({
            where: { id: id }
        }))

        let chapter = await db.Chapter.destroy({
            where: {
                courseId: course.id
            }
        })

        let lesson = await db.Lesson.findAll({
            where: {
                courseId: course.id
            }
        })

        if (course) {

            await course.destroy()

            await db.Chapter.destroy({
                where: {
                    courseId: course.id
                }
            })

            await db.Lesson.destroy({
                where: {
                    courseId: course.id
                }
            })

            return {
                EM: 'Delete course succeed!',
                EC: 0,
                DT: course, // course deleted
                LS: lesson, // all lesson of course deleted
            }

        } else {
            return {
                EM: 'course not exist!',
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
    createCourse,
    getAllCourses,
    getCourseWithPagination,
    getOneCourseService,
    updateCourse,
    deleteCourse,
}