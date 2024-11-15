import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal } from 'react-bootstrap';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Chart as ChartJS, CategoryScale, ArcElement, LinearScale, RadialLinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Bar, Doughnut, Pie, Line, PolarArea, Scatter } from 'react-chartjs-2';
import { BiLineChart, BiBarChartAlt, BiChart, BiNetworkChart, BiPieChart, BiDoughnutChart } from "react-icons/bi";
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend
);

function ChartViewModal({ id, viewChart, setViewChart }) {

    const data = useSelector((state) => {
        return state
    });

    const handleClose = () => setViewChart(false);

    // bar chart data start
    const options1 = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '',
            },
        },
    };
    const labels = ['January', 'February', 'March', 'April', 'May'];
    const data1 = {
        labels, // This should match the number of data points in the datasets
        datasets: [
            {
                label: 'Dataset 1',
                data: [2, 3, 4, 5, 6], // 5 data points
                backgroundColor: 'rgba(0, 157, 225, 0.9)',
            },
            {
                label: 'Dataset 2',
                data: [7, 8, 9, 1, 2], // 5 data points
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    // bar chart data end

    // doughnut chart data start
    const data2 = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    // doughnut chart data end

    // pie chart data start
    const data3 = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'Pie Chart',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    // pie chart data end

    // line chart data start
    const options2 = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '',
            },
        },
    };
    const labels2 = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data4 = {
        labels,
        datasets: [
            {
                label: 'Line Chart',
                data: [1, 4, 3, 7, 2],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(0, 157, 225, 0.9)',
            }
        ],
    };
    // line chart data end

    // bi chart data start
    const data5 = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'BI Chart',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                borderWidth: 1,
            },
        ],
    }
    // bi chart data end

    // network chat data start
    const options3 = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // Sample chart data
    const data6 = {
        datasets: [
            {
                label: 'Network Chart',
                data: Array.from({ length: 100 }, () => ({
                    x: faker.datatype.number({ min: -100, max: 100 }),
                    y: faker.datatype.number({ min: -100, max: 100 }),
                })),
                backgroundColor: 'rgba(0, 157, 225, 1)',
            },
        ],
    };
    // network chat data end

    return (
        <div>
            <Modal
                show={viewChart}
                onHide={() => setViewChart(false)}
                dialogClassName="modal-90w"
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Graph View</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col md={12}>
                                <div>
                                    {id == 1 &&
                                        <div className='boxChart'>
                                            <Bar options={options1} data={data1} height={'300px'} />
                                        </div>}
                                    {id == 2 &&
                                        <div className='circleChart'>
                                            <Doughnut data={data2} />
                                        </div>}
                                    {id == 3 &&
                                        <div className='circleChart'>
                                            <Pie data={data3} />
                                        </div>}
                                    {id == 4 &&
                                        <div className='boxChart'>
                                            <Line options={options2} data={data4} height={'300px'} />
                                        </div>}
                                    {id == 5 &&
                                        <div className='circleChart'>
                                            <PolarArea data={data5} />
                                        </div>}
                                    {id == 6 &&
                                        <div className='boxChart'>
                                            <Scatter options={options3} data={data6} height={'180px'} />
                                        </div>}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ChartViewModal;