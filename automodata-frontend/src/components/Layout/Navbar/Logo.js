import React from 'react';
import styles from './Logo.module.css';
import logoImg from '../../../assets/images/logo.jpeg';

const Logo = () => {
    return (
        <div className={styles['logo-img-container']}>
            <img className={styles['logo-img']} src={logoImg} alt="Automodata Logo" />
        </div>
    );
}

export default Logo;