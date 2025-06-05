/**
 * React import
 */
import React, { useState } from 'react';

/**
 * Reactstrap import
 */
import { Button, Row } from 'reactstrap';


const InfoPart2 = ({ handleSubmit, onChangeCsp, error }) => {

    /* HOOKS */
    const [cspToggle, setCspToggle] = useState("");

    /* RENDER */
    return (
        <>
            <span className="title_s_style" style={{ padding: "0 3em", fontSize: '18px' }}> Vous appartenez à quelle catégorie socio-professionnelle ? </span>
            <div className='list__containe'>
                <div onClick={() => onChangeCsp("Agriculteurs exploitants")}>
                    <div 
                        onClick={() => setCspToggle("csp1")} 
                        className={`selectable__item${(cspToggle === 'csp1') ? '__selected' : ''}`} 
                    >
                        Agriculteurs exploitants
                    </div>
                </div>
                <div onClick={() => onChangeCsp("Artisans, commerçants et chefs d’entreprise")}>
                    <div    
                        onClick={() => setCspToggle("csp2")}
                        className={`selectable__item${(cspToggle === 'csp2') ? '__selected' : ''}`} 
                    >
                        Artisans, commerçants et chefs d’entreprise
                    </div>
                </div>
                <div onClick={() => onChangeCsp("Cadres et profession intellectuelles supérieures")}> 
                    <div 
                        onClick={() => setCspToggle("csp3")}
                        className={`selectable__item${(cspToggle === 'csp3') ? '__selected' : ''}`} 
                    >
                        Cadres et professions intellectuelles supérieures
                    </div>
                </div>
                <div onClick={() => onChangeCsp("Professions intermédiaires")}>
                    <div 
                        onClick={() => setCspToggle("csp4")}
                        className={`selectable__item${(cspToggle === 'csp4') ? '__selected' : ''}`} 
                    >
                        Professions Intermédiaires
                    </div>
                </div>
                <div onClick={() => onChangeCsp("Employés")}>
                    <div 
                        onClick={() => setCspToggle("csp5")}
                        className={`selectable__item${(cspToggle === 'csp5') ? '__selected' : ''}`} 
                    >
                    Employés
                </div></div>
                <div onClick={() => onChangeCsp("Ouvriers")}>
                    <div 
                        onClick={() => setCspToggle("csp6")}
                        className={`selectable__item${(cspToggle === 'csp6') ? '__selected' : ''}`} 
                    >
                        Ouvriers
                    </div>
                </div>
                <div onClick={() => onChangeCsp("Autre")}> 
                    <div 
                        onClick={() => setCspToggle("csp7")}
                        className={`selectable__item${(cspToggle === 'csp7') ? '__selected' : ''}`} 
                    >
                        Autre
                    </div>
                </div>
            </div>
            {
                error && 
                    <Row className='row___sc' style={{ marginTop: '1em' }} >
                        <span className='error'>{error}</span>
                    </Row>
            }
            <Row className='row___sc' >
                <Button className='info__button' onClick={handleSubmit}> Continuer</Button>
            </Row>
        </>
    )
}
export default InfoPart2

