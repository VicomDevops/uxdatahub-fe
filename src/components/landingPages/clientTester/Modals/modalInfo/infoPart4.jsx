/**
 * React import
 */
import React from 'react';

/**
 * Components import
 */
import Pc from '../../../../../assets/pc.svg'
import Mobile from '../../../../../assets/mobile.svg'
import Tablette from '../../../../../assets/tablette.svg'

/**
 * Libraries import
 */
import { Button, Row, Col, Input } from 'reactstrap';


/**
 * Renders the support and operating system UI, allowing users to select their OS for different devices, and submit the selection. Displays error messages if present.
 *
 * @param {function} handleSubmit - Function to handle form submission
 * @param {array} os - Array of operating systems for mobile and tablet devices
 * @param {array} osPc - Array of operating systems for personal computers
 * @param {function} onChangeOs - Function to handle OS change event
 * @param {string} error - Error message to be displayed
 * @return {JSX.Element} The rendered UI for support and operating system selection
 */
const InfoPart4 = ({ handleSubmit, os, osPc, onChangeOs, error }) => {
    /* RENDER */
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '0 20px' }}>
                <span className="title_s_style" style={{ fontSize: '18px' }}>Support & Système d’exploitation </span>
                <Row style={{ marginTop: '1rem', alignItems: "center" }}>
                    <Col md='2' style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                        <img src={Pc} alt="InsightData" />
                        <span style={{ fontSize: "12px", fontFamily: "sans-serif", fontWeight: '500' }}>Ordinateur</span>
                    </Col>
                    <Col>
                        <Input type="select" id='age' name="os" onChange={onChangeOs}
                        >
                            <option >Veuillez selectionner votre OS</option>
                            {
                                osPc.map((res, id) =>
                                    <option key={id} value={res} >{res}</option>
                                )
                            }
                        </Input>
                    </Col>
                </Row>
                <Row style={{ marginTop: '1rem' }}>
                    <Col md='2' style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                        <img src={Mobile} alt="insightData" />
                        <span style={{ fontSize: "12px", fontFamily: "sans-serif", fontWeight: '500' }}>Téléphone</span>

                    </Col>
                    <Col>
                        <Input type="select" id='age' name="osMobile" onChange={onChangeOs}
                        >
                            <option >Veuillez selectionner votre OS</option>
                            {
                                os.map((res, id) =>
                                    <option key={id}>{res}</option>
                                )
                            }
                        </Input>
                    </Col>
                </Row>
                <Row style={{ marginTop: '1rem' }}>
                    <Col md='2' style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                        <img  src={Tablette} alt="insightData" />
                        <span style={{ fontSize: "12px", fontFamily: "sans-serif", fontWeight: '500' }}>Tablette</span>
                    </Col>
                    <Col>
                        <Input type="select"  id='age' name='osTablet'onChange={onChangeOs}>
                            <option>Veuillez selectionner votre OS</option>
                            {
                                os.map((res, id) =>
                                    <option key={id}>{res}</option>
                                )
                            }
                        </Input>
                    </Col>
                </Row>
            </div>
            {
                error && 
                    <Row className='row___sc' style={{ marginTop: '1em' }} >
                        <span className='error'>{error}</span>
                    </Row>
            }
            <Row className='row___sc' style={{ marginTop: '1em' }} >
                <Button className='info__button' onClick={handleSubmit}> Submit </Button>
            </Row>
        </>
    )
}
export default InfoPart4;

