import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal, InputGroup } from 'react-bootstrap';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { BiInfoCircle, BiHide, BiTrash, BiSearchAlt2, BiDotsHorizontalRounded } from "react-icons/bi";

function CreateReport({ reportCreate, setReportCreate, buttonCtrl }) {

    const data = useSelector((state) => {
        return state
    });

    const handleClose = () => setReportCreate(false);

    const reportCategoryList = [
        {
            id: 0,
            categories: 'Recent',
            list: [
                {
                    id: 0,
                    reportName: 'Opportunities1',
                    category: 'Biscuits 852',
                },
                {
                    id: 1,
                    reportName: 'Contacts1',
                    category: 'Finance',
                },
                {
                    id: 2,
                    reportName: 'Attendance1',
                    category: 'Presales',
                },
            ]
        },
        {
            id: 1,
            categories: 'Sales',
            list: [
                {
                    id: 0,
                    reportName: 'Opportunities2',
                    category: 'Biscuits 852',
                },
                {
                    id: 1,
                    reportName: 'Contacts2',
                    category: 'Finance',
                },
            ]
        },
        {
            id: 2,
            categories: 'Finance',
            list: [
                {
                    id: 0,
                    reportName: 'Opportunities3',
                    category: 'Biscuits 852',
                },
                {
                    id: 1,
                    reportName: 'Contacts3',
                    category: 'Finance',
                },
                {
                    id: 2,
                    reportName: 'Attendance3',
                    category: 'Presales',
                },
            ]
        },
        {
            id: 3,
            categories: 'Design Team',
            list: [
                {
                    id: 0,
                    reportName: 'Opportunities4',
                    category: 'Biscuits 852',
                },
            ]
        },
        {
            id: 4,
            categories: 'Presales',
            list: [
                {
                    id: 0,
                    reportName: 'Opportunities5',
                    category: 'Biscuits 852',
                },
                {
                    id: 1,
                    reportName: 'Contacts5',
                    category: 'Finance',
                },
                {
                    id: 2,
                    reportName: 'Attendance5',
                    category: 'Presales',
                },
            ]
        },
        {
            id: 5,
            categories: 'Mobile Development Unit',
            list: [
                {
                    id: 1,
                    reportName: 'Opportunities6',
                    category: 'Biscuits 852',
                },
            ]
        }
    ];

    const [datalist, Setdatalist] = useState(reportCategoryList);
    const [search, Setsearch] = useState('');
    const [selectCat, setSelectCat] = useState('All');
    const [showMenu, setShowMenu] = useState(null);

    const getCategory = ['All', ...new Set(reportCategoryList.map(x => x.categories))];

    const selectCategory = (selectCat) => {
        setSelectCat(selectCat);
        if (selectCat == "All") {
            Setdatalist(reportCategoryList);
        }
        else {
            const filteredData = reportCategoryList.filter((x) => {
                return x.categories == selectCat;
            })
            Setdatalist(filteredData);
        }
    }

    const searchItems = (searchValue) => {
        Setsearch(searchValue);
        if (searchValue && searchValue.trim() !== '') {
            const lowerSearch = searchValue.toLowerCase();
            const filteredData = reportCategoryList.filter((category) => {
                return (
                    category.categories.toLowerCase().includes(lowerSearch) ||
                    category.list.some((report) =>
                        report.reportName.toLowerCase().includes(lowerSearch)
                    )
                );
            });
            Setdatalist(filteredData);
        } else {
            Setdatalist(reportCategoryList);
        }
    };


    const tableActionMenu = (index) => {
        if (showMenu === index) {
            setShowMenu(null);
        } else {
            setShowMenu(index);
        }
    }

    return (
        <div>
            <Modal
                show={reportCreate}
                onHide={() => setReportCreate(false)}
                dialogClassName="modal-90w"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Select Report</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: '0px' }}>
                    <div>
                        <Row>
                            <Col md={4}>
                                <ul className='reportCatList'>
                                    {getCategory?.map((item, index) => {
                                        return (
                                            <li key={index.toString()}>
                                                <a
                                                    className={selectCat === item ? 'active' : null}
                                                    onClick={() => selectCategory(item)}>{item}</a>
                                            </li>)
                                    })}
                                </ul>
                            </Col>
                            <Col md={8}>
                                <Scrollbars style={{ height: 400 }}>
                                    <InputGroup className="mb-3 mt-3" style={{ paddingRight: '20px' }}>
                                        <InputGroup.Text id="basic-addon1"><BiSearchAlt2 /></InputGroup.Text>
                                        <Form.Control placeholder='Search filename here' className='form-control' onChange={(e) => searchItems(e.target.value)}
                                        />
                                    </InputGroup>
                                    <table className='reportSearchTable'>
                                        <thead>
                                            <tr>
                                                <th>Report Name</th>
                                                <th>Category</th>
                                                <th>Options</th>
                                            </tr>
                                        </thead>
                                        {datalist?.map((item, index) => {
                                            return (
                                                <tbody key={index.toString()}>
                                                    {item.list.map((subItem, index) => {
                                                        return (
                                                            <tr key={index.toString()}>
                                                                <td>{subItem.reportName}</td>
                                                                <td>{subItem.category}</td>
                                                                <td>
                                                                    <button style={{ paddingLeft: '20px' }} onClick={() => tableActionMenu(subItem.reportName)}><BiDotsHorizontalRounded size={24} color='#60636A' /></button>
                                                                    {showMenu === subItem.reportName &&
                                                                        <ul>
                                                                            <li><a><BiInfoCircle size={18} />Hide</a></li>
                                                                            <li><a><BiTrash size={18} /> Delete</a></li>
                                                                            <li><a><BiHide size={18} />Details</a> </li>
                                                                        </ul>}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            )
                                        })}
                                    </table>
                                </Scrollbars>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='pull-right' variant="outline-primary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={buttonCtrl}>Create</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CreateReport;