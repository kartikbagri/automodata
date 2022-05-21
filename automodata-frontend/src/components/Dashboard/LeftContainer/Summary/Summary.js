import React, { useCallback, useState } from 'react';
import LeadingCar from './LeadingCar/LeadingCar';
import styles from './Summary.module.css';
import SummaryLeft from './SummaryLeft/SummaryLeft';

const Summary = () => {

    const loadHandler = useCallback(() => {
        setIsLoaded(true);
    }, []);

    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={styles['summary-section']}>
            {isLoaded && <SummaryLeft />}
            <LeadingCar 
                onLoad={loadHandler}
            />
        </div>
    );
}

export default Summary;