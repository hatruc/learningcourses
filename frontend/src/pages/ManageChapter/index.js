import React, { useEffect, useState } from 'react';
import { Button, Skeleton, Table } from 'antd';
import { getAllCoursesApi } from '../../services/CourseService';
import { toast } from 'react-toastify';
import styles from './ManageChapter.module.scss'
import classNames from 'classnames/bind';
import ModalChapter from './ModalChapter';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { deleteChapter, getAllChapterApi } from '../../services/ChapterService';
import ModalDelete from './ModalDelete';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/user/userSlice';
import { fileDb } from '../../setup/firebase/firebaseSetup';
import firebase from '../../setup/firebase/firebase'

const cx = classNames.bind(styles)

const ManageChapter = () => {

    const navigate = useNavigate()
    const params = useParams()
    const user = useSelector(userSelector)
    const [progress, setProgress] = useState(0)

    // Modal delete
    const [dataModal, setDataModal] = useState({})
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)

    const [allChapter, setAllChapter] = useState([])
    const [chapter, setChapter] = useState({})
    const [state, setState] = useState({
        isOpenModalCreate: false,
        isOpenModalUpdate: false,
    })

    useEffect(() => {
        fetchAllChapter()
    }, [])

    const fetchAllChapter = async () => {
        let response = await getAllChapterApi(params.courseId)
        if (response && response.EC === 0) {
            setAllChapter(response.DT)
        } else {
            toast.error(response.EM)
        }
    }

    const handleUpdateChapter = (chapter) => {
        setChapter(chapter)
        setState({ ...state, isOpenModalUpdate: true })
    }

    const handleDeleteChapter = (chapter) => {
        setDataModal(chapter)
        setIsShowModalDelete(true)
    }

    const confirmDeleteChapter = async () => {

        let response = await deleteChapter(user.access_token, dataModal.id)

        if (response && response.DT && response.EC === 0) {
            const allLessonVideoURLOfChapter = response.LS.map((item, index) => item.video)
            deleteAllLessonOfChapterFirebase(allLessonVideoURLOfChapter)
            setIsShowModalDelete(false)
            toast.success(response.EM)
            await fetchAllChapter()
        } else {
            toast.error(response.EM)
        }
    }

    const deleteAllLessonOfChapterFirebase = async (arrUrl) => {
        for (let i = 0; i < arrUrl.length; i++) {
            let storageRef = firebase.storage().refFromURL(arrUrl[i])
            await storageRef.delete()
                .then(() => {
                    toast.success('Delete success from firebase storage: ', arrUrl[i])
                })
                .catch(() => {
                    toast.error('Delete fail from firebase storage lesson: ', arrUrl[i])
                })
        }
    }

    const handleClose = () => {
        setIsShowModalDelete(false)
        setDataModal({})
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            // filters: [
            //     {
            //         text: 'Joe',
            //         value: 'Joe',
            //     },
            //     {
            //         text: 'Jim',
            //         value: 'Jim',
            //     },
            //     {
            //         text: 'Submenu',
            //         value: 'Submenu',
            //         children: [
            //             {
            //                 text: 'Green',
            //                 value: 'Green',
            //             },
            //             {
            //                 text: 'Black',
            //                 value: 'Black',
            //             },
            //         ],
            //     },
            // ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            // onFilter: (value, record) => record.name.indexOf(value) === 0,
            // sorter: (a, b) => a.name.length - b.name.length,
            // sortDirections: ['descend'],
        },
        // {
        //     title: 'Admin',
        //     dataIndex: 'adminId',
        //     defaultSortOrder: 'descend',
        //     sorter: (a, b) => a.age - b.age,
        // },
        {
            title: 'Chapter Name',
            dataIndex: 'chapterName',
            // filters: [
            //     {
            //         text: 'London',
            //         value: 'London',
            //     },
            //     {
            //         text: 'New York',
            //         value: 'New York',
            //     },
            // ],
            // onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
            title: 'Chapter Number',
            dataIndex: 'chapterNumber',
            // filters: [
            //     {
            //         text: 'London',
            //         value: 'London',
            //     },
            //     {
            //         text: 'New York',
            //         value: 'New York',
            //     },
            // ],
            // onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
            title: 'Total Lesson',
            dataIndex: 'totalLesson',
            // filters: [
            //     {
            //         text: 'London',
            //         value: 'London',
            //     },
            //     {
            //         text: 'New York',
            //         value: 'New York',
            //     },
            // ],
            // onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, chapter) => {
                return <div>
                    <Button onClick={() => navigate(`/manage-course/${params.courseId}/manage-chapter/${chapter.chapterNumber}/manage-lesson`)}>Lesson</Button>
                    <Button onClick={() => handleUpdateChapter(chapter)}>UPDATE</Button>
                    <Button onClick={() => handleDeleteChapter(chapter)}>Delete Chapter</Button>
                </div>
            }
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div className={cx('container')}>
            <Button
                style={{ margin: '12px 0' }}
                onClick={() => setState({ ...state, isOpenModalCreate: true })}
                type="primary"
            >
                Tạo Mới
            </Button>

            {allChapter ?
                <Table pagination={{ pageSize: 2 }} columns={columns}
                    dataSource={allChapter.map((item, index) => {
                        return { ...item, key: item.id }
                    })}
                    onChange={onChange}
                />
                :
                <Skeleton />
            }

            <Button type='primary' onClick={() => navigate('/manage-course')}>Back</Button>

            <ModalChapter
                data={chapter}
                state={state}
                setState={setState}
                refresh={fetchAllChapter}
            />

            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteChapter={confirmDeleteChapter}
                dataModal={dataModal}
            />

        </div>
    )


}
export default ManageChapter;