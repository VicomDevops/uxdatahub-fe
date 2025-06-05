import React from 'react'
import Modals from '../common/modals/modal'


const ModelLegal = ({ visibleLegal, handleLegal }) => {
  return (
        <Modals
            modalSize="modal-lg"
            show={visibleLegal}
            toggleShow={() => handleLegal()}
            header='Mentions Légales'
        >
        <div className="modal-body">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-text">
                                <h5>Informations générales de l’éditeur : </h5>
                                <p>
                                    Nom commercial : Insight data, appartement à la SAS 2M-ADVISORY <br />
                                    Raison sociale : 2M-ADVISORY <br />                            
                                    2M ADVISORY SAS au capital social de 100 000 Euros <br />
                                    RCS Paris 795 044 932 <br />
                                    TVA intracommunautaire : FR 62 795044932 <br />
                                    Adresse du siège social : 10 rue Jean Macé - 75011 Paris - FRANCE <br />
                                    Directeur de publication : Nicolas MARTIN de PENA <br />
                                    Adresse e-mail : nmartindepena@2M-advisory.fr <br />
                                    Téléphone : 07 87 03 20 49 <br />
                                    Insight Data est propriétaire et exploitante du site insightdata.fr <br />
                                </p>
                                <h5>Hébergement :  </h5>
                                <p>
                                    Ce site est hébergé par la SASA OVH <br />
                                    RCS 424761419 de Lille <br />
                                    2 RUE KELLERMANN <br />
                                    59100 ROUBAIX <br />
                                    France                   <br />    
                                </p>
                                <h5>Présentation  </h5>
                                <p>
                                    Insight Data est une plateforme de services ayant pour but d’optimiser les parcours utilisateurs 
                                    et de permettre ainsi une optimisation ergonomique de multiples dispositifs (desktop, mobile, produit, service).   <br />
                                    Le site web présente la solution aux différents publics (prospect, client, testeur, partenaire) de tout secteur,
                                    ayant un intérêt dans l’analyse 
                                    et l’optimisation de l’expérience utilisateur. Les espaces privées sont destinés aux clients et testeurs.  
                                </p>
                                <h5>Objectifs  </h5>
                                <p>
                                    <span style={{ marginLeft : ".2rem"}}>1.</span> Présenter aux internautes le service Insight Data ainsi que les différentes solutions qu’offre la plateforme. <br />
                                    <span style={{ marginLeft : ".2rem"}}>2.</span> Proposer différents moyens de contacts pour entrer en relation.  <br />
                                    <span style={{ marginLeft : ".2rem"}}>3.</span> Donner accès aux espaces privés (espace client, espace testeur). <br />
                                </p>
                                <h5>Mesures relatives aux cookies    </h5>
                                <p>
                                    Les pages du site Insight Data utilisent des cookies, qui sont des fichiers texte stockés dans une base de données via un navigateur.
                                    Grâce à cette utilisation, nous pouvons vous fournir une expérience plus proche de vos besoins. Vous pouvez à tout moment choisir 
                                    d’accepter ou de refuser le paramétrage des cookies via votre navigateur. Nous ne pourrons cependant pas assurer une expérience 
                                    de navigation optimale. Pour en savoir plus, cliquez ici. 
                                </p>
                                <h5>Utilisation des données personnelles  </h5>
                                <p>
                                    La plateforme Insight Data collecte une série de données sur ses utilisateurs. Les données personnelles récoltées par ce site sont (liste non exhaustive) :
                                    adresse email, nom, prénom, téléphone, email, adresse postale, société, fonction, sexe, âge, numéro de compte bancaire, type de navigateur, système d’exploitation. <br />
                                    Les données comportementales (ex : pages visitées, temps passé par page) sont enregistrées par des services tiers (ex : Google Analytics) afin d’améliorer 
                                    notre proposition de service. Ces données ne sont pas personnellement identifiables. <br />
                                    En tant qu’utilisateur, vous disposez d’un droit d’opposition, d’interrogation, d’accès, de rectification sur les données 
                                    personnelles. Vous pouvez contacter contact_insightdata@2m-advisory.fr pour toute question concernant la protection de données.
                                    Pour en savoir plus consultez la rubrique Politique de Confidentialité. 
                                </p>
                                <h5>Responsabilités </h5>
                                <p>
                                    Insight Data n'assume aucune responsabilité relative à l'utilisation de ses informations, ne donne aucune garantie, explicite ou implicite. Insight Data se réserve 
                                    le droit de modifier à tout moment les contenus, n'est pas responsable ni de l'exactitude, ni des erreurs, ni des omissions du site. <br />
                                    Insight Data ne pourra être responsable pour quel que dommage que ce soit tant direct qu'indirect,
                                    résultant d'une information contenue sur ce site.   
                                </p>
                                <p>
                                    L'utilisateur s'engage à ne transmettre sur ce site aucune information pouvant entraîner une responsabilité civile ou pénale et s'engage à ce titre à ne pas
                                        divulguer via ce site des informations illégales, contraires à l'ordre public ou diffamatoires. 
                                </p>
                                <h5>Droits d'utilisation </h5>
                                <p>
                                    Les informations présentes peuvent être reproduites, imprimées ou téléchargées sous réserve de ne pas les modifier, 
                                    de n’utiliser les informations qu’à des fins personnelles et non commerciales, et de reproduire sur chaque page la mention 
                                    « copyright Insight Data », au titre des droits d’auteur.  
                                </p>
                                <p>
                                    Toute autre utilisation, non spécifiquement autorisée, est interdite sans autorisation écrite et préalable d’un représentant
                                    d’Insight Data. 
                                </p>
                                <p>
                                    Le non-respect de cette interdiction est une contrefaçon qui engage la responsabilité civile et pénale du contrefacteur. 
                                </p>
                                <p>
                                    Pour plus d’informations, nous vous invitons à consulter nos Conditions Générales d’Utilisation. 
                                </p>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Modals>
  )
}

export default ModelLegal