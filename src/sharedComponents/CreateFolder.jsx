import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal } from 'react-bootstrap';
import { connect, useSelector, useDispatch } from 'react-redux';
import { BiArrowBack, BiSolidFolder } from "react-icons/bi";
import {toast } from 'react-toastify';

function CreateFolder({ folderCreate, setFolderCreate }) {

    const data = useSelector((state) => {
        return state
    });

    const handleClose = () => setFolderCreate(false);

    const [formState, setFormState] = useState([]);
    const [folderColor, setfolderColor] = useState("");
    const [folderName, setfolderName] = useState("");

    const [colorList, setColorList] = useState([
        "#34AA44",
        "#009DE1",
        "#F6AB2F",
        "#E6492D",
        "#800080",
        "#00FFFF",
        "#0000FF",
        "#800000",
        "#808080",
        "#F0E68C"
    ])

    const selectFolderColor = (item) => {
        setfolderColor(item);
    }

    const successMesg = () => toast.success("Folder Created Successfully", {
        position: "top-right",
        theme: "light"
    });

    const errorMesg = () => toast.error("please enter folder name and select color", {
        position: "top-right",
        theme: "light"
    });

    const CreateFolder = () => {
        if (!folderName || !folderColor) {
            errorMesg();
        } else {
            const newFolder = {
                folderName: folderName,
                folderColor: folderColor
            };
            setFormState([...formState, newFolder]);
            successMesg();
            setfolderName('');
            setfolderColor('');
        }
    }

    return (
        <div>
            <Modal
                show={folderCreate}
                onHide={() => setFolderCreate(false)}
                dialogClassName="modal-90w"
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create a folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col md={12}>
                                <Form.Label>Folder Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='folderName'
                                    value={folderName}
                                    onChange={e => setfolderName(e.target.value)}
                                />
                            </Col>
                            <Col md={12}>
                                <Form.Label className='mt-3'>Folder Color</Form.Label>
                                {colorList?.map((item, index) => {
                                    return (
                                        <div key={index.toString()}>
                                            <a onClick={() => selectFolderColor(item)}
                                                className='selectFolderColor'
                                                style={{ backgroundColor: item }}></a>
                                        </div>
                                    )
                                })}
                            </Col>
                            <Col md={12}>

                            </Col>
                        </Row>
                        <ul className='colorList'>
                            {formState.length == 0 ? null : formState.map((item, index) => {
                                return (
                                    <li key={index.toString()}>
                                        <p>{item.folderName[0]}</p>
                                        <BiSolidFolder color={item.folderColor} size={20} />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='pull-right' variant="outline-primary" onClick={handleClose}>Cancel</Button>
                    <Button onClick={CreateFolder} variant="primary">Create</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CreateFolder;