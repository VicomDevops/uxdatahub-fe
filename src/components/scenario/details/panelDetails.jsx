import React from 'react';
import {
    Button, Label, Col, Row
} from 'reactstrap';


const PanelDetails = ({
    data
}) => {
    return (
        <React.Fragment style={{ direction: 'flex', flexDirection: 'row' }}>
            <div className='modal__form'>
                <Row>
                    <Col sm='12' md='12'>
                        <span style={{ fontWeight: "600" }}> Données personelles</span>
                       <div>
                            <li><Label style={{ fontWeight: "500", color: "#00a359" }}>Nom:</Label> {data.createdAt}</li>
                            <li><Label style={{ fontWeight: "500", color: "#00a359" }}>Nom:</Label>  {data.lastname}</li>
                            <li><Label style={{ fontWeight: "500", color: "#00a359" }}>Prémon:</Label> {data.name}</li>
                            <li><Label style={{ fontWeight: "500", color: "#00a359" }}>Société:</Label> {data.company}</li>
                        </div>
                    </Col>
                </Row>
            </div>
        </React.Fragment >)
}
export default PanelDetails