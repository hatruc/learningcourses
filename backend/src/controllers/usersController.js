
import userService from '../services/usersService'

const register = async (req, res) => {

    try {

        const { username, password, confirmPassword, fullname, email, phone, address } = req.body
        console.log(req.body);
        if (!username || !password || !confirmPassword || !email) {
            return res.status(400).json({
                EM: 'input required!', // error message
                EC: 1, // error code
                DT: '', // data
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                EM: 'password is not match!', // error message
                EC: 1, // error code
                DT: '', // data
            })
        }

        let data = await userService.createUser(req.body)

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

const login = async (req, res) => {

    try {

        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({
                EM: 'input required!', // error message
                EC: 1, // error code
                DT: '', // data
            })
        }

        const data = await userService.login(req.body)

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

const createFunc = async (req, res) => {

    try {
        // validate
        let data = await userService.createUserAdmin(req.body)

        console.log('>>> controller: ');

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

const getUserDetail = async (req, res) => {
    try {

        let data = await userService.getUserDetailService(req.params.id)
        if (req.params.id) {
            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                DT: data.DT, // data
            })
        } else {
            return res.status(404).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                DT: data.DT, // data
            })
        }

    } catch (error) {
        return res.status(500).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data
        })
    }
}

const readFunc = async (req, res) => {

    try {

        // console.log('>>> check req.user: ', req.user); // assign from middleware JwtAction.checkUserJwt
        if (req.query.page && req.query.limit) {
            let page = req.query.page
            let limit = req.query.limit

            let data = await userService.getUserWithPagination(+page, +limit)

            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                DT: data.DT, // data
            })

        } else {
            let data = await userService.getAllUser()

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

const updateFunc = async (req, res) => {

    try {
        // validate

        let data = await userService.updateUser(req.body)
        // console.log(req.body);

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

        let data = await userService.deleteUser(req.query.id)

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
    register,
    login,
    createFunc,
    readFunc,
    getUserDetail,
    updateFunc,
    deleteFunc,
}