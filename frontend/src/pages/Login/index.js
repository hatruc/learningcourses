import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../features/user/userSlice';
import { loginApi } from '../../services/User';
import { jwtDecode } from "jwt-decode";
import './Login.module.scss';
import { toast } from 'react-toastify';

const Login = () => {

    const [form] = useForm()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleRegisterNow = () => {
        navigate('/register')
    }

    const handleLogin = async (valueLogin) => {
        return await loginApi(valueLogin)
    }

    const onFinish = async (values) => {
        const newUser = await handleLogin(values)
        if (newUser && newUser.DT && newUser.EC === 0) {
            dispatch(updateUser({ ...newUser.DT, ...jwtDecode(newUser.DT.access_token) }))
            navigate('/')
        } else {
            toast(newUser.EM)
        }

    };

    const handlePressEnter = () => {
        handleLogin(form.getFieldsValue())
    }

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'center',
            marginTop: '16px'
        }}>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        onPressEnter={handlePressEnter}
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <span onClick={handleRegisterNow}>
                        <a href="">register now!</a>
                    </span>
                </Form.Item>
            </Form>
        </div>
    );
};
export default Login;