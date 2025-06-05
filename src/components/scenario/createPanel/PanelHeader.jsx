/**
 * ReactJs imports
 */
import React from 'react'

/**
 * reactstrap import
 */
import { Row, Button, Label } from "reactstrap"
import {  AvField } from 'availity-reactstrap-validation';


const PanelHeader = ({ scenarios, panelName, onChangePanelName, onToggleTesterModal }) => {
    
    /*CONSTANT */
    const scenariosLength = scenarios?.length;


    /* RENDER */
    return (
        <>
            <Row className='row__panel__form'>
                <Label className='label__form__testeur'>Visualiser les scénarios</Label>
                <div>
                    {
                        scenariosLength === 1 ?
                            scenarios?.map((scenario) => 
                                <span key={scenario.id}>
                                    {`${scenario.title }`}
                                </span>
                            )
                        :
                            <AvField 
                                type="select"
                                name="scenarioName" 
                                className="select__form-client"
                                style={{ width: '20vw' }}>
                                    {
                                        scenarios?.map((scenario) => 
                                            <option key={scenario.id} value={scenario.id}>{scenario.title}</option>
                                        )
                                    }
                            </AvField>
                    }
                </div>
            </Row>
            <Row className='row__form'>                 
                <Label className='label__form__testeur'>Veuillez sélectionner votre panel</Label>
                <AvField 
                    type="text" 
                    name="name" 
                    className="select__form__panel" 
                    style={{ width: '40vw' }}
                    onChange={onChangePanelName}
                    validate={{
                        required: { value: true, errorMessage: "Ce champ est obligatoire" },
                    }}
                    value={panelName}
                />
                <Button className='add-testeur' onClick={() => onToggleTesterModal()}> Ajouter un testeur </Button>
            </Row>
        </>
    )
}

export default PanelHeader;
