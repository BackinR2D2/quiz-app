import React, { useRef } from 'react'
import { Line } from 'react-chartjs-2';

function Chart({ data }) {
    const info = useRef({});
    const options = useRef({});

    const score = [];
    const timestamp = [];
    const points = [];
    data.forEach(el => {
        score.push(el.score);
        timestamp.push((el.timestamp).split('T')[0]);
        points.push(el.score_value);
    })

    info.current = {
        labels: timestamp,
        datasets: [
            {
                // label: ' points',
                // data: score,
                label: ' score',
                data: points,
                fill: false,
                backgroundColor: '#808588',
                borderColor: '#363636',
                yAxisID: 'y-axis-1',
            },
            {
                // label: ' score',
                // data: points,
                label: ' points',
                data: score,
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
                yAxisID: 'y-axis-2',
            },
        ],
    }

    options.current = {
        scales: {
            yAxes: [
                {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                },
                {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        drawOnArea: false,
                    },
                },
            ],
        },
    }
    return (
        <Line data={info.current} options={options.current} />
    )
}

export default Chart
