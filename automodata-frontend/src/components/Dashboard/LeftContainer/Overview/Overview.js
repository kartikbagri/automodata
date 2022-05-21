import React, { useEffect, useState } from 'react';
import Leaderboard from './Leaderboard';
import styles from './Overview.module.css';
import Sales from './Sales';

const Overview = (props) => {
    const [salesData, setSalesData] = useState([]);
    const [leaders, setLeaders] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/dashboard')
        .then(res => res.json())
        .then(result => {
            setLeaders({
                'topBrandYear': result.top_brand_of_year,
                'topBrandMonth': result.top_brand_of_month,
            });
            setSalesData(JSON.parse(result.sales))
            console.log(JSON.parse(result.sales))
            setIsLoaded(true);
        },
        (error) => {
            console.log(error);
            setIsLoaded(true);
            setError(error);
        });
    }, []);

    if (error) {
        return <div className={styles['overview-error']}>Error: {error.message}</div>;
    } else if(!isLoaded) {
        return <div className={styles['overview-loading']}>Loading...</div>;
    }
    return (
        <div className={styles['overview-section']}>
            <Sales
                title='Sold this year'
                currentValue={salesData['2022']}
                previousValue={salesData['2021']}
            />
            <Sales
                title='Sold this month'
                currentValue={salesData['May_2022']}
                previousValue={salesData['April_2022']}
            />
            <Leaderboard 
                title='Top Brand this year'
                value={leaders.topBrandYear}
            />
            <Leaderboard 
                title='Top Brand this month'
                value={leaders.topBrandMonth}
            />
        </div>
    );
}

export default Overview;