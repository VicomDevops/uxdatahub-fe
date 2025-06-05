import React from 'react';
import { Button, Label, Row, Input } from 'reactstrap';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';


const InfoPart3 = ({ handleSubmit, onChange, onChangePhone, pays, error }) => {

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '0 20px' }}>
                <div>
                    <Label className='title_s_styles'>Date de naissance</Label>
                    <Input 
                        type="date" 
                        id="modal_input"                     
                        onChange={onChange} 
                        name='dateOfBirth'
                    />
                </div>
                <div>
                    <Label className='title_s_styles mt-4'>Téléphone</Label>
                    <PhoneInput
                        id="modal_input"
                        flags={flags}
                        onChange={onChangePhone} 
                    />
                </div>
                <div>
                    <Label className='title_s_styles mt-4'>Pays de résidence</Label>
                    <Input 
                        type="select" 
                        id="modal_input" 
                        name='country'
                        onChange={onChange}
                    >
                        <option selected>Veuillez selectionner votre pays</option>
                        {
                            pays.map((res, id) =>
                                <option key={id} value={res} >{res}</option>
                            )
                        }
                    </Input>
                </div>
                <div className='adress_inputs'>
                    <div>
                        <Label className='title_s_styles mt-4'>Ville</Label>
                        <Input 
                            type="text"
                            name='city'
                            onChange={onChange}
                            id="modal_input"  
                        >
                        
                        </Input>
                    </div>
                    <div>
                        <Label className='title_s_styles mt-4'>Code Postal</Label>
                        <Input 
                            type="text" 
                            name='postalCode'
                            onChange={onChange}
                            id="modal_input"                    
                        >
                        </Input>
                    </div>
                </div>
                <div>
                    <Label className='title_s_styles mt-4'>Adresse</Label>
                    <Input 
                        type="text" 
                        name='adresse'
                        onChange={onChange}
                        id="modal_input"                    
                    >
                    </Input>
                </div>
            </div>
            {
                error && 
                    <Row className='row___sc' style={{ marginTop: '1em' }} >
                        <span className='error'>{error}</span>
                    </Row>
            }
            <Row className='row___sc' style={{ marginTop: '1em' }} >
                <Button className='info__button' onClick={handleSubmit}> Continuer</Button>
            </Row>
        </>
    )
}
export default InfoPart3

