import React from 'react';
import styles from './LeadingCarTop.module.css';

const LeadingCarTop = (props) => {
    return (
        <div className={styles['leading-car-top-section']}>
            <div className={styles['leading-car-info-container']}>
                <div className={styles['leading-car-img-container']}>
                    <img src={`./CarsLogos/${props.brandName.split(' ').join('')}.svg`} alt={props.modelName} />
                </div>
                <div className={styles['leading-car-info']}>
                    <div className={styles['leading-car-info-brand']}>
                        {props.brandName}
                    </div>
                    <div className={styles['leading-car-info-model']}>
                        {props.modelName}
                    </div>
                </div>
            </div>
            <div className={styles['leading-car-info-sales']}>
                sold <span className={styles['sales-bold']}>{props.totalSales}k</span> units this year
            </div>
        </div>
    );
}

export default LeadingCarTop;