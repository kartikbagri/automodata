import React from 'react';
import styles from './LeadingCarBottom.module.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    scales
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales (in thousands) vs Month 2022',
      }
    },
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    scales
  );
  

const LeadingCarBottom = (props) => {
    console.log(props.data)
    const dataset = [];
    for(let i = 0; i < props.data.length; i++){
        const randomColor = [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255)];
        const item = {
            label: props.data[i].brand + ' ' + props.data[i].model,
            data: [props.data[i]['January_2022'], props.data[i]['February_2022'], props.data[i]['March_2022'], props.data[i]['April_2022'], props.data[i]['May_2022'], props.data[i]['June_2022']],
            borderColor: `rgb(${randomColor[0]}, ${randomColor[1]}, ${randomColor[2]})`,
            backgroundColor: `rgba(${randomColor[0]}, ${randomColor[1]}, ${randomColor[2]}, 0.15)`,
            fill: true,
            tension: 0.2
        }
        dataset.push(item);
    }
    const plottingData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: dataset
    }
    console.log(dataset)
    return (
        <div className={styles['leading-car-bottom-section']}>
            <div className= {styles['plot']}>
                <Line options={options} data={plottingData} />
            </div>
            <div className={styles['plot-info']}>Tracking top 5 cars (in terms of sales this month)</div>
        </div>
    );
}

export default LeadingCarBottom;