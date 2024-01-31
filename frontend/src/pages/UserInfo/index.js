
import classNames from 'classnames/bind'
import { useEffect, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editUserInfo, updateUser, userSelector } from '../../features/user/userSlice'
import styles from './UserInfo.module.scss'
import { Button, Form, Input } from 'antd'
import { getDetailUserApi, updateUserApi } from '../../services/User'
import { toast } from 'react-toastify'
import { useForm } from 'antd/es/form/Form'

const cx = classNames.bind(styles)

const UserInfo = () => {

    const dispatch = useDispatch()
    const [form] = useForm()

    const currentUser = useSelector(userSelector)

    const [user, setUser] = useState(currentUser)
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        if (currentUser) {
            form.setFieldsValue(userInfo)
        }
    }, [userInfo])

    useEffect(() => {
        fetchUserDetail()
    }, [])

    const fetchUserDetail = async () => {
        const response = await getDetailUserApi(currentUser.id, currentUser.access_token)
        if (response && response.EC === 0) {
            toast('Success')
            setUserInfo(response.DT)
            // console.log(response.DT);
            // console.log(userInfo);
        } else {
            toast('Fail')
        }
    }

    const onFinish = async () => {
        const response = await updateUserApi(currentUser.access_token, { ...form.getFieldsValue(), id: currentUser.id, role: currentUser.role })
        if (response && response.EC === 0) {
            toast('Update success !')
            setUser(form.getFieldsValue)
            fetchUserDetail()
        } else {
            toast('Update error !')
        }
    }

    return (
        <div className={cx('user-info-wrapper')}>

            <h2>Thông Tin Cá Nhân</h2>

            <div className={cx('form-wrapper')}>

                <Form
                    name="basic"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="on"
                    form={form}
                    onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        label="Full Name"
                        name="fullname"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                    >
                        <Input />
                    </Form.Item>

                    <div
                        style={{ margin: '0 0 4px 88px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        className='upload-link mb3'>
                        <label
                            className='form-lable'
                            style={{ margin: '0 8px', fontSize: '1.4rem' }}
                        >
                            Chọn Ảnh
                        </label>
                        {/* <br /> */}
                        <input
                            type='file'
                            className='upload-link-input'
                        />
                    </div>

                    <Form.Item
                        style={{
                        }}
                        wrapperCol={{
                            offset: 4,
                            span: 20,
                        }}
                    >

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>

                            <Button
                                type="primary" htmlType="submit">
                                Submit
                            </Button>

                            <Button type="default">
                                Cancel
                            </Button>

                        </div>

                    </Form.Item>
                </Form>

            </div>

        </div >
    )
}

export default UserInfo
