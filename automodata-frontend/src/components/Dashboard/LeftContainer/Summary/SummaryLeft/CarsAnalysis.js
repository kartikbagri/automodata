import React, { useState, useEffect } from 'react';
import styles from './CarsAnalysis.module.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const CarsAnalysis= () => {
    
    const changeHandler = (event) => {
        setQuery(event.target.value);
    }

    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('Fuel_Type');

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/cars/${query}`)
        .then(res => res.json())
        .then(result => {
            console.log(result);
            const borderColors = [];
            const backgroundColors = [];
            for(let i = 0; i < result.key.length; i++){
                const randomColor = [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255)];
                borderColors.push(`rgb(${randomColor[0]}, ${randomColor[1]}, ${randomColor[2]})`);
                backgroundColors.push(`rgba(${randomColor[0]}, ${randomColor[1]}, ${randomColor[2]}, 0.8)`);
            }
            const res = {
                labels: result.key,
                datasets: [{
                    label: 'Number of Cars',
                    data: result.value,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1
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
        return <div className={styles['cars-analysis-section-error']}>Error: {error.message}</div>;
    } else if(!isLoaded) {
        return <div className={styles['cars-analysis-section-loading']}>Loading...</div>;
    }
    return (
        <div className={styles['cars-analysis-section']}>
            <h3 className={styles['cars-analysis-section-title']}>Cars Analysis</h3>
            <div>
                <p class={styles['select-text']}>Classification of car models on the basis of:</p>
                <select className={styles['select-menu']} defaultValue='Fuel_Type' onChange={changeHandler}>
                    <option value="Body_Type">Body Type</option>
                    <option value="Doors">Number of Doors</option>
                    <option value="Fuel_Type">Fuel Type</option>
                    <option value="Handbrake">Handbrake</option>
                    <option value="Instrument Console">Instrument Console</option>
                    <option value="Drivetrain">Drivetrain</option>
                    <option value="Emission_Norm">Emission Norm</option>
                    <option value="Front Brakes">Front Brakes</option>
                    <option value="Rear Brakes">Brakes</option>
                </select>
            </div>
            <div className={styles['plot']}>
                <Doughnut data={data} />
            </div>
        </div>
    );
}

export default CarsAnalysis;