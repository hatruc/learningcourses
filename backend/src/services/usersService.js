
import db from '../models/index'
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from './jwtService'

const salt = bcrypt.genSaltSync(10)

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt)
    return hashPassword
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword) // true or false
}

const checkEmailExist = async (userEmail) => {

    let user = await db.User.findOne({
        where: { email: userEmail }
    })

    if (user) {
        return true
    }

    return false
}

const checkPhoneExist = async (userPhone) => {

    let user = await db.User.findOne({
        where: { phone: userPhone }
    })

    if (user) {
        return true
    }

    return false
}

const createUser = async (newUser) => {

    try {

        // check email/phone exist
        let isEmailExist = await checkEmailExist(newUser.email)
        if (isEmailExist === true) {
            return {
                EM: 'Email is already exist',
                EC: 1,
            }
        }

        let isPhoneExist = await checkPhoneExist(newUser.phone)
        if (isPhoneExist === true) {
            return {
                EM: 'Phone number is already exist',
                EC: 1,
            }
        }

        // hash user password
        let hashPassword = hashUserPassword(newUser.password)

        // create new user
        const userData = await db.User.create({
            username: newUser.username,
            password: hashPassword,
            fullname: newUser.fullname,
            email: newUser.email,
            phone: newUser.phone,
            address: newUser.address,
            role: 'customer',
            avatar: newUser.avatar
        })

        return {
            EM: 'A user is created successfully!',
            EC: 0,
            DT: userData
        }
    }
    catch (e) {
        console.log(e);
        return {
            EM: 'somethings wrong in usersService.createUser...',
            EC: 2
        }
    }

}

const createUserAdmin = async (newUser) => {

    try {

        // check email/phone exist

        console.log('>>> user service ');
        let isEmailExist = await checkEmailExist(newUser.email)
        if (isEmailExist === true) {
            return {
                EM: 'Email is already exist',
                EC: 1,
            }
        }

        let isPhoneExist = await checkPhoneExist(newUser.phone)
        if (isPhoneExist === true) {
            return {
                EM: 'Phone number is already exist',
                EC: 1,
            }
        }

        // hash user password
        let hashPassword = hashUserPassword(newUser.password)

        // create new user
        const userData = await db.User.create({
            username: newUser.username,
            password: hashPassword,
            fullname: newUser.fullname,
            email: newUser.email,
            phone: newUser.phone,
            address: newUser.address,
            role: newUser.role,
            avatar: newUser.avatar
        })

        return {
            EM: 'A user is created successfully!',
            EC: 0,
            DT: userData
        }
    }
    catch (e) {
        console.log(e);
        return {
            EM: 'somethings wrong in usersService.createUser...',
            EC: 2
        }
    }

}

const login = async (userLogin) => {

    try {

        let user = await db.User.findOne({
            where: { username: userLogin.username }
        })

        if (user) {

            const isCheckPassword = checkPassword(userLogin.password, user.password)
            if (isCheckPassword) {

                const access_token = await generateAccessToken({
                    id: user.id,
                    role: user.role,
                    username: user.username,
                    email: user.email,
                    fullname: user.fullname,
                    address: user.address,
                    phone: user.phone,
                    avatar: user.avatar,
                });

                const refresh_token = await generateRefreshToken({
                    id: user.id,
                    role: user.role,
                });

                return {
                    EM: 'Login successfully!',
                    EC: 0,
                    DT: {
                        access_token,
                        refresh_token,
                    }
                }
            }

        }

        return {
            EM: 'Input is not incorrect!',
            EC: 1,
        }

    } catch (error) {

        console.log(error);

        return {
            EM: 'somethings wrong in usersService.login...',
            EC: 2
        }
    }

}

const getAllUser = async () => {

    try {

        let users = await db.User.findAll({
            attributes: ["id", "username", "fullname", "email", "phone", "address", "role", "avatar"],
            // include: { model: db.User, attributes: ["id", "username", "fullname", "email", "phone", "address", "role", "avatar"] },
        })
        if (users) {
            return {
                EM: 'get data success, exist users!',
                EC: 0,
                DT: users
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

const getUserWithPagination = async (page, limit) => {

    try {

        let offset = (page - 1) * limit

        let { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "username", "fullname", "email", "phone", "address", "role", "avatar"],
            // include: { model: db.User, attributes: ["id", "username", "fullname", "email", "phone", "address", "role", "avatar"] },
            order: [['id', 'asc']]
        })

        let totalPages = Math.ceil(count / limit)
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }

        // console.log('>>> check data: ', data);

        return {
            EM: 'get users pagination successfully !',
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

const getUserDetailService = async (id) => {

    try {

        let user = await db.User.findOne({
            where: { id: id },
            attributes: ["id", "username", "fullname", "email", "phone", "address", "avatar"],
            // include: { model: db.Group, attributes: ['name', 'description'] },
        })
        if (user) {
            return {
                EM: 'get user success, exist user !',
                EC: 0,
                DT: user
            }
        } else {
            return {
                EM: 'get user fail !',
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

const updateUser = async (data) => {

    console.log(data);

    try {


        let user = await db.User.findOne({
            where: { id: data.id }
        })

        if (user) {

            // update
            await user.update({
                username: data.username,
                fullname: data.fullname,
                phone: data.phone,
                address: data.address,
                role: data.role ? data.role : 'customer',
                avatar: data.avatar
            })

            return {
                EM: 'Update user successfully!', // error message
                EC: 0, // error code
                DT: user, // user before update
            }

        } else {
            // not found
            return {
                EM: 'User not found', // error message
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

const deleteUser = async (id) => {

    try {

        let user = await db.User.findOne(({
            where: { id: id }
        }))

        if (user) {

            await user.destroy()

            return {
                EM: 'Delete user succeed!',
                EC: 0,
                DT: user // user deleted
            }

        } else {
            return {
                EM: 'User not exist!',
                EC: 1,
                DT: []
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'Delete fail !',
            EC: 2,
            DT: []
        }
    }
}

module.exports = {
    createUser, // register call
    createUserAdmin, // admin create user
    login,
    getAllUser,
    getUserWithPagination,
    getUserDetailService,
    updateUser,
    deleteUser,
}