import React from 'react';
import styles from './Dashboard.module.css';
import LeftContainer from './LeftContainer/LeftContainer';
import RightContainer from './RightContainer/RightContainer';

const Dashboard = (props) => {
    
    return (
        <div className={styles['dashboard']}>
            <LeftContainer />
            <RightContainer />
        </div>
    );
}

export default Dashboard;