import React from 'react';
import styles from './CustomerAnalysis.module.css';

const CustomerAnalysis= () => {
    return (
        <div className={styles['customer-analysis-section']}>
            <h3 className={styles['customer-analysis-section-title']}>Customer Analysis</h3>
            <div className={styles['plot']}>
                
            </div>
        </div>
    );
}

export default CustomerAnalysis;