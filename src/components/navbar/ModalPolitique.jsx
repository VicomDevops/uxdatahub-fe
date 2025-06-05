import React from 'react'
import Modals from '../common/modals/modal'


const ModelPolitique = ({ visiblePolitique, handlePolitique }) => {
  return (
        <Modals
            modalSize="modal-lg"
            show={visiblePolitique}
            toggleShow={() => handlePolitique()}
            header='Politique de confidentialité'
        >
        <div className="modal-body">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-text">
                                <h5>Confidentialité et protection des données </h5>
                                <p>
                                    Dernière mise à jour : Décembre  2021 Nous vous sommes reconnaissants d'avoir accepté de vous joindre à notre communauté s. 
                                    Insight Data propose à ses clients de sélectionner des utilisateurs/testeurs en fonction de leurs préférences de consommations
                                    concernant des produits/services et des concepts de produits/services. Nos clients utilisent les retours et commentaires pour
                                    décider quel support/média utiliser, comment communiquer, le concevoir, l'améliorer ou comment le mettre à votre disposition.
                                    En participant à notre communauté, vous ferez partie de ceux dont l'opinion influe sur les décisions de nos clients. 
                                    Cette charte a pour objectif de définir les engagements d’Insight Data (qui inclut les sociétés filiales ou partenaires de 2M-ADVISORY)
                                    envers tous les membres de sa communauté de testeurs en matière de confidentialité, d'anonymat et de protection des données personnelles 
                                    afin de respecter et protéger la vie privée des testeurs. 
                                </p>
                                <h5>Informations générales  </h5>
                                <h5>A propos d’Insight Data  </h5>
                                <p>
                                    Le nom Insight Data appartient à la SAS 2M-ADVISORY dont le siège social est situé au 10 rue Jean Macé – 75011 Paris - FRANCE et immatriculée au RCS de Paris. 
                                </p>
                                <h5>Vos informations personnelles demeurent confidentielles </h5>
                                <p>
                                    En intégrant notre communauté de testeurs, vous serez amené à nous transmettre des informations personnelles vous concernant ou concernant d'autres membres de votre foyer.
                                    Aussi longtemps que vous serez inscrit au sein de notre communauté, ces informations seront conservées dans notre base de données et ne seront utilisées
                                    que dans la mesure où elles seront nécessaires à l'établissement d'analyses statistiques et de rapports utile au client, sur une base anonyme. Aucune information 
                                    d'identification personnelle n'est communiquée à nos clients de manière nominative dans quelque document que ce soit, sans votre accord explicite préalable.  
                                </p>
                                <h5>Utilisation des données personnelles  </h5>
                                <p>
                                    Nous utilisons les informations que vous et d'autres membres nous ont communiquées afin d'aider à l'évaluation et l'amélioration de produits et services existant ou à venir,
                                    tout en préservant votre anonymat. 
                                    <br/>
                                    Nous utilisons ces informations pour effectuer des recherches et préparer des rapports et analyses statistiques concernant les préférences
                                    des consommateurs dans votre pays et dans le monde concernant des produits/services et des idées de nouveaux produits/services. L'ensemble de ces informations utilisées par
                                    Insight Data ne permettront d'aucune façon d'identifier nominativement le testeur concerné. Ces informations ne seront utilisées que dans le cadre strict des tests auxquelles
                                    vous participerez. 
                                </p>
                                <h5>Responsables pour le traitement des données  </h5>
                                <p>
                                    SAS 2M-ADVISORY
                                    <br/>
                                    Représentée par Nicolas MARTIN de PENA
                                    <br/>
                                    10 rue Jean Macé – 75011 Paris - FRANCE
                                    <br/>
                                    Téléphone : 07 87 03 20 49
                                    <br/>
                                    Adresse e-mail : nmartindepena@2M-advisory.fr 
                                </p>
                                <p>
                                    Contact Principal pour les questions concernant vos données personnelles : contact_insightdata@2m-advisory.fr 
                                </p>
                                <p>
                                    Vous pouvez également utiliser la rubrique Contact. Nous vous répondrons dans les plus brefs délais.                                
                                </p>
                                <h5>Nous pouvons modifier cette charte  </h5>
                                <p>
                                    Nous nous réservons le droit de mette à jour ou de modifier cette charte de protection des données personnelles. Au cas nous serions amenés à modifier 
                                    notre politique de traitement des données personnelles, les modifications vous seront notifiées par la mise en ligne de la nouvelle Charte au moins 30
                                    jours avant l'entrée en vigueur des modifications. 
                                </p>
                                <h5>Collecte de données personnelles – Collecte Directe  </h5>
                                <h5>Données à caractère obligatoire </h5>
                                <p>
                                    Les données personnelles demandées lors de votre inscription en tant que testeur Insight Data sont dites “obligatoires”. Vous ne pouvez pas vous inscrire 
                                    si vous ne renseignez pas ces données. 
                                    <br />
                                    Ces données constituent pour Insight Data le minimum d’informations nécessaire pour établir votre profil testeur
                                    et vous proposer ainsi des tests en adéquation avec votre profil.  
                                </p>
                                <h5>Données à caractère non obligatoire  </h5>
                                <p>
                                    Les données personnelles supplémentaires que vous pouvez renseigner dans votre espace testeur n’ont pas de caractère obligatoire mais permettent 
                                    d’enrichir votre profil. La complétion de ces données personnelles augmente en conséquence vos chances de vous voir attribuer des tests rémunérés.
                                    <br /> 
                                    Également, au cours de votre "vie de testeur", vous recevrez (sous réserve d’avoir donné votre consentement) des rapides questionnaires en ligne dénommé 
                                    "Eligibilité pour les prochains tests rémunérés" nous permettant d’affiner votre profil en fonction des demandes spécifiques et ponctuelles de nos clients.
                                    <br />
                                    Ces questionnaires concernent généralement votre connaissance ou vos habitudes de consommation sur certaines marques ou certains types produits. 
                                    La complétion de ces questionnaires n’est pas obligatoire mais conditionne le fait de recevoir les tests rémunérés liés. Si vous décidez de ne pas y répondre,
                                    votre profil ne pourra pas être sélectionné pour ces tests rémunérés. 
                                </p>
                                <h5>Durée de conservation des données personnelles </h5>
                                <p>
                                    Toutes les données personnelles que vous renseignez, que ce soit à l’inscription, dans votre espace testeur ou dans les questionnaires dit "d’éligibilité", 
                                    sont conservées par Insight Data tout au long de votre "vie de testeur".
                                    <br />
                                    Lorsque vous supprimez votre compte, toutes les informations à caractère personnel 
                                    permettant de vous identifier nominativement sont supprimées définitivement de nos bases de données ; à savoir : vos email, nom, adresse postale, 
                                    n° de téléphone et, le cas échéant, votre IBAN.
                                    <br />
                                    Vos autres informations de profil, c’est-à-dire les informations socio-démographiques et de consommation,
                                    sont conservées de manière complètement anonymisée à des fins de recherche scientifique et à des fins statistiques (art. 89, paragraphe 1 et 2 du Règlement 
                                    général sur la protection des données du 27 avril 2016) ; l’anonymisation de ces données ne permettant plus d’identifier les personnes concernées. 
                                </p>
                                <h5>Collecte générale de données lors de la consultation de nos services – Collecte indirecte  </h5>
                                <p>
                                    Lorsque vous vous inscrivez ou vous connectez à nos services (espace testeur, application mobile, application web ou outil de tests en ligne) nous collectons
                                    des données techniques vous concernant ; notamment votre type de navigateur et sa version, votre système d’exploitation et sa version, votre type d’appareil
                                    (ordinateur/smartphone). 
                                    <br />
                                    Ces données techniques nous permettent d’optimiser la présentation de notre site Web et de nos services et d’assurer leur bon fonctionnement. 
                                </p>
                                <h5>Cookies </h5>
                                <p>
                                    Afin de gérer notre communauté et d'améliorer votre expérience en tant que testeur Insight Data, certains de nos outils et services utilisent des cookies.
                                    Un cookie est une petite quantité de données, qui contient souvent un identifiant unique et anonyme, envoyée à votre navigateur par un serveur Web et stockée
                                    sur le disque dur de votre ordinateur. Les informations collectées grâce à ce cookie peuvent être associées à d'autres cookies que vous possédez sur votre ordinateur
                                    et utilisées pour compléter les informations dont nous disposons à votre sujet. Ce cookie ne contient aucune information pouvant vous identifier personnellement.
                                    <br />
                                    Certains de nos services et outils mis votre à disposition utilisent des cookies : 
                                    <br />
                                    <span style={{ fontSize :"24px", fontWeight : 900, marginLeft : "1rem"}}>•</span> Site web www.Insight Data.fr :se référer à la section Déclaration relative aux cookies.
                                    <br />
                                    <span style={{ fontSize :"24px", fontWeight : 900, marginLeft : "1rem"}}>•</span> Espace testeur : cookie de session ; but : authentification des utilisateurs du site. 
                                    <br />
                                    <span style={{ fontSize :"24px", fontWeight : 900, marginLeft : "1rem"}}>•</span> Nos outils de test proprement dits (applications pour Chrome, Android et iOS) n’utilisent pas de cookie. 
                                </p>
                                <h5>Traitement des données personnelles  </h5>
                                <h5>Licéité du traitement  </h5>
                                <p>
                                    Le traitement opéré par Insight Data sur les données personnelles est licite dans la mesure où les personnes s’inscrivant en tant que testeur 
                                    Insight Data ont consenti au traitement de leur données personnelles (art. 6, paragraphe 1, point a).
                                    <br />
                                    Les personnes s’inscrivant à la communauté
                                    Insight Data sont également informées qu’elles peuvent à tout moment retirer leur consentement et sont informées de l’ensemble de leurs droits
                                    concernant leurs données personnelles. 
                                </p>
                                <h5>Finalité de la collecte des données à caractère personnel   </h5>
                                <h5>En aucun cas Insight Data ne vend, ne cède ou ne prête vos données personnelles à quelques tiers que ce soit à des fins de prospection.   </h5>
                                <p>
                                    Toutes les informations nominatives ne pourront être utilisées à des fins d'analyse des résultats des tests. Vos noms, adresse complète, 
                                    email et n° de téléphone ne servent qu'à vous contacter. Votre IBAN ne sert qu’à réaliser le virement de vos gains sur votre compte bancaire;
                                    aucun retrait n’est réalisé.
                                    <br />
                                    Comme mentionné plus haut, la collecte de données personnelles par Insight Data a pour finalité principale de pouvoir
                                    cibler les profils testeurs correspondants aux tests demandés par nos clients. Ces données personnelles nous servent également à des fins statistiques
                                    internes (suivis du type de profils, nombres testeurs disponibles par type de profils…) ainsi qu’à des fins derecherches scientifiques.
                                    <br />
                                    Ces données personnelles,
                                    sous forme anonymisée et agrégée, permettent également d’obtenir un aperçu statistique sur les tests réalisés (répartition hommes/femmes; 
                                    âge moyen des testeurs; répartition géographique…). 
                                </p>
                                <h5>Destinataires et catégories de destinataires des données à caractère personnel  </h5>
                                <p>
                                    Vos données personnelles sont strictement confidentielles ; seuls les responsables du traitement, mentionnées plus haut, ont accès à l’ensemble de vos données personnelles. 
                                </p>
                                <h5>Responsables du traitement </h5>
                                <p>
                                    Notamment, seuls les responsables du traitement mentionnées plus haut on accès aux données sensibles permettant de vous identifier (email, nom, adresse postale, IBAN le cas échéant).
                                    Ces informations sont utilisées par les responsables du traitement uniquement pour vous contacter en cas de besoin ou, le cas échéant, réaliser le versement de vos gains sur votre compte bancaire. 
                                </p>
                                <h5>Chargés d'études   </h5>
                                <p>
                                    Les chargés d’études travaillant pour Insight Data ont accès à certaines données personnelles des testeurs (informations socio-démographiques et de consommation uniquement),
                                    de manière entièrement anonymisée et sur accord de l’un des responsables du traitement mentionnées plus haut. La consultation de ces données permet aux chargés d’études de 
                                    sélectionner les testeurs dont le profil est en adéquation avec les tests à attribuer.                                 
                                </p>
                                <h5>Clients </h5>
                                <p>
                                    Les clients d’Insight Data n’ont accès qu’à certaines de vos données personnelles (informations socio-démographiques et de consommation), 
                                    toujours sous forme anonymisée et en nombre restreint (généralement cinq informations en moyenne) afin de permettre le ciblage des testeurs 
                                    sur les tests qu’ils souhaitent lancer. Ces informations leurs permettent notamment d’avoir un aperçu statistique des testeurs réalisant les tests
                                    (répartition hommes/femmes ; âge moyen ; répartition géographique…). 
                                    <br />
                                    Exceptionnellement et pour des raisons techniques de réalisation de certains tests, Insight Data peut être amené à vous demander votre consentement
                                    pour transmettre votre adresse email à certains clients de manière à ce que ceux-ci puissent autoriser votre email à consulter leur plateforme en ligne.
                                    Dans tous les cas, si vous ne donnez pas votre consentement, votre email n’est pas transmis. Chaque fois que ce type de situation se présente,
                                    Insight Data vous demandera systématiquement votre consentement pour le test en question. Le consentement que vous donnez n’est valable que pour un test spécifique.                                
                                </p>
                                <h5>Droits des personnes concernées et exercices des droits  </h5>
                                <p>
                                    Concernant les données personnelles détenues par Insight Data, chaque personne concernée a le droit d'accès, le droit de rectification,
                                    le droit à l'effacement, le droit à la limitation du traitement, le droit d'opposition, ainsi que le droit à la portabilité de ces données. 
                                    Ces droits sont explicités ci-après.                                
                                </p>
                                <h5>Droit d’accès et droit de rectification </h5>
                                <p>
                                    Dans un souci de transparence, de clarté et d’efficacité, Insight Data regroupe vos données personnelles dans votre espace testeurs, section Mon profil.  
                                    <br />
                                    Vous pouvez ainsi accéder librement et à tout moment aux données à caractère personnel que nous détenons sur vous et, le cas échéant, les rectifier.                                
                                </p>
                                <h5>Droit à la limitation du traitement et droit d’opposition </h5>
                                <p>
                                    Vos données à caractère personnel ne sont pas utilisées par Insight Data à des fins de prospection et ne sont ni cédées ni vendues à quelques tiers que ce soit.
                                    <br />
                                    Vos données à caractère personnel ne sont pas non plus transmises à des prestataires dans le but d’être traitées. 
                                    <br />
                                    Insight Data utilise uniquement les données
                                    à caractère personnel que vous renseignez lors de votre inscription et dans votre espace testeur ; nous ne collectons pas de données à caractère personnel par
                                    l’intermédiaire de sources externes tierces. 
                                    <br />
                                    De plus, seul Insight Data traite vos données à caractère personnel, par l’intermédiaire des responsables du
                                    traitement mentionnés plus haut. 
                                    <br  />
                                    Vos droits à la limitation du traitement et d’opposition ne peuvent donc s’exercer que des manières suivantes : 
                                    <br />
                                    <span style={{ fontSize :"24px", fontWeight : 900, marginLeft : "1rem"}}>•</span> En retirant votre consentement au traitement de vos données par Insight Data (vous risquez dans ce cas de recevoir moins de tests, ceux-ci étant attribués 
                                    sur la base du profil des testeurs), 
                                    <br />
                                    <span style={{ fontSize :"24px", fontWeight : 900, marginLeft : "1rem"}}>•</span> En supprimant votre compte testeur (dans ce cas vos données sont définitivement perdues).                               
                                </p>
                                <h5>Droit à l'effacement ("droit à l'oubli")</h5>
                                <p>
                                    Afin d’exercer votre droit à l’effacement, vous devez nécessairement supprimer votre compte. Cette fonctionnalité est disponible dans votre espace testeur.
                                    <br />
                                    Toutes les informations à caractère personnel permettant de vous identifier seront supprimer définitivement de nos bases de données
                                    (email, nom, prénom, adresse postale, n° de téléphone, IBAN). 
                                    <br />
                                    Vos informations socio-démographiques et profil de consommation sont en revanches conservées
                                    de manière complètement anonymisée à de fin de recherche scientifique et à des fins statistiques conformément à l'article 89, paragraphe 1 du Règlement 
                                    général sur la protection des données (RGPD) du 27 avril 2016.                               
                                </p>
                                <h5>Droit à la portabilité des données </h5>
                                <p>
                                    Une fonctionnalité d’export de vos données personnelles est disponible dans votre espace testeur (section "Mon profil"). 
                                    <br />
                                    Suite à votre demande, vous recevrez vos données par email sous forme de fichier au format csv.                             
                                </p>
                                <h5>Droit au retrait du consentement  </h5>
                                <p>
                                    Vous pouvez à tout moment révoquer un consentement donné pour vous opposer au traitement de vos données à caractère personnel. 
                                    <br />
                                    Pour cela, vous pouvez nous écrire un mail pour nous le signifier.
                                    <br />
                                    Les traitements ayant été effectués avant l'opposition ne sont pas concernés.                            
                                </p>
                                <h5>Renseignement concernant la possibilité d'introduire une réclamation (plainte) à la CNIL  </h5>
                                <p>
                                    Vous avez le droit de réclamer auprès de l'autorité compétente, à savoir la CNIL, concernant le traitement de vos données à caractère personnel par nos soins.
                                    <br />
                                    Pour en savoir plus, consultez le site Web de la CNIL .                         
                                </p>
                                <h5>Politique de sécurité des systèmes d'information   </h5>
                                <p>
                                    Insight Data met un point d'honneur à respecter les normes en vigueur et à suivre les avancées dans ce domaine.                        
                                </p>
                                <h5>Services & Sécurité  </h5>
                                <p>
                                    Insight Data utilise actuellement un des plus importants acteurs du Cloud dans le monde, GOOGLE, dont la renommée n’est plus à faire, notamment dans la qualité
                                    de ses propres services qu’ils proposent au monde entier. Ce Cloud est utilisé pour l’ensemble des services liés à l’outil INSIGHT DATA que nous mettons à
                                    disposition de nos clients et de nos utilisateurs testeurs. 
                                    <br />
                                    Cela apporte intrinsèquement une très haute qualité de service ainsi qu’un très bon niveau de
                                    sécurité sur les données ainsi que sur différents usages technologiques.                         
                                </p>
                                <h5>Niveau de sécurité </h5>
                                <p>
                                    Google respecte les normes en vigueur dans le domaine d'accès, de confidentialité et sécurité. Le service Cloud de Google, 
                                    dénommé aussi Google Cloud Platform ou GCP, est notamment conforme au Règlement général sur la protection des données (GDPR).
                                    <br />
                                    Pour en savoir davantage, consultez la documentation officielle fournie par Google : 
                                    <br />
                                    <span style={{ fontSize :"24px", fontWeight : 900, marginLeft : "1rem"}}>•</span> Conformité de GCP au GDPR. 
                                    <br />
                                    <span style={{ fontSize :"24px", fontWeight : 900, marginLeft : "1rem"}}>•</span> Conditions de traitement des données de GCP.                      
                                </p>
                                <h5>Certification SSL  </h5>
                                <p>
                                    Les certificats WEB sont signés pour l’ensemble des services par GlobalSign.                      
                                </p>
                                <h5>Localisation des données </h5>
                                <p>
                                    Les données venant de la collecte (video, verbatim) ainsi que les données des analyses sont actuellement hébergées
                                    sur des services OVH  localisés en France. Les instances sont placées sur 3 zones possibles en Europe (Belgique, Royaume-Uni, Allemagne).                       
                                </p>
                                <h5>Applications Web & Mobile Insight Data  </h5>
                                <p>
                                    Les applications qui sont utilisées pour récolter les données et pour réaliser les analyses sont toutes issues des services d’Insight Data.                       
                                </p>
                                <h5>Application WEB / API  </h5>
                                <p>
                                    Les applications WEB ainsi que les API reposent uniquement sur les services de GCP.                        
                                </p>
                                <h5>Applications Web & Mobile Client  </h5>
                                <p>
                                    Insight Data décline toute responsabilité des applications Web & Mobile de ses clients qui rentrent dans le cadre des analyses commanditées.
                                </p>
                                <h5>Intervenants techniques  </h5>
                                <p>
                                    Insight Data a une politique d’accès aux environnements applicatifs. C’est-à-dire, un petit nombre de personnes de confiance faisant partie
                                    de la société Insight Data sont accrédités pour l’accès à l’environnement de production. Les autres intervenants techniques ont uniquement
                                    des accès à l’environnement de développement, ce dernier environnement ne permettant pas d'accéder aux données des clients et des utilisateurs.
                                    <br />
                                    L'accès à nos bases de données est par ailleurs protégé par un firewall réalisant un filtrage des ip. 
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

export default ModelPolitique