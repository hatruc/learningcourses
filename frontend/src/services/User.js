import axios from "axios"

export let User = {
    id: '1',
    fullName: '',
    userName: '',
    age: '',
    phone: '',
    email: '',
    address: ''
}

const axiosJwt = axios.create()

export const registerApi = async (data) => {
    const res = await axios.post(
        `http://localhost:8080/api/v1/user/register`,
        data
    );
    return res.data;
};

export const loginApi = async (data) => {
    const res = await axios.post(
        `http://localhost:8080/api/v1/user/login`,
        data
    );
    return res.data;
};

export const getDetailUserApi = async (id, access_token) => {
    const res = await axios.get(
        `http://localhost:8080/api/v1/user/user-detail/${id}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllCourseWithPagination = async (page, limit, access_token) => {
    const res = await axios.get(`http://localhost:8080/api/v1/user/read?page=${page}&limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    )
    return res.data
}

export const getAllUserApi = async (access_token) => {

    const res = await axios.get(`http://localhost:8080/api/v1/user/read`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    )
    return res.data
}

export const createUserApi = async (access_token, userData) => {
    const res = await axios.post(`http://localhost:8080/api/v1/user/create-user`,
        { ...userData },
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    )
    return res.data
}

export const updateUserApi = async (access_token, userData) => {
    const res = await axios.put(`http://localhost:8080/api/v1/user/update-user/${userData.id}`,
        { ...userData },
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    )
    return res.data
}

export const deleteUser = async (access_token, id) => {
    const response = await axios.delete(`http://localhost:8080/api/v1/user/delete-user?id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        },
    )
    return response.data
}










