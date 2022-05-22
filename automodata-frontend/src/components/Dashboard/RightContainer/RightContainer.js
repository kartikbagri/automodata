import React from 'react';
import LeadingSpecs from './LeadingSpecs';
import styles from './RightContainer.module.css';
import SalesAnalysis from './SalesAnalysis';

const RightContainer = () => {
    return (
        <div className={styles['right-container']}>
            <SalesAnalysis />
            <LeadingSpecs />
        </div>
    );
}

export default RightContainer;