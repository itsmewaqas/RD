import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal } from 'react-bootstrap';
import { connect, useSelector, useDispatch } from 'react-redux';
import validateInfo from '../utilities/validation';
import { toast } from 'react-toastify';

function SaveReportModal({ saveReport, setSaveReport }) {

    const data = useSelector((state) => {
        return state
    });

    const initalState = {
        name: '',
        description: '',
        folderName: '',
        reportType: '',
    };

    const handleClose = () => setSaveReport(false);
    const [values, setValues] = useState(initalState);
    const [errors, setErrors] = useState({});
    const [getData, setGetData] = useState({});
    console.log(getData)

    const handleChnage = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const successMesg = () => toast.success("Report Save Successfully", {
        position: "top-right",
        theme: "light"
    });

    const SaveReport = () => {
        setErrors(validateInfo({ values }));
        if (values.name != '' &&
            values.description != '' &&
            values.folderName != '' &&
            values.reportType != '') {
            if (values) {
                const data = {
                    name: values.name,
                    description: values.description,
                    folderName: values.folderName,
                    reportType: values.reportType,
                }
                setGetData(data);
                setTimeout(() => {
                    successMesg();
                    setSaveReport(false);
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
                show={saveReport}
                onHide={() => setSaveReport(false)}
                dialogClassName="modal-90w"
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Save a Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col md={12}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    name='name'
                                    type="text"
                                    value={values.name}
                                    onChange={handleChnage}
                                />
                                {errors.name && <p className='error'>{errors.name}</p>}
                            </Col>
                            <Col md={12}>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    name='description'
                                    type="text"
                                    value={values.description}
                                    onChange={handleChnage}
                                />
                                {errors.description && <p className='error'>{errors.description}</p>}
                            </Col>
                            <Col md={7}>
                                <Form.Label className='mt-3'>Folder Name</Form.Label>
                                <Form.Control
                                    name='folderName'
                                    type="text"
                                    value={values.folderName}
                                    onChange={handleChnage}
                                />
                                {errors.folderName && <p className='error'>{errors.folderName}</p>}
                            </Col>
                            <Col md={5}>
                                <Form.Label className='mt-3'>&nbsp;</Form.Label>
                                <Form.Select name="reportType" value={values.reportType} onChange={handleChnage}>
                                    <option hidden selected>Select Report Type</option>
                                    <option value="PDF">PDF</option>
                                    <option value="Excel">Excel</option>
                                    <option value="Jpg">Jpg</option>
                                </Form.Select>
                                {errors.reportType && <p className='error'>{errors.reportType}</p>}
                            </Col>
                        </Row>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='pull-right' variant="outline-primary" onClick={() => handleClose()}>Cancel</Button>
                    <Button onClick={() => SaveReport()} variant="primary">Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default SaveReportModal;