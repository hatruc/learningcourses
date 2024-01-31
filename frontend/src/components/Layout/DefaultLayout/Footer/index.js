
import styles from './Footer.module.scss'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '../../../../assets/images'

const cx = classNames.bind(styles)

const Footer = () => {
    return (
        <div className={cx('container')}>

            <div className={cx('wrapper')}>

                <div className={cx('content')}>

                    <div className={cx('title')}>
                        <a href='/'>
                            <img src={images.logo} alt='LoGo' />
                        </a>
                    </div>

                    <div className={cx('about-us')}>

                        <div className={cx('phone-number')}>
                            Điện Thoại: 19001808
                        </div>

                        <div className={cx('email')}>
                            Email: contact@gmail.com
                        </div>

                        <div className={cx('address')}>
                            Address: Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Footer