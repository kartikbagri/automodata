import React, { useEffect, useState } from 'react';
import styles from './LeadingCar.module.css';
import LeadingCarTop from './LeadingCarTop';
import LeadingCarBottom from './LeadingCarBottom';

const LeadingCar= (props) => {

    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch('http://127.0.0.1:5000/leading/models/5')
        .then(res => res.json())
        .then(result => {
            setData(result);
            setIsLoaded(true);
            props.onLoad();
        },
        (error) => {
            console.log(error);
            setIsLoaded(true);
            setError(error);
        });
    }, [props, props.onLoad]);

    if(error) {
        return <div className={styles['leading-car-section-error']}>Error: {error.message}</div>;
    } else if(!isLoaded) {
        return <div className={styles['leading-car-section-loading']}>Loading...</div>;
    }
    return (
        <div className={styles['leading-car-section']}>
            <h3 className={styles['leading-car-section-title']}>Leading Car this month</h3>
            <LeadingCarTop
                brandName={data[0].brand}
                modelName={data[0].model}
                totalSales={data[0].total_sales}
                price={data[0].price}
                />
            <LeadingCarBottom 
                data={data}
            />
        </div>
    );
}

export default LeadingCar;