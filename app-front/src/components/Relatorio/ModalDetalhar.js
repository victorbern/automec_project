import React from "react";
import {Form,Col,Row,Button,Modal} from 'react-bootstrap';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
// date-fns
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// or for dayjs
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// or for luxon
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
// or for moment
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import TextField from '@mui/material/TextField';

export default function ModalDetalhar(props){
    return(
        <Modal
        show={props.state.modalDetalhar}
        onHide={props.fecharModalDetalhar}
        aria-labelledby="example-custom-modal-styling-title"
        size='lg'
        >
        <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
            Relatório
        </Modal.Title>
        </Modal.Header>

        <Form onSubmit={props.emitir}>
            <Modal.Body className="d-flex justify-content-center">
            
                <Row className="mb-3">
                    <Col xs={8} controlId="formGridDataDe">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                        label="De"
                        inputFormat="DD/MM/YYYY"
                        value={props.state.dataDe}
                        onChange={(e) => props.atualizaDataDe (e)}
                        renderInput={(params) => <TextField {...params} />}
                        
                        />
                        </LocalizationProvider>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={8} controlId="formGridDataAte">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                        label="Até"
                        inputFormat="DD/MM/YYYY"
                        value={props.state.dataAte}
                        onChange={(e) => props.atualizaDataAte (e)}
                        renderInput={(params) => <TextField {...params} />}
                        />
                        </LocalizationProvider>                    
                        </Col>
                </Row>

            </Modal.Body>

            <Modal.Footer className="footer">
                <Button type="submit" className="btnOk">Emitir</Button>
            </Modal.Footer>

        </Form>

    </Modal>
    )
}