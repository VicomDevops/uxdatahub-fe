import React from 'react'
import { Button, Col, Row, Label, Input } from 'reactstrap'
import { Collapse } from 'react-collapse';
import CheckIcon from "../../../assets/insightdata_check.svg"
import '../scenario.css'
const ToolBox = (props) => {
    const { onScale, show, onOpen, validateScale, onClose, onchange, scaleRange, data, list } = props
    
    return (
        <div className='toolBox__ctn'>
            <Row style={{ marginTop: '2em' }}><h6 style={{ color: '#00a359' }}>Boite à outils</h6></Row>
            <Row>
                <Col>
                    <Button className='toolBox__button' disabled={data.length !== list.length||list.length===15} onClick={() => onOpen()}>Question ouverte</Button>
                </Col>
                <Col>
                    <Button className='toolBox__button' disabled={data.length !== list.length||list.length===15} onClick={() => onClose()}>Question fermée</Button>
                </Col>
                <Col>
                    <Button className='toolBox__button' disabled={data.length !== list.length||list.length===15} onClick={() => onScale()}>Echelle de notation</Button>
                </Col>
            </Row>
            <Collapse isOpened={show}>
                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '1em' }}>
                    <Label>Nbr.Min:</Label>
                    <Input
                        placeholder=''
                        value={scaleRange.minScale}
                        type="number"
                        onChange={onchange}
                        name="minScale"
                        id="scale__range"

                    />
                    <Label>Nbr.Max:</Label>
                    <Input
                        placeholder=''
                        value={scaleRange.maxScale}
                        type="number"
                        onChange={onchange}
                        name="maxScale"
                        id="scale__range"
                    />
                    <img className="validate__icon" src={CheckIcon} alt="" onClick={() => validateScale()} />
                </div>
            </Collapse>
        </div>
    )
}
export default ToolBox;