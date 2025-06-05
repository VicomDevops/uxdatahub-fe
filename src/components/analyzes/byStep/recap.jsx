import React from 'react';
import { Col, Row, Label, Progress } from 'reactstrap';
import First from '../../../assets/first.svg'
import second from '../../../assets/second.svg'
import third from '../../../assets/third.svg'
import './stepAnalyzes.css'
import StepChips from './StepChips';


const RecapForm = ({ score, duration, dataAv,labelsAv }) => {
    
    const progressValue = (parseFloat(score) + 1) / 2; 

    return (
        <>
            <div style={{ padding: "0 2em" }}>
                <Row className='mb-3'>
                    <Col md='2'>
                        <img src={score > 0.5 ? First : score < 0 ? third : second} alt="Rank" />
                    </Col>
                    <Col className='score_resume_cotainer'>
                        <div>
                            <span>Score  </span>
                        </div>
                        <div className='resume_score'>
                            <div className='resume_progressBar'>
                                {
                                    score >= 0 ?
                                    <Progress className='progress_bar' color="success" value={progressValue * 100}> {parseFloat(score)}</Progress>
                                    :
                                    <Progress className='progress_bar' color="danger" value={progressValue * 100}> {parseFloat(score)}</Progress>
                                }
                            </div>
                            <div className='score_born'>
                                <div className='progress__label'>-1</div>
                                <div className='progress__label'>1</div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Label className='label_top'>TOP</Label>
                        <div className='result_container_recap'>
                            <StepChips labels={labelsAv[labelsAv.length - 1]} data={dataAv && dataAv[dataAv.length - 1]} labelClassName='label__etape' classNameContainer="etape_result_top-flop-recap" />
                            {
                                dataAv && dataAv?.length >= 6 &&
                                <>
                                    <StepChips labels={labelsAv[labelsAv.length - 2]} data={dataAv && dataAv[dataAv.length - 2]} labelClassName='label__etape' classNameContainer="etape_result_top-flop-recap" />
                                    <StepChips labels={labelsAv[labelsAv.length - 3]} data={dataAv && dataAv[dataAv.length - 3]} labelClassName='label__etape'  classNameContainer="etape_result_top-flop-recap"/>
                                </>
                            }
                        </div>
                    </Col>
                    <Col>
                        <Label className='label_top2' style={{ margin: '0 auto !important' }}>FLOP</Label>
                        <div className='result_container_recap'>
                            <StepChips labels={labelsAv[0]} data={dataAv[0]} labelClassName='label__etape' classNameContainer="etape_result_top-flop-recap"/>
                            {
                                dataAv && dataAv?.length >= 6 &&
                                <>
                                    <StepChips labels={labelsAv[1]} data={dataAv[1]} labelClassName='label__etape' classNameContainer="etape_result_top-flop-recap"/>
                                    <StepChips labels={labelsAv[2]} data={dataAv[2]} labelClassName='label__etape' classNameContainer="etape_result_top-flop-recap"/>
                                </>
                            }

                        </div>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col>
                        <Label className='mr-2' >Durée moyenne d'un test  </Label>
                        <Label > 
                            <span className='gras'>
                                {`${Math.floor(duration / 60) > 0 ? Math.floor(duration / 60) + 'min :' : ''} ${Math.floor(duration) % 60} sec`}
                            </span>
                        </Label>
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default RecapForm

