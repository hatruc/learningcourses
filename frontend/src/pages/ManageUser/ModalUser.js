import React from 'react'
import { createUserApi, updateUserApi } from '../../services/User'
import { useState, useEffect } from 'react'
import _ from 'lodash'
import { toast } from 'react-toastify'
import { Modal, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { updateUser, userSelector } from '../../features/user/userSlice'
import { useParams } from 'react-router-dom'
import { useForm } from 'antd/es/form/Form'
import { Form, Input } from 'antd'

const ModalUser = ({ state, setState, data, refresh }) => {

    const userAuthen = useSelector(userSelector)
    const [form] = useForm()

    useEffect(() => {
        if (state.isOpenModalUpdate) {
            form.setFieldsValue(data)
        }
    }, [data])

    const handleCreateUser = async () => {

        let response = await createUserApi(userAuthen.access_token, { ...form.getFieldsValue() })

        if (response && response.EC === 0) {
            toast(response.EM)
            handleClose()
            refresh()
        } else {
            toast(response.EM)
        }

    }

    const handleUpdateUser = async () => {
        let response = await updateUserApi(userAuthen.access_token, { ...form.getFieldsValue(), id: data.id })

        if (response && response.EC === 0) {
            toast(response.EM)
            handleClose()
            refresh()
        } else {
            toast(response.EM)
        }
    }

    const handleClose = () => {
        setState({
            ...state,
            isOpenModalCreate: false,
            isOpenModalUpdate: false
        })
        form.resetFields()
    }

    return (

        <>
            <Modal
                size="lg"
                className='modal-user'
                show={state.isOpenModalCreate || state.isOpenModalUpdate}
                onHide={() => handleClose()}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{state.isOpenModalCreate ? 'Create new User' : 'Edit User'}</span>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        autoComplete="on"
                        form={form}
                        onFinish={
                            state.isOpenModalCreate ? handleCreateUser : handleUpdateUser
                        }
                    >

                        <Form.Item
                            label="User Name"
                            name="username"
                            rules={[{ required: true, message: "Mời nhập tên !" }]}
                        >
                            <Input disabled={state.isOpenModalUpdate} />
                        </Form.Item>

                        {state.isOpenModalCreate ?
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: "Mời nhập tên !" }]}
                            >
                                <Input type='password' />
                            </Form.Item>
                            :
                            <></>
                        }

                        <Form.Item
                            label="Full Name"
                            name="fullname"
                            rules={[{ required: true, message: "Mời nhập tên !" }]}
                        >
                            <Input disabled={state.isOpenModalUpdate} />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: "Mời nhập tên !" }]}
                        >
                            <Input disabled={state.isOpenModalUpdate} />
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: "Mời nhập tên !" }]}
                        >
                            <Input disabled={state.isOpenModalUpdate} />
                        </Form.Item>

                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: "Mời nhập tên !" }]}
                        >
                            <Input disabled={state.isOpenModalUpdate} />
                        </Form.Item>

                        <Form.Item
                            label="Role"
                            name="role"
                            rules={[{ required: true, message: "Mời nhập tên !" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Avatar"
                            name="avatar"
                        // rules={[{ required: true, message: "Mời nhập tên !" }]}
                        >
                            <Input disabled={state.isOpenModalUpdate} />
                        </Form.Item>

                    </Form>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' onClick={() => handleClose()}>Close</Button>
                    <Button variant='primary' onClick={() => { form.submit() }}>
                        {state.isOpenModalCreate ? 'SAVE' : 'UPDATE'}
                    </Button>
                </Modal.Footer>
            </Modal >
        </>

    )
}

export default ModalUser