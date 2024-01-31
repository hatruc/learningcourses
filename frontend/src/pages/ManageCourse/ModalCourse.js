import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form'
import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { createCourseApi, updateCourseApi } from '../../services/CourseService';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/user/userSlice';
import { toast } from 'react-toastify';
import { fileDb } from '../../setup/firebase/firebaseSetup';
import { v4 } from 'uuid';
import { ref, getDownloadURL, uploadBytes } from '@firebase/storage';
import firebase from '../../setup/firebase/firebase'

const ModalCourse = ({ state, setState, data, refresh }) => {

    const user = useSelector(userSelector)
    const [form] = useForm()
    const [file, setFile] = useState('')
    const [fileURL, setFileURL] = useState('')

    useEffect(() => {
        if (state.isOpenModalUpdate) {
            form.setFieldsValue(data)
        }
    }, [data])

    const handleCreateCourse = async () => {

        let url = await handleUploadCreate()

        if (url && url !== '') {
            let response = await createCourseApi(user.access_token,
                {
                    ...form.getFieldsValue(),
                    imgCourse: url
                })

            if (response && response.EC === 0) {
                toast(response.EM)
                setFileURL('')
                handleClose()
                refresh()
            } else {
                toast(response.EM)
            }
        }

    }

    const handleUpdateCourse = async () => {
        // update img to firebase storage if imgCourse updated
        if (file) {
            // upload img to firebase
            const fileRef = ref(fileDb, `images/${v4()}`)
            let url = await uploadBytes(fileRef, file)
                .then(async (snapshot) => {
                    return getDownloadURL(snapshot.ref)
                        .then((data) => {
                            setFileURL(data)
                            return data
                        })
                        .catch((error) => {
                            return error
                        })

                })
                .catch(error => {
                    console.log(error);
                })

            // delete old img in firebase storage
            let storageRef = firebase.storage().refFromURL(data.imgCourse)
            await storageRef.delete()
                .then(() => {
                    toast.success('Delete success from firebase storage !')
                })
                .catch(() => {
                    toast.error('Delete fail from firebase storage !')
                })

            let response = await updateCourseApi(user.access_token,
                {
                    ...form.getFieldsValue(),
                    id: data.id,
                    imgCourse: url
                })

            if (response && response.EC === 0) {
                toast(response.EM)
                handleDeleteUploadedFirebase(data.imgCourse)
                handleClose()
                refresh()
            } else {
                toast(response.EM)
            }

        } else {

            let response = await updateCourseApi(user.access_token,
                {
                    ...form.getFieldsValue(),
                    id: data.id,
                    imgCourse: data.imgCourse
                })

            if (response && response.EC === 0) {
                toast(response.EM)
                handleClose()
                refresh()
            } else {
                toast(response.EM)
            }

        }

    }

    const handleClose = () => {
        setState({
            ...state,
            isOpenModalCreate: false,
            isOpenModalUpdate: false
        })
        setFile('')
        setFileURL('')
        form.resetFields()
    }

    const handleUploadCreate = async () => {
        if (file && file !== '') {
            // handle upload file
            const fileRef = ref(fileDb, `images/${v4()}`)
            const url = await uploadBytes(fileRef, file)
                .then(async (snapshot) => {
                    return await getDownloadURL(snapshot.ref)
                        .then((data) => {
                            return data
                        })
                        .catch((error) => {
                            return error
                        })

                })
                .catch(error => {
                    console.log(error);
                })
            return url
        } else {
            toast.warning('Please choose IMG Course !')
        }
    }

    // const handleUploadUpdate = async () => {
    //     // handle upload file
    //     const fileRef = ref(fileDb, `images/${v4()}`)
    //     await uploadBytes(fileRef, file)
    //         .then(async (snapshot) => {
    //             return await getDownloadURL(snapshot.ref)
    //                 .then((data) => {
    //                     setFileURL(data)
    //                 })
    //                 .catch((error) => {
    //                     return error
    //                 })

    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }

    const handleDeleteUploadedFirebase = async (url) => {
        if (fileURL) {
            let storageRef = firebase.storage().refFromURL(url ?? fileURL)
            await storageRef.delete()
                .then(() => {
                    toast.success('Delete success from firebase storage !')
                })
                .catch(() => {
                    toast.error('Delete fail from firebase storage !')
                })
        }
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
                        <span>{state.isOpenModalCreate ? 'Create new Course' : 'Edit Course'}</span>
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
                            state.isOpenModalCreate ? handleCreateCourse : handleUpdateCourse
                        }
                    >

                        <Form.Item
                            label="Course Name"
                            name="courseName"
                            rules={[{ required: true, }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Content Text"
                            name="contentText"
                            rules={[{ required: true, }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Level"
                            name="level"
                            rules={[{ required: true, }]}
                        >
                            <Input />
                        </Form.Item>

                        {state.isOpenModalUpdate ?

                            <>

                                <Form.Item
                                    label="Total Lesson"
                                    name="totalLesson"
                                >
                                    <Input disabled />
                                </Form.Item>

                                <Form.Item
                                    label="Img URL"
                                    name="imgCourse"
                                    rules={[{ required: true, }]}
                                >
                                    <Input />
                                </Form.Item>

                            </>
                            :
                            <></>
                        }

                    </Form>

                    <div
                        style={{ margin: '4px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        className='upload-link mb3'>
                        <label
                            className='form-lable'
                            style={{ margin: '8px 8px', fontSize: '1.4rem' }}
                        >
                            Chọn Video Cho Bài Học
                        </label>
                        {/* <br /> */}
                        <input
                            type='file'
                            className='upload-link-input'
                            onChange={(e) => setFile(e.target.files[0])}
                        // disabled={isUploading}
                        />
                        {/* <button className='btn btn-primary' onClick={() => handleUploadCreate()}>Upload</button> */}
                    </div>

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

export default ModalCourse