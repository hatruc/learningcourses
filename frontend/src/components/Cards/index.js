
import React from 'react';
import { Card } from 'antd';
import classNames from "classnames/bind"
import styles from "./Cards.module.scss"

const cx = classNames.bind(styles)

const { Meta } = Card;

const CardComponent = ({ name, imgSrc, onClick }) => (
    <div className={cx('card-wrapper')}>
        <Card
            hoverable
            style={{
                width: '100%',
                height: '100%'
            }}
            cover={<img alt={name} src={imgSrc} />}
            onClick={onClick}
        >
            <Meta className={cx('card-body')} title={name} />
        </Card>
    </div>
);
export default CardComponent;