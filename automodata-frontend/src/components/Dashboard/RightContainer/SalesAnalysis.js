import React, { useState, useEffect } from 'react';
import styles from './SalesAnalysis.module.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const SalesAnalysis= () => {
    
    const changeHandler = (event) => {
        setQuery(event.target.value);
    }

    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('City_Mileage_in_km_per_litre');

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/sales/${query}`)
        .then(res => res.json())
        .then(result => {
            console.log(result);
            const borderColors = [];
            const backgroundColors = [];
            for(let i = 0; i < result.key.length; i++){
                const randomColor = [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255)];
                borderColors.push(`rgb(${randomColor[0]}, ${randomColor[1]}, ${randomColor[2]})`);
                backgroundColors.push(`rgba(${randomColor[0]}, ${randomColor[1]}, ${randomColor[2]}, 0.4)`);
            }
            const res = {
                labels: result.key,
                datasets: [{
                    label: 'Sales',
                    data: result.value,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 2
                }]
            }
            setData(res);
            setIsLoaded(true);
        },
        (error) => {
            console.log(error);
            setIsLoaded(true);
            setError(error);
        });
    }, [query]);

    if(error) {
        return <div className={styles['sales-analysis-section-error']}>Error: {error.message}</div>;
    } else if(!isLoaded) {
        return <div className={styles['sales-analysis-section-loading']}>Loading...</div>;
    }
    return (
        <div className={styles['sales-analysis-section']}>
            <h3 className={styles['sales-analysis-section-title']}>Sales Analysis</h3>
            <div>
                <p className={styles['select-text']}>Total sales of the year classified on basis of:</p>
                <select className={styles['select-menu']} defaultValue='City_Mileage_in_km_per_litre' onChange={changeHandler}>
                    <option value="Fuel_Type">Fuel Type</option>
                    <option value="Drivetrain">Drivetrain</option>
                    <option value="Cylinder_Configuration">Cylinder Configuration</option>
                    <option value="Emission_Norm">Emission Norm</option>
                    <option value="Body_Type">Body Type</option>
                    <option value="Doors">Number of Doors</option>
                    <option value="Type">Operation Type</option>
                    <option value="Instrument_Console">Instrument Console</option>
                    <option value="City_Mileage_in_km_per_litre">City Mileage (km/L)</option>
                </select>
            </div>
            <div className={styles['plot']}>
                <Pie data={data} />
            </div>
        </div>
    );
}

export default SalesAnalysis;