import React from 'react'
import { Row, Col, Button, Input, Label, ButtonGroup } from 'reactstrap'
import TextField from '@material-ui/core/TextField';
import Delete from '../../../assets/insightdata_supprimer.svg'
import Edit from '../../../assets/insightdata_modifier.svg'
const StepContainerAdmin = (props) => {
    const { type, etape, edit, drop, inputs, add, substruct, btns, addStep, visualise, duplicate, step, onchange, onChangeQuestion, onChangeUrl, onChangeInstruction } = props
    return (
        <div >
            <Row>
                <span>Etape {etape}</span>
            </Row>
            <Row style={{ marginBottom: "1rem" }}>
                <TextField id="url__input" label="Url" name='url' value={step.url} onChange={onchange} />
            </Row>
            <Row>
                {type === "open" && <div className='step__ctn'>
                    <Col md='3'>
                        <Label>Question</Label>
                        <br />
                        <br />
                        <Label>Réponse</Label>
                    </Col>
                    <Col md='8'>

                        <Input
                            placeholder='Saisissez votre question'
                            // value={step.question}
                            type="text"
                            //   onChange={onchange}
                            name="question"
                            id="quest__open"
                        />
                        <br />
                        <Input
                            placeholder=''
                            type="text"
                            name="response"
                            id="res__open"
                            disabled
                        />
                    </Col>
                    <Row style={{ margin: '-7em -2em 0 0' }}>
                        <img className='btn__edit' src={Edit} alt="" clickable />
                        <img className='btn__delete' src={Delete} alt="" clickable />
                    </Row>
                </div>}
                {type === "close" && <div className='step__ctn'>
                    <Col md='3' style={{ marginTop: '-7em' }}>

                        <Label>Question</Label>
                        <br />
                        <br />
                        <Label>Réponse</Label>
                    </Col>
                    <Col md='8'>

                        <div style={{ flexDirection: 'row', display: 'flex' }}>
                            <Input
                                placeholder='Saisissez votre question'
                                //    value={step.question}
                                type="text"
                                //    onChange={onchange}
                                name="question"
                                id="question"
                            />
                        </div>
                        <div style={{ flexDirection: 'row', display: 'flex', marginTop: '2em' }}>
                            <Label >
                                <Input type="radio" disabled />
                                reponse 1
                            </Label>
                            <Input
                                // style={{ width: '10em' }}
                                placeholder=''
                                //value=''
                                type="text"
                                // onChange={this.onchangel}
                                name="username"
                                id=""
                            />
                            <label className="custom-file-upload">
                                <input type="file" multiple />
                                <i className="fa fa-cloud-upload" style={{color:'#00a359'}}/> 
        </label>
                        </div>
                        <div style={{ flexDirection: 'row', display: 'flex' }}>
                            <Label >
                                <Input type="radio" disabled />
                                reponse 2
                            </Label>
                            <Input
                                // style={{ width: '10em' }}
                                placeholder=''
                                //value=''
                                type="text"
                                // onChange={this.onchange}
                                name="username"
                                id=""
                            />
                            <label className="custom-file-upload">
                                <input type="file" multiple />
                                <i className="fa fa-cloud-upload" style={{color:'#00a359'}}/> 
        </label>
                        </div>
                        {inputs.map((input, index) =>
                            <div style={{ flexDirection: 'row', display: 'flex' }}>
                                <Label >
                                    <Input type="radio" />
                                     reponse {index + 3}
                                </Label>
                                <Input
                                    // style={{ width: '10em' }}
                                    placeholder=''
                                    //value=''
                                    type="text"
                                    // onChange={this.onchange}
                                    name="username"
                                    id=""
                                />
                                <label className="custom-file-upload">
                                    <input type="file" multiple />
                                    <i className="fa fa-cloud-upload" style={{color:'#00a359'}}/>
        </label>
                            </div>)}
                        <div style={{ flexDirection: 'row', display: 'flex', marginLeft: '20em' }}>
                            <Button className='btn__scale mr-4' outline color='success' onClick={() => substruct()} >-</Button>
                            <Button className='btn__scale' outline color='success' onClick={() => add()} >+</Button>
                        </div>
                    </Col>
                    <Row style={{ margin: '-13.5em -2em 0 0' }}>
                        <img className='btn__edit' src={Edit} alt="" />
                        <img className='btn__delete' src={Delete} alt="" />
                    </Row>
                </div>}
                {type === "scale" && <div className='step__ctn'>
                    <Col md='3'>
                        <Label>Question</Label>
                        <br />
                        <br />
                        <Label>Réponse</Label>
                    </Col>
                    <Col md='8'>
                        <Input
                            placeholder='Saisissez votre question'
                            //     value={step.question}
                            type="text"
                            //  onChange={onchange}
                            name="question"
                            id=""
                        />
                        <br />
                        <ButtonGroup style={{ width: '100%' }}>
                            {btns.map((obj) => <Button className='btn__scale' style={{ backgroundColor: `white`, borderColor: '#00a359', color: '#002C3F' }}>{obj.btn}</Button>)}
                        </ButtonGroup>
                        <br />
                        <Row>
                            <Col style={{ textAlign: 'start' }}>
                                <i className="fa fa-thumbs-down" style={{ color: 'red' }}></i>
                                <Label className='ml-2'>Mauvais</Label>
                            </Col>
                            <Col style={{ textAlign: 'end' }}>
                                <Label className='mr-2'>Bon</Label>
                                <i className="fa fa-thumbs-up" style={{ color: 'green' }}></i>
                            </Col>
                        </Row>
                    </Col>
                    <Row style={{ margin: '-8em -2em 0 0' }}>
                        <img className='btn__edit' src={Edit} alt="" />
                        <img className='btn__delete' src={Delete} alt="" />
                    </Row>
                </div>}
            </Row>
            <Row>
                <Col>
                    <Button className='toolBox__button' onClick={() => duplicate()}>Dupliquer</Button>
                </Col>
                <Col>
                    <Button className='toolBox__button' onClick={() => visualise(etape)}>Visualiser</Button>
                </Col>
                <Col>
                    <Button className='toolBox__button' onClick={() => addStep(type)}>Ajouter l'étape</Button>
                </Col>
            </Row>
        </div>
    )
}
export default StepContainerAdmin;