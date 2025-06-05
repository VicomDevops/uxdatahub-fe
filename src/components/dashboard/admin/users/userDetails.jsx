import React from 'react';
import papier from "../../../../assets/papier.svg";
import { AvForm, AvGroup } from 'availity-reactstrap-validation';
import { Input, Label, FormGroup, Button } from "reactstrap";
import ShowMore from "../../../../assets/insightdata_consulter.svg"
import Table from '../../../common/table/table';

const UserDetails = ({data, actionTogole, actionSection, activate, validate, factureList}) => {


    const columnsPrelevement = [
        { title: "Date", field: 'createdAt' },
        { title: "Nom", field: 'lastname' },
        { title: "Prémon", field: 'name' },
        { title: "Licence", field: 'licence' },
        { title: "Format", field: 'format' },
        { title: "Somme", field: 'Somme' }
    ]

    const actionsPrelevement = [{
        icon: () => <img style={{ width: "30px" }} src={ShowMore} alt="" />,
        tooltip: 'Détails',
    },
    ]

    let annee = [];
    for (let i = 2022; i >= 2013; i--) {
        annee.push(i);
    }
    return (
        <>
            <div className='display__flex__row-compte_admin'>
                <div>
                    <div className='admin_header'>
                        <span className={actionSection ? "admin_popup_titleA cursor" : "admin_popup_titleP cursor"} onClick={actionTogole}>Action</span>
                        <span className={!actionSection ? "admin_popup_titleA cursor" : "admin_popup_titleP cursor"} onClick={actionTogole}>Prélèvement et Paiement</span>
                    </div>
                    {
                        actionSection ?
                            <AvForm className="mt-2">
                                <div className='row_form_admin'>
                                    <div>
                                        <AvGroup className="column-left_client">
                                            <Label className="label_input_client">Prénom</Label>
                                            <Input type="text" name="firstname" id="firstname" className="landing_input_admin" value={data.name} readOnly />
                                        </AvGroup>
                                    </div>
                                    <div>
                                        <AvGroup className="column-left_client">
                                            <Label className="label_input_client">Nom</Label>
                                            <Input type="text" name="lastname" id="lastname" className="landing_input_admin" value={data.lastname} readOnly />
                                        </AvGroup>
                                    </div>
                                </div>
                                <div className='row_form_admin'>
                                    <div>
                                        <FormGroup className="column-left_client">
                                            <Label className="label_input_client">Email</Label>
                                            <Input type="text" name="Email" id="Email" className="landing_input_admin" value={data.email} readOnly />
                                        </FormGroup>
                                    </div>
                                    <div>
                                        <FormGroup className="column-left_client">
                                            <Label className="label_input_client">Téléphone</Label>
                                            <Input type="text" name="Téléphone" id="Téléphone" className="landing_input_admin" value={data.phone} readOnly />

                                        </FormGroup>
                                    </div>
                                </div>
                                <div className='row_form_admin'>
                                    <div>
                                        <FormGroup className="column-left_client">
                                            <Label className="label_input_client">Société</Label>
                                            <Input type="text" name="Société" id="Société" className="landing_input_admin" value={data.company} readOnly />

                                        </FormGroup>
                                    </div>
                                    <div>
                                        <FormGroup className="column-left_client">
                                            <Label className="label_input_client">Ville</Label>
                                            <Input type="text" name="Ville" id="Ville" className="landing_input_admin" value={data.ville} readOnly />
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className='row_form_admin_btn'>
                                    <Button className="acc_eester__button" onClick={() => validate(data.id)}>Valider testeur </Button>
                                </div>

                            </AvForm>
                            :
                            <div className='adminRenderTable'>
                                <Table className="table_admin"
                                    columns={columnsPrelevement}
                                    //data={data}
                                    actions={actionsPrelevement}
                                />
                            </div>
                    }
                </div>
                {
                    actionSection &&
                    <div className='admin_footer'>
                        <div className="iban_facture_admin">
                            <div className="iban_contrat_title">
                                Factures
                                <span className="iban_facture_annee">
                                    <select className="iban_facture_annee_select">
                                        <option defaultValue="All" selected>Année</option>
                                        {
                                            annee.map((item, index) => {
                                                return (
                                                    <option key={index} value={item}>{item}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </span>
                            </div>
                            {
                                factureList > 0 ?
                                    <div className="iban_facture_section_client">
                                        {
                                            factureList.map((item, index) => {
                                                return (
                                                    <div className="iban_facture_content_client" key={index}>
                                                        <span className="iban_facture_date"> {item} </span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <div className='iban_facture_section_client_vide mt-4'>
                                        Vous n'avez pas encore de facture
                                    </div>
                            }
                        </div>
                        <div className="iban_contrat_client">
                            <div className="iban_contrat_title"> Contrat </div>
                            <div className="iban_section_client">
                                <div className="iban_contrat_content_client">
                                    <img src={papier} alt="iban_papier_client" className="iban_img" />
                                </div>
                                <div className='iban_text_section'>
                                    <div><span className="iban_text_admin" > Télécharger le contrat </span></div>
                                    <div><span className="iban_text_admin" > Supprimer le contrat </span></div>
                                </div>
                            </div>
                            <div className="iban_section_client mt-2">
                                <div className="iban_contrat_content_client">
                                    <img src={papier} alt="iban_papier" className="iban_img" />
                                </div>
                                <div className='iban_text_section'>
                                    <div><span className="iban_text_admin" > Télécharger le mandat </span></div>
                                    <span className="iban_text_admin mt-1" > Supprimer le mandat </span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>








            {/* <span style={{ fontWeight: "600" }}> Données personelles</span>
                       {role==="ROLE_CLIENT"&& <div>
                            <li key="1"><Label style={{ fontWeight: "500", color: "#00a359" }}>Date:</Label> {data.createdAt}</li>
                            <li key="2"><Label style={{ fontWeight: "500", color: "#00a359" }}>Nom:</Label>  {data.lastname}</li>
                            <li key="3"><Label style={{ fontWeight: "500", color: "#00a359" }}>Prémon:</Label> {data.name}</li>
                            <li key="4"><Label style={{ fontWeight: "500", color: "#00a359" }}>Société:</Label> {data.company}</li>
                            <li key="5"><Label style={{ fontWeight: "500", color: "#00a359" }}>Téléphone:</Label> {data.phone}</li>
                            <li key="6"><Label style={{ fontWeight: "500", color: "#00a359" }}>Mail:</Label> {data.email}</li>
                            <li key="7"><Label style={{ fontWeight: "500", color: "#00a359" }}>Cas d'utilisation:</Label> {data.useCase}</li>
                        </div>}
                       {role==="ROLE_TESTER"&& <div>
                            <li key="1"><Label style={{ fontWeight: "500", color: "#00a359" }}>Date:</Label> {data.createdAt}</li>
                            <li key="2"><Label style={{ fontWeight: "500", color: "#00a359" }}>Nom:</Label>  {data.lastname}</li>
                            <li key="3"><Label style={{ fontWeight: "500", color: "#00a359" }}>Prémon:</Label> {data.name}</li>
                            <li key="4"><Label style={{ fontWeight: "500", color: "#00a359" }}>Téléphone:</Label> {data.phone}</li>
                            <li key="5"><Label style={{ fontWeight: "500", color: "#00a359" }}>Mail:</Label> {data.email}</li>
                        </div>} */}
            {/* <Col sm='12' md='6'>
                        <span style={{ fontWeight: "600" }}>Etat</span>
                        <div>
                            <span style={{ fontWeight: "500", color: 'red' }}>{data.state === "to_contact" ? "A contacter" : "Ok"}</span>
                        </div>
                    </Col> */}
            {/* <Row>
                    <Col sm='12' md='6'>
                        <span style={{ fontWeight: "600" }}> Commentaire</span>
                    </Col>
                    {role==="ROLE_CLIENT"&&<Col sm='12' md='6'>
                        <span style={{ fontWeight: "600" }}> Durée demo restante</span>
                        <div>
                            <span style={{ fontWeight: "500", color: 'red' }}></span>
                        </div>
                    </Col>}
                </Row>
                {
                    role==="ROLE_CLIENT"&&
                    <div className='modal__btns' >
                        <Button className="signup__button" onClick={activate}> Accorder Acces</Button>
                        <Button className="signup__button " style={{ margin: "0 9em" }} onClick={generatePW} disabled={data.state === "to_contact"}>Générer Mot de Passe </Button>
                        <Button className="signup__button" onClick={desactivate} disabled={data.state === "to_contact"}> Desactiver</Button>
                    </div>
                }
                {
                    role==="ROLE_TESTER"&&
                    <div className='modal__btns' >
                        <Button className="signup__button "  onClick={()=>validate()}>Valider testeur </Button>
                        <Button className="signup__button " style={{ margin: "0 8em" }} onClick={visualiser}>Visualiser le test d’admission </Button>
                        <Button className="signup__button" onClick={desactivateTester} disabled={data.state === "to_contact"}> Desactiver</Button>
                    </div>
                }  */}
        </>
    )
}
export default UserDetails

