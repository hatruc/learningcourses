
import styles from './Header.module.scss'
import classNames from 'classnames/bind';

import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';

import images from '../../../../assets/images'
import { PopperWrapper } from '../../../Popper';

import { Button, Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import { logout, userSelector } from '../../../../features/user/userSlice';
import { getDetailUserApi } from '../../../../services/User';

const cx = classNames.bind(styles)

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(userSelector)

    const getDetailUser = async (id, access_token) => {
        return await getDetailUserApi(id, access_token)
    }

    // const userDetail = useMemo(async () => await getDetailUser(user?.id, user?.access_token), [user.id, user.access_token])

    const handleClickLogin = () => {
        navigate('/login')
    }

    const handleClickRegister = () => {
        navigate('/register')
    }

    const handleClickUserPage = () => {
        navigate('/userInfo')
    }

    const handleClickSetting = () => {
        navigate('/settings')
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    // Tippy search result
    let [searchResult, setSearchResult] = useState([])

    const handleSearchInput = (e) => {
        searchResult = setSearchResult(e.target.value)
    }

    // Focus input -> search result
    let [checkFocusInput, setCheckFocusInput] = useState(false)

    const handleFocusInput = () => {
        setCheckFocusInput(true)
    }

    const handleBlurInput = () => {
        setCheckFocusInput(false)
    }

    // User icon
    const content = (
        <div>

            <div style={{ paddingBottom: '4px' }}>
                <span className={cx('user-info-page')} onClick={handleClickUserPage}>Tài khoản của bạn</span>
                <hr />
            </div>

            <div style={{ paddingBottom: '4px' }}>
                <span className={cx('setting-page')} onClick={handleClickSetting}>Cài Đặt</span>
                <hr />
            </div>

            <Button onClick={handleLogout}>Log Out</Button>

        </div>
    )

    // Notificaition Bell
    const notificaitionTitle = (
        <div className={cx('notification-header-wrapper')}>
            <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2px 0px' }}>Thông Báo</h4>
            <hr />
        </div>
    )

    const notificaitionContent = (

        <div className={cx('notification-content-wrapper')}>

            <div className={cx('notification-list')}>

                <div className={cx('notification-item')}>

                    <div className={cx('nofitication-item-icon')}>
                        <FontAwesomeIcon icon={faBell} />
                    </div>

                    <div className={cx('notification-item-content')}>
                        <p>Bài học mới được thêm vào.</p>
                    </div>

                </div>

                <div className={cx('notification-item')}>

                    <div className={cx('nofitication-item-icon')}>
                        <FontAwesomeIcon icon={faBell} />
                    </div>

                    <div className={cx('notification-item-content')}>
                        <p>Bài viết mới được đăng lên.</p>
                    </div>

                </div>

                <div className={cx('notification-item')}>

                    <div className={cx('nofitication-item-icon')}>
                        <FontAwesomeIcon icon={faBell} />
                    </div>

                    <div className={cx('notification-item-content')}>
                        <p>Bài viết mới được đăng lên.</p>
                    </div>

                </div>

                <div className={cx('notification-item')}>

                    <div className={cx('nofitication-item-icon')}>
                        <FontAwesomeIcon icon={faBell} />
                    </div>

                    <div className={cx('notification-item-content')}>
                        <p>Bài viết mới được đăng lên.</p>
                    </div>

                </div>

                <div className={cx('notification-item')}>

                    <div className={cx('nofitication-item-icon')}>
                        <FontAwesomeIcon icon={faBell} />
                    </div>

                    <div className={cx('notification-item-content')}>
                        <p>Bài viết mới được đăng lên.</p>
                    </div>

                </div>

                <div className={cx('notification-item')}>

                    <div className={cx('nofitication-item-icon')}>
                        <FontAwesomeIcon icon={faBell} />
                    </div>

                    <div className={cx('notification-item-content')}>
                        <p>Bài viết mới được đăng lên.</p>
                    </div>

                </div>

            </div>

            <div className={cx('notification-view-all')}>
                <hr />
                <h5 className={cx('notification-view-all-text')}>Xem tất cả</h5>
            </div>

        </div>

    );

    return (
        <div className={cx('header-container')}>

            <div className={cx('header-logo-title')}>
                <a href='/'>
                    <img src="" alt='LoGo' />
                </a>
            </div>

            <div className={cx('header-search')}>

                <Tippy
                    interactive
                    visible={searchResult.length > 0 && checkFocusInput}
                    placement='bottom'
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <div className={cx('search-result-wrapper')}>

                                    <div className={cx('search-result-header')}>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        <span style={{ margin: '0px 8px' }}>{`Kết quả tìm kiếm cho '${searchResult}'`}</span>
                                    </div>

                                    <div className={cx('search-result-list')}>

                                        <div className={cx('search-result-item')}>

                                            <div className={cx('search-result-item-title')}>

                                                <h5 style={{ fontFamily: 'sans-serif', fontSize: '1.8rem', fontWeight: '400' }}>
                                                    Khóa Học
                                                </h5>

                                                <span className={cx('search-result-page')}> Xem Thêm </span>

                                            </div>

                                            <hr />

                                            <div className={cx('search-result-item-content')}>
                                                <p style={{ fontFamily: 'sans-serif', fontSize: '1.4rem', fontWeight: '400' }}>Khóa Học 1</p>
                                                <p style={{ fontFamily: 'sans-serif', fontSize: '1.4rem', fontWeight: '400' }}>Khóa Học 2</p>
                                            </div>

                                        </div>

                                        <div className={cx('search-result-item')}>

                                            <div className={cx('search-result-item-title')}>

                                                <h5 style={{ fontFamily: 'sans-serif', fontSize: '1.8rem', fontWeight: '400' }}>
                                                    Bài Viết
                                                </h5>

                                                <span className={cx('search-result-page')}> Xem Thêm </span>

                                            </div>

                                            <hr />

                                            <div className={cx('search-result-item-content')}>
                                                <p style={{ fontFamily: 'sans-serif', fontSize: '1.4rem', fontWeight: '400' }}>Blog 1</p>
                                                <p style={{ fontFamily: 'sans-serif', fontSize: '1.4rem', fontWeight: '400' }}>Blog 2</p>
                                            </div>

                                        </div>

                                    </div>


                                </div>
                            </PopperWrapper>
                        </div>
                    )}>

                    <div className={cx('search-wrapper')}>

                        <div className={cx('search-icon')}></div>

                        <input onChange={(e) => handleSearchInput(e)} onFocus={() => handleFocusInput()} onBlur={() => handleBlurInput()} type='text' className={cx('search-input')} spellCheck="false" placeholder='Tìm kiếm khóa học' />

                        <div className={cx('search-clear')}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512" role='img'>
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        </div>

                    </div>

                </Tippy>

            </div>

            {!user?.id ?

                <div className={cx('header-actions')}>

                    <button onClick={handleClickLogin} className={cx('login-btn')}>Đăng nhập</button>

                    <button onClick={handleClickRegister} className={cx('register-btn')}>Đăng ký</button>

                </div>

                :

                <div className={cx('header-actions')} >

                    <Popover content={notificaitionContent} title={notificaitionTitle} trigger="click">
                        <div className={cx('header-notification-icon')}>
                            <FontAwesomeIcon style={{ width: '70%', height: '70%' }} icon={faBell} />
                        </div>
                    </Popover>

                    <Popover content={content} title='User' trigger="click">
                        <div className={cx('header-user-avatar-icon')} >
                            <FontAwesomeIcon style={{ width: '70%', height: '70%' }} icon={faUser} />
                        </div>
                    </Popover>

                </div>
            }

        </div>
    )
}

export default Header