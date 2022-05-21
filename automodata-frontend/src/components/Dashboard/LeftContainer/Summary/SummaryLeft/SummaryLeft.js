import React from 'react';
import CarsAnalysis from './CarsAnalysis';
import styles from './SummaryLeft.module.css';

const SummaryLeft= () => {
    return (
        <div className={styles['summary-left-section']}>
            <CarsAnalysis />
        </div>
    );
}

export default SummaryLeft;