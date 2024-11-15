import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal } from 'react-bootstrap';
import { connect, useSelector, useDispatch } from 'react-redux';
import validateInfo from '../utilities/validation';
import { toast } from 'react-toastify';

function ExportReportModal({ exportReport, setExportReport }) {

    const data = useSelector((state) => {
        return state
    });

    const initalState = {
        reportType: '',
        format: '',
        encoding: '',
    };

    const handleClose = () => setExportReport(false);
    const [values, setValues] = useState(initalState);
    const [errors, setErrors] = useState({});
    const [getData, setGetData] = useState({});
    const [active, setactive] = useState();

    console.log(getData);

    const [exportTypeList, setExportTypeList] = useState([
        {
            id: 1,
            title: 'Portable Document Format',
            icon: require('../assets/images/pdf.png'),

        },
        {
            id: 2,
            title: 'Excel Spreadsheet',
            icon: require('../assets/images/xls.png'),

        },
        {
            id: 3,
            title: 'Includes Details Only',
            icon: require('../assets/images/sheet.png'),

        },
    ]);

    const handleChnage = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const selectData = (item) => {
        setactive(item.id);
        console.log(item);
    }

    const successMesg = () => toast.success("Report Export Successfully", {
        position: "top-right",
        theme: "light"
    });

    const ReportExport = () => {
        setErrors(validateInfo({ values }));
        if (values.reportType != '' &&
            values.format != '' &&
            values.encoding != '') {
            if (values) {
                const data = {
                    reportType: values.reportType,
                    format: values.format,
                    encoding: values.encoding,
                }
                setGetData(data);
                setTimeout(() => {
                    successMesg();
                    setExportReport(false);
                }, 100);
            }
        }
        else {
            return false
        }
    }


    return (
        <div>
            <Modal
                show={exportReport}
                onHide={() => setExportReport(false)}
                dialogClassName="modal-90w"
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Export Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col md={12}>
                                <ul className='exportTypeList'>
                                    {exportTypeList.map((item, index) => {
                                        return (
                                            <li key={index.toString()} className={active === item.id ? 'active' : ''}>
                                                <label onClick={() => selectData(item)} >
                                                    <input
                                                        type="radio"
                                                        id={item.id}
                                                        name="reportType"
                                                        value={item.title}
                                                        checked={values.reportType === item.title}
                                                        onChange={handleChnage}
                                                    />
                                                    <img src={item.icon} alt="" />
                                                    <span>{item.title}</span>
                                                </label>
                                            </li>
                                        )
                                    })}
                                </ul>
                                {errors.reportType && <p className='error'>{errors.reportType}</p>}
                            </Col>
                            <Col md={6}>
                                <Form.Label className='mt-3'>Format</Form.Label>
                                <Form.Select name="format" value={values.format} onChange={handleChnage}>
                                    <option>Select</option>
                                    <option value="PDF">PDF</option>
                                    <option value="Excel">Excel</option>
                                    <option value="Jpg">Jpg</option>
                                </Form.Select>
                                {errors.format && <p className='error'>{errors.format}</p>}
                            </Col>
                            <Col md={6}>
                                <Form.Label className='mt-3'>Encoding</Form.Label>
                                <Form.Select name="encoding" value={values.encoding} onChange={handleChnage}>
                                    <option>Select</option>
                                    <option value="visual">visual</option>
                                    <option value="acoustic">acoustic</option>
                                    <option value="elaborative">elaborative</option>
                                    <option value="semantic">semantic</option>
                                </Form.Select>
                                {errors.encoding && <p className='error'>{errors.encoding}</p>}
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='pull-right' variant="outline-primary" onClick={() => handleClose()}>Cancel</Button>
                    <Button onClick={() => ReportExport()} variant="primary">Export</Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}

export default ExportReportModal;