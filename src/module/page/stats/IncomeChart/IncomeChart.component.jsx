import React, {useEffect, useRef} from 'react';

import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import axios from "axios";
import {useBaseUrl} from "../../../utils/utils";
/**/
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    stacked: false,
    plugins: {
        // legend: {
        //   position: 'top',
        // },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
    scales: {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
                drawOnChartArea: false,
            },
        },
    },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
//
// export const data = {
//     labels,
//     datasets: [
//         {
//             label: 'Dataset 1',
//             data: labels.map(() => faker.datatype.number({min: 0, max: 1000})),
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//             yAxisID: 'y',
//         },
//         {
//             label: 'Dataset 2',
//             data: labels.map(() => faker.datatype.number({min: 0, max: 10})),
//             backgroundColor: 'rgba(53, 162, 235, 0.5)',
//             yAxisID: 'y1',
//         },
//     ],
// };

const action = {
    type: 'DO_TODO',
    id: 'a',
};

const dataReducer = (state, action) => {
    switch (action.type) {
        case 'DO_TODO':
            return action.payload;
            ;
        default:
            return state;
    }
};

export default function IncomeChart() {
    const [data, dispatch] = React.useReducer(
        dataReducer,
        null
    );
    const mounted = useRef();

    const [baseUrl, setBaseUrl] = useBaseUrl();

    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            axios.get(`${baseUrl}/admin/api/stats/income-stats`,)
                .then((response) => {
                    const responseData = response.data;
                    let labels = [];
                    responseData.map((item, index, arr) => {
                        labels.push(item.month + "/" + item.year);
                    })
                    const dataView1 = responseData.map((item, index, arr) => item.income);
                    const dataView2 = responseData.map((item, index, arr) => item.bookingCount);
                    dispatch({
                        type: 'DO_TODO',
                        id: 'a',
                        payload: {
                            labels,
                            datasets: [
                                {
                                    label: 'Income',
                                    data: dataView1,
                                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                    yAxisID: 'y',
                                },
                                {
                                    label: 'Booking Count',
                                    data: dataView2,
                                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                    yAxisID: 'y1',
                                },
                            ],
                        }
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
            mounted.current = true;
        } else {
            // do componentDidUpdate logic
        }

    }, [data]);

    return data === null? <div></div>:(
        <div>
            <Bar options={options} data={data}/>
        </div>
    )
}