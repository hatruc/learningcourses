import axios from '../setup/axios'

export const getOneLessonApi = async (access_token, id) => {
    const response = await axios.get(`http://localhost:8080/api/v1/lesson/lesson-detail/${id}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    )
    return response
}

export const getAllLessonOfChapterApi = async (courseId, chapterNumber) => {
    return await axios.get(`http://localhost:8080/api/v1/lesson/all-lesson/${courseId}/${chapterNumber}`)
}

export const createLessonApi = async (access_token, lessonData) => {
    const response = await axios.post(`http://localhost:8080/api/v1/lesson/create-lesson`,
        { ...lessonData },
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    )
    return response
}

export const updateLessonApi = async (access_token, lessonData) => {
    const response = await axios.put(`http://localhost:8080/api/v1/lesson/update-lesson`,
        { ...lessonData },
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    )
    return response
}

export const deletelessonApi = async (access_token, id) => {
    const response = await axios.delete(`http://localhost:8080/api/v1/lesson/delete-lesson?id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        },
    )
    return response
}