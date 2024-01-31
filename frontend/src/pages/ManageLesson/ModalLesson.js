import { Form, Input, Progress } from 'antd';
import { useForm } from 'antd/es/form/Form'
import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userSelector } from '../../features/user/userSlice';
import { createLessonApi, updateLessonApi } from '../../services/LessonService';
import { toast } from 'react-toastify'
import { fileDb } from '../../setup/firebase/firebaseSetup';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';
import firebase from '../../setup/firebase/firebase'

const ModalLesson = ({ state, setState, data, refresh }) => {

    const user = useSelector(userSelector)
    const [form] = useForm()
    const params = useParams()
    const [file, setFile] = useState('')
    const [fileURL, setFileURL] = useState('')
    const [progress, setProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        if (state.isOpenModalUpdate) {
            form.setFieldsValue(data)
        }
    }, [data])

    const handleCreateLesson = async () => {

        if (fileURL || fileURL !== '') {

            let response = await createLessonApi(user.access_token,
                {
                    ...form.getFieldsValue(),
                    courseId: params.courseId,
                    chapterNumber: params.chapterNumber,
                    video: fileURL,
                })

            if (response && response.EC === 0) {
                toast(response.EM)
                setFileURL('')
                handleClose(true)
                refresh()
            }
            else {
                toast(response.EM)
            }

        } else {
            toast.error('Please choose video and press on Upload button then wait video upload !')
        }

    }

    const handleUpdateLesson = async () => {

        let response = await updateLessonApi(user.access_token,
            {
                ...form.getFieldsValue(),
                chapterNumber: params.chapterNumber,
                courseId: params.courseId,
                id: data.id,
                video: fileURL ? fileURL : data.video,
            })

        if (response && response.EC === 0) {
            toast(response.EM)
            handleDeleteUploadedFirebase(data.video)
            handleClose(true)
            refresh()
        } else {
            toast(response.EM)
        }

    }

    const handleClose = (updated = false) => {
        setState({
            ...state,
            isOpenModalCreate: false,
            isOpenModalUpdate: false
        })
        setFile('')
        setFileURL('')
        setProgress(0)
        form.resetFields()
        if (!updated) {
            handleDeleteUploadedFirebase()
        }
    }

    const handleUpload = async () => {
        if (file && file !== '') {
            const fileRef = ref(fileDb, `files/${v4()}`)
            const uploadTask = uploadBytesResumable(fileRef, file)

            uploadTask.on('state_changed', (snapshot) => {
                const process = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(process)
                setIsUploading(true)
            }, (error) => {
                console.log('error: ', error);
            }, () => {
                console.log('success !!!');
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(downloadURL => {
                        setFileURL(downloadURL)
                    })
                setIsUploading(false)
            })
        } else {
            toast.warning('Please choose file !')
        }
    }

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
                        <span>{state.isOpenModalCreate ? 'Create new lesson' : 'Edit lesson'}</span>
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
                            state.isOpenModalCreate ? handleCreateLesson : handleUpdateLesson
                        }
                    >

                        <Form.Item
                            label="Lesson Name"
                            name="lessonName"
                            rules={[{ required: true, message: "Mời nhập tên !" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Lesson Number"
                            name="lessonNumber"
                            rules={[{ required: true, message: "Mời nhập tên !" }]}
                        >
                            <Input />
                        </Form.Item>

                        {state.isOpenModalUpdate ?

                            <>
                                <Form.Item
                                    label="Video"
                                    name="video"
                                >
                                    <Input disabled />
                                </Form.Item>

                                <Form.Item
                                    label="Video Duration"
                                    name="videoDuration"
                                >
                                    <Input disabled />
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
                            disabled={isUploading}
                        />
                        <div style={{ fontSize: '2rem', width: '50%' }}>
                            <Progress percent={progress} />
                        </div>
                        <button className='btn btn-primary' disabled={isUploading} onClick={handleUpload}>Upload</button>
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

export default ModalLesson