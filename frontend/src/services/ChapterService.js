import axios from '../setup/axios'

export const getAllChapterApi = async (courseId) => {
    let response = await axios.get(`http://localhost:8080/api/v1/chapter/all-chapter/${courseId}`)
    return response
}

export const createChapterApi = async (access_token, chapterData) => {
    const response = await axios.post(`http://localhost:8080/api/v1/chapter/create-chapter`,
        { ...chapterData },
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    )
    return response
}

export const updateChapterApi = async (access_token, chapterData) => {
    const response = await axios.put(`http://localhost:8080/api/v1/chapter/update-chapter`,
        { ...chapterData },
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    )
    return response
}

export const deleteChapter = async (access_token, id) => {
    const response = await axios.delete(`http://localhost:8080/api/v1/chapter/delete-chapter?id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        },
    )
    return response
}