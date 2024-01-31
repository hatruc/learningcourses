import { Form, Input, Select } from 'antd';
import { useForm } from 'antd/es/form/Form'
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/user/userSlice';
import { createChapterApi, updateChapterApi } from '../../services/ChapterService';
import { toast } from 'react-toastify';
import { getAllCoursesApi } from '../../services/CourseService';
import { useParams } from 'react-router-dom';

const ModalChapter = ({ state, setState, data, refresh }) => {

    const user = useSelector(userSelector)
    const [form] = useForm()
    const params = useParams()

    useEffect(() => {
        if (state.isOpenModalUpdate) {
            form.setFieldsValue(data)
        }
    }, [data])

    const handleCreateChapter = async () => {

        let response = await createChapterApi(user.access_token, { ...form.getFieldsValue(), courseId: params.courseId })

        if (response && response.EC === 0) {
            toast(response.EM)
            handleClose()
            refresh()
        } else {
            toast(response.EM)
        }

    }

    const handleUpdateChapter = async () => {
        let response = await updateChapterApi(user.access_token, { ...form.getFieldsValue(), courseId: params.courseId, id: data.id })

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
                        <span>{state.isOpenModalCreate ? 'Create new user' : 'Edit user'}</span>
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
                            state.isOpenModalCreate ? handleCreateChapter : handleUpdateChapter
                        }
                    >
                        {/* <Form.Item
                            label="Course Name"
                            name="courseId"
                            rules={[{ required: true, message: "Mời nhập tên !" }]}
                            defaultValue="lucy"
                        >
                            <select className="form-select" aria-label="Default select example">
                                {allCourse.map((item, index) => {
                                    return (
                                        <option key={item.id} value={item.id} selected={item.id === data.courseId ? true : false}>
                                            {item.courseName}
                                        </option>
                                    )
                                })}
                            </select>
                        </Form.Item> */}

                        <Form.Item
                            label="Chapter Name"
                            name="chapterName"
                            rules={[{ required: true, message: "Mời nhập tên !" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Chapter Number"
                            name="chapterNumber"
                            rules={[{ required: true, message: "Mời nhập tên !" }]}
                        >
                            <Input />
                        </Form.Item>

                        {state.isOpenModalUpdate ?

                            <Form.Item
                                label="Total Lesson"
                                name="totalLesson"
                            >
                                <Input disabled />
                            </Form.Item>
                            :
                            <></>
                        }

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

export default ModalChapter