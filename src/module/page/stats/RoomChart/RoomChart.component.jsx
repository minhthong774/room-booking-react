import React, {useEffect, useReducer, useRef} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from "axios";
import {useBaseUrl} from "../../../utils/utils";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Register Stats',
        },
    },
};

const dataReducer = (state, action) => {
    switch (action.type) {
        case "init":
            return action.payload;
            break;
        default:
            return state;
    }
}

export default function RoomChart() {
    const [data, dispatch] = useReducer(
        dataReducer,
        null
    );
    const mounted = useRef();
    const [baseUrl, setBaseUrl] = useBaseUrl();

    useEffect(() => {
        if (!mounted.current) {
            axios.get(`${baseUrl}/admin/api/stats/room-register-stats`,)
                .then((response) => {
                    const responseData = response.data;
                    let labels = [];
                    responseData.map((item, index, arr) => {
                        labels.push(item.month + "/" + item.year);
                    })
                    const dataView = responseData.map((item, index, arr) => item.roomRegisterCount);
                    dispatch({
                        type: 'init',
                        id: 'a',
                        payload: {
                            labels,
                            datasets: [
                                {
                                    label: 'Room Register Stats',
                                    data: dataView,
                                    borderColor: 'rgb(255,99,132)',
                                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                    yAxisID: 'y',
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
    }, [data])

    return data == null ? <div></div> : (
        <div>
            <Line options={options} data={data}/>
        </div>
    );
}
