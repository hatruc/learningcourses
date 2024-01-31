import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '../../features/user/userSlice'
import { deleteUser, getAllUserApi } from '../../services/User'
import { toast } from 'react-toastify';
import ModalUser from './ModalUser'
import ModalDelete from './ModalDelete'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Skeleton, Table } from 'antd'
import classNames from 'classnames/bind';
import styles from './ManageUser.module.scss'

const cx = classNames.bind(styles)

const ManageUser = () => {

    const navigate = useNavigate()
    const params = useParams()
    const userAuthen = useSelector(userSelector)

    // Modal delete
    const [dataModal, setDataModal] = useState({})
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)

    const [listUser, setListUser] = useState([])
    const [user, setUser] = useState({})
    const [state, setState] = useState({
        isOpenModalCreate: false,
        isOpenModalUpdate: false,
    })

    useEffect(() => {
        fetchAllUser()
    }, [])

    const fetchAllUser = async () => {
        let response = await getAllUserApi()
        if (response && response.EC === 0) {
            setListUser(response.DT)
        } else {
            toast.error(response.EM)
        }
    }

    const handleUpdateUser = (user) => {
        setUser(user)
        setState({ ...state, isOpenModalUpdate: true })
    }

    const handleDeleteUser = (user) => {
        setDataModal(user)
        setIsShowModalDelete(true)
    }

    const confirmDeleteUser = async () => {

        let response = await deleteUser(userAuthen.access_token, dataModal.id)

        console.log(response);

        if (response && response.DT && response.EC === 0) {
            setIsShowModalDelete(false)
            toast.success(response.EM)
            await fetchAllUser()
        } else {
            toast.error(response.EM)
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
        },

        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'User Name',
            dataIndex: 'username',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, user) => {
                return <div>
                    <Button onClick={() => handleUpdateUser(user)}>UPDATE</Button>
                    <Button onClick={() => handleDeleteUser(user)}>Delete User</Button>
                </div>
            }
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
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

            {listUser ?
                <Table pagination={{ pageSize: 2 }} columns={columns}
                    dataSource={listUser.map((item, index) => {
                        return { ...item, key: item.id }
                    })}
                    onChange={onChange}
                />
                :
                <Skeleton />
            }

            <ModalUser
                data={user}
                state={state}
                setState={setState}
                refresh={fetchAllUser}
            />

            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />

        </div>
    )
}

export default ManageUser