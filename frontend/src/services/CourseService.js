
import axios from '../setup/axios'

// fake data
export const coursesContent =
    [
        {
            title: 'HTML-CSS',
            content: [
                {
                    title: 'Giới Thiệu Khóa 1',
                    lessons: [
                        {
                            id: '100',
                            title: 'lesson 1',
                            completed: true
                        },

                        {
                            id: '2',
                            title: 'lesson 2',
                            completed: true
                        },

                        {
                            id: '3',
                            title: 'lesson 3',
                            completed: true
                        },

                        {
                            id: '4',
                            title: 'lesson 4',
                            completed: true
                        },

                    ]
                },
                {
                    title: 'Chương 1',
                    lessons: [
                        {
                            id: '5',
                            title: 'lesson 1',
                            completed: true
                        },

                        {
                            id: '6',
                            title: 'lesson 2',
                            completed: true
                        },

                        {
                            id: '7',
                            title: 'lesson 3',
                            completed: true
                        },

                        {
                            id: '8',
                            title: 'lesson 4',
                            completed: true
                        },

                    ]
                }
            ]
        },
        {
            title: 'Javascript',
            content: [
                {
                    title: 'Giới Thiệu Khóa 2',
                    lessons: [
                        {
                            id: '100',
                            title: 'lesson 1',
                            completed: true
                        },

                        {
                            id: '2',
                            title: 'lesson 2',
                            completed: true
                        },

                        {
                            id: '3',
                            title: 'lesson 3',
                            completed: true
                        },

                        {
                            id: '4',
                            title: 'lesson 4',
                            completed: true
                        },

                    ]
                },
                {
                    title: 'Chương 1',
                    lessons: [
                        {
                            id: '5',
                            title: 'lesson 1',
                            completed: true
                        },

                        {
                            id: '6',
                            title: 'lesson 2',
                            completed: true
                        },

                        {
                            id: '7',
                            title: 'lesson 3',
                            completed: true
                        },

                        {
                            id: '8',
                            title: 'lesson 4',
                            completed: true
                        },

                    ]
                }
            ]
        },
    ]
export const getCoursesContent = (title) => {
    const course = coursesContent.filter(item => item.title === title)
    return course[0].content
}

export const getCourses = () => {
    return coursesContent
}

export const getAllCoursesApi = async (page, limit) => {
    if (page && limit) {
        return await axios.get(`http://localhost:8080/api/v1/course/all-course?page=${page}&limit=${limit}`)
    } else {
        return await axios.get(`http://localhost:8080/api/v1/course/all-course`)
    }
}

export const getOneCourseApi = async (courseName) => {
    return await axios.get(`http://localhost:8080/api/v1/course/course-detail/${courseName}`)
}

export const getAllChapterOfCourseApi = async (courseId) => {
    return await axios.get(`http://localhost:8080/api/v1/chapter/all-chapter/${courseId}`)
}

export const getAllLessonOfCourseApi = async (courseId) => {
    return await axios.get(`http://localhost:8080/api/v1/lesson/all-lesson/${courseId}`)
}

export const createCourseApi = async (access_token, courseData) => {
    const res = await axios.post(`http://localhost:8080/api/v1/course/create-course`,
        { ...courseData },
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    )
    return res
}

export const updateCourseApi = async (access_token, courseData) => {
    const res = await axios.put(`http://localhost:8080/api/v1/course/update-course`,
        { ...courseData },
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    )
    return res
}

export const deleteCourse = async (access_token, id) => {
    const response = await axios.delete(`http://localhost:8080/api/v1/course/delete-course?id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        },
    )
    return response
}

