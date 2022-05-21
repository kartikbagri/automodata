import React from 'react';
import styles from './LeftContainer.module.css';
import Overview from './Overview/Overview';
import Summary from './Summary/Summary';

const LeftContainer = () => {
    
    return (
        <div className={styles['left-container']}>
            <Overview />
            <Summary />

        </div>
    );
}

export default LeftContainer;