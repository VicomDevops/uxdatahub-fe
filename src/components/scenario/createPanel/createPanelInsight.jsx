import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Button, Label, Input } from "reactstrap"
import { AvForm, AvField } from 'availity-reactstrap-validation';
import scenarioServices from '../../../services/scenarioServices'
import { onGetPanels, onGetScenarios } from "../../../actions/scenarioActions"
import { toast } from 'react-toastify';


class CreatePanelInsight extends Component {
    state = {
        currentPanel: {
            type: 'UX DATAHUB'
        },
        validForm: true,
        idScenario: 0,
        scenarioName: "",
        checkedAge: false,
        checkedCSP: false,
        checkedOS: false,
        checkedGenre: false,
        checkedEtude: false,
        checkedPays: false,
    }

    onChange = e => {
        e.preventDefault();
        if (e.target.name === "testersNb" || e.target.name === "minAge" || e.target.name === "maxAge") {
            this.setState({ currentPanel: { ...this.state.currentPanel, [e.target.name]: parseInt(e.target.value) }, errors: { ...this.state.errors, [e.target.name]: "" }, error: {} })
        }
        else{
            this.setState({ currentPanel: { ...this.state.currentPanel, [e.target.name]: e.target.value }, errors: { ...this.state.errors, [e.target.name]: "" }, error: {} })
        }
    };

    onChangeScenario = e => {
        e.preventDefault();
        let scenarioName = ""
        this.props.scenario?.data.forEach((scenario) => {
            if(scenario.id === +e.target.value){
                scenarioName = scenario.title
            }
        })
        this.setState({ ...this.state, idScenario: +e.target.value, scenarioName: scenarioName})
    };

    submit = (event, errors, values) => {
        if (errors.length === 0) {
            const { minAge, maxAge} = this.state.currentPanel
            if (this.props?.location?.state?.title !== undefined) {
                this.setState({ currentPanel: { ...this.state.currentPanel,scenarioId : this.props.location?.state?.id ,scenarioName: this.props?.location?.state?.title }})
            }
            if(minAge !== "" || maxAge !== ""){
            if( minAge > maxAge) {
                toast.error('L\'age minimum doit être inférieur à l\'age maximum')
                this.setState({ validForm: false })
            } 
            else if(minAge < 18){
                toast.error('L\'age minimum doit être supérieur à 18 ans')
                this.setState({ validForm: false })
            }
            else if(maxAge > 80){
                toast.error('L\'age maximum doit être inférieur à 80 ans')
                this.setState({ validForm: false })
            }
            }
            
            if(this.state.validForm) {
                if(this.state.idScenario !== ""){
                    this.setState({ currentPanel: { ...this.state.currentPanel, scenarioId: this.state.idScenario }},()=>
                        scenarioServices.savePanel(this.state.currentPanel, this.state.idScenario ).then(res => {
                        toast.success('Panel ajouté avec success')
                        this.props.onGetPanels()
                        this.props.history.push('/client')
                    }).catch(err => {
                        console.log(err);
                        toast.error('le filter que vous avez choisi n\'est pas disponnible pour le moment')

                    }))
                    // this.props.onGetPanels()
                    // this.props.onGetScenarios()
                }else{
                    scenarioServices.savePanel(this.state.currentPanel, this.props.location?.state?.id).then(res => {
                        toast.success('Panel ajouté avec success')
                        this.props.onGetPanels()
                        this.props.history.push('/client')
                    }).catch(err => {
                        console.log(err);
                        toast.error('le filter que vous avez choisi n\'est pas disponnible pour le moment')
                    })
                }
            }
        }
    }


    handleChange = (e) => {
        this.setState({ ...this.state, [e.target.name]: !this.state[e.target.name] })
    }
    
    render() {
        const {
            name,
            testersNb,
            minAge, maxAge
        } = this.state.currentPanel
        const genders = ["Femme", "Homme"]
        const csp = ["Agriculteurs exploitants",
                    "Artisans", 
                    "Commerçants et chefs d’entreprise", 
                    "Cadres et professions intellectuelles supérieures",
                    "Employés", 
                    "Ouvriers",
                    "Professions Intermédiaires"
        ]
        const study = [ "Aucun diplôme", "Brevet des collèges, CAP, BEP ou autre", "Bac, Brevet professionnel",
                        "Bac +2", "Bac +3 ou 4", "Bac +5"]
        const support = ["Ordinateur", "Mobile", "Tablette"]
        // const { checkedAge, checkedCSP, checkedEtude, checkedGenre, checkedOS, checkedPays } = this.state


        return (
        <div className="paneltester__ctn" >
            <span className="title__Panel__insight mb-3 mt-2">Créer un panel de testeurs</span>
            <AvForm onSubmit={this.submit}> 
            <Row className='row_panel'>
                <Col md='12'>
                    <Row className='row__form'>
                        <Label className='label__testeur__insight'>Nom du scénario</Label>
                        {
                            this.props?.location?.state === undefined ? 
                            <AvField type="select" name="scenarioName" className="select__form" 
                                    style={{ width: '21vw' }}  
                                    onChange={this.onChangeScenario}
                                    validate={{
                                        required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                    }}
                            >
                                <option  defaultValue>Veuillez sélectionner un scénario</option>
                                {
                                    this.props.scenario?.data.map((scenario) => 
                                    scenario.etat === 1 &&
                                    <option key={scenario.id} value={scenario.id}>{scenario.title}</option>)
                                }
                            </AvField> 
                            :
                            <Input type="select" name="scenarioName" className='select__form' style={{ width: '21vw' }} disabled>
                                <option key={this.props.location?.state?.id} value={this.props.location?.state?.id}>{this.props.location?.state?.title}</option>
                            </Input>
                            
                        }
                    </Row>
                </Col>
            </Row>
            <Row className='row__form espace_insight'>
                <Label className='label__testeur__insight'>Donner un nom au panel</Label>
                <AvField className="nom_panel_testeur-insight" value={name} type="text" onChange={this.onChange} name="name"
                    validate={{
                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                    pattern: { value: "^[a-zA-Z ]{1,50}$", errorMessage: "Les caractéres speciaux ne sont pas autorisé" }
                    }}
                />  
            </Row>            
            {/* {(checkedAge || checkedCSP || checkedEtude || checkedGenre || checkedOS || checkedPays) &&  */}
            <span className="title__Panel__insight filter-insight mb-3">Filters</span>
            <Row className='row_panel'>
                <Col md='12'>
  
                    <Row className='row__form contianer_form-panel_insight'>
                        <div className='form-panel_insight'>
                            <Label className='label__form'>Support de test</Label> 
                            <AvField type="select" name="product" className="select-panel_insight"  onChange={this.onChange}>
                                <option defaultValue></option>
                                {
                                    support.map(supp => <option key={supp.id} value={supp}>{supp}</option>)
                                }
                            </AvField> 
                        </div>
                        <div className='form-panel_insight'>
                            <Label className='label__form' style={{width : "15rem"}}>Catégorie Socio Professionnelle</Label>
                            <AvField type="select" name="csp" className="input-panel_insight"  onChange={this.onChange}>
                                <option  defaultValue></option>
                                {
                                    csp.map(item => <option key={item.id} value={item}>{item}</option>)
                                }
                            </AvField> 
                        </div>
                    </Row>


                    <Row className='row__form contianer_form-panel_insight'>
                        <div className='form-panel_insight'>
                            <Label className='label__form'>Nombre de testeurs</Label>
                            <AvField type="number" value={testersNb} min="1" max="20" onChange={this.onChange} name="testersNb" className="number-panel_insight"
                                validate={{
                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                    //enter a number between 1 and 20
                                    pattern: { value: "^[1-9]", errorMessage: "Ce champ doit etre possitive" }
                                }}
                            />  
                        </div>
                        <div className='form-panel_insight'>
                            <Label className='label__form'>Niveau d'étude</Label>
                            <AvField type="select" name="studyLevel" className="select-panel_insight"  onChange={this.onChange}>
                                <option  defaultValue></option>
                                {
                                    study.map(stu => <option key={stu.id} value={stu}>{stu}</option>)
                                }
                            </AvField> 
                        </div>
                    </Row>
                    <Row className='row__form contianer_form-panel_insight'>
                        <div className='form-panel_insight'>
                            <Label className='label__form'>Genre</Label>
                            <AvField type="select" name="gender" className="select-panel_insight"  onChange={this.onChange}>
                                <option defaultValue></option>
                                {
                                    genders.map(gender => <option key={gender.id} value={gender}>{gender}</option>)
                                }
                            </AvField> 
                        </div>
                        <div className='form-panel_insight'>
                            <Label className='label__form'>Langue</Label>
                            <AvField type="text" onChange={this.onChange} name="langue" className="number-panel_insight"
                                validate={{
                                pattern: { value: "^[a-zA-Z ]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                                }}
                            />  
                        </div>
                    </Row>
                    <Row className='row__form contianer_form-panel_insight'>
                        <div className='form-panel_insight'>
                        <Label className='label__form niveau-panel_insight'>Age</Label>
                        <div className='minAndMax_contianer'>
                        <AvField type="number" value={minAge} placeholder="Min"// min="18" max="80" 
                        onChange={this.onChange} name="minAge" 
                                className="minAge"
                            validate={{
                            pattern: { value: "^[1-9]", errorMessage: "Les caractéres speciaux ne sont pas autorisé" },
                            max:{value:80,errorMessage: "Age invalid" },
                            min:{value:18,errorMessage: "Age invalid" },
                            required: { value: true, errorMessage: "Ce champ est obligatoire" },
                            }}
                        />  
                        <AvField type="number" value={maxAge} placeholder="Max" //min="18" max="80" 
                        onChange={this.onChange} name="maxAge" 
                                className="minAge"
                            validate={{
                            pattern: { value: "^[1-9]", errorMessage: "Les caractéres speciaux ne sont pas autorisé" },
                            max:{value:80,errorMessage: "Age invalid" },
                            min:{value:18,errorMessage: "Age invalid" },
                            required: { value: true, errorMessage: "Ce champ est obligatoire" },
                            }}
                        />  
                        </div>
                        </div>
                    </Row>
                    <Row className='row__create_sc_btn'>
                        <Button className='finish' style={{ width: "10em" }} > Valider </Button>
                    </Row>
                </Col>
            </Row>
        </AvForm>
        </div>);
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user,
    scenario: state.scenario,
});

export default connect(
    mapStateToProps,
    {onGetPanels, onGetScenarios}
)(CreatePanelInsight);