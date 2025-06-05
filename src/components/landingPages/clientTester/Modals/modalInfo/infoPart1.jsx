/**
 * React import
 */
import React, { useState } from 'react';

/**
 * Components import
 */
import { Col, Button, Row } from 'reactstrap';
import Femme from '../../../../../assets/femme.svg'
import Homme from '../../../../../assets/homme.svg'


/**
 * Renders the InfoPart1 component including the gender selection and error handling.
 *
 * @param {function} onChangeGender - The function to handle gender change
 * @param {function} handleSubmit - The function to handle form submission
 * @param {string} error - The error message to display
 * @return {JSX.Element} The rendered JSX element
 */
const InfoPart1 = ({ onChangeGender, handleSubmit, error }) => {

    /* HOOKS */
    const [gendertoggle, setGenderToggle] = useState("");

    /* RENDER */
    return (
        <>
            <div className="title_s">
                <span className="title_s_style">Vous êtes ? </span>
            </div>
            <div className='row__create_pt ' style={{ height: '10em' }} >
                <Col style={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <div className='row__imgs' >
                        <div className='container__img2' style={{ width: "7em", height: '7em' }} onClick={() => onChangeGender("Femme")}>
                            <div onClick={() => setGenderToggle("femme")} className={`image_r2${(gendertoggle === "femme") ? '_selected' : ''}`} style={{ width: "7em", height: '7em' }}>
                                <img style={{ width: "6em", height: "5em" }} src={Femme} alt="" />
                                <span className='type_panel'>Femme</span>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className='row__imgs' >
                        <div className='container__img2' style={{ width: "7em", height: '7em' }} onClick={() => onChangeGender("Homme")}>
                            <div onClick={() => setGenderToggle("homme")} className={`image_r2${(gendertoggle === "homme") ? '_selected' : ''}`} style={{ width: "7em", height: '7em' }}>
                                <img style={{ width: "6em", height: "5em" }} src={Homme} alt="" />
                                <span className='type_panel'>Homme</span>
                            </div>
                        </div>
                    </div>
                </Col>
            </div>
            {
                error && 
                    <Row className='row___sc' style={{ marginTop: '1em' }} >
                        <span className='error'>{error}</span>
                    </Row>
            }
            <Row className='row___sc' >
                <Button className='info__button' onClick={handleSubmit}> Continuer </Button>
            </Row>
        </>
    )
}
export default InfoPart1

