import React from 'react'
import Modals from '../common/modals/modal'


const ModelConditions = ({ visibleCondition, handleConditions }) => {
  return (
        <Modals
            modalSize="modal-lg"
            show={visibleCondition}
            toggleShow={() => handleConditions()}
            header='Conditions générales d’utilisation'
        >
        <div className="modal-body">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-text">
                                <h5>Informations générales</h5>
                                <p>
                                    Vous avez eu accès à notre site et vous l’utilisez. Les présentes conditions règlent les modalités 
                                    d’utilisation de notre site. Le simple fait d’utiliser ce site vous engage à en respecter les 
                                    conditions d’utilisation.  
                                </p>
                                <p>
                                    Les présentes conditions générales d’utilisation ("CGU") régissent les conditions d’utilisation 
                                    du site internet insightdata.fr et de ses éventuelles applications smartphone détenus par la 
                                    société UX DATAHUB pour tout utilisateur du Site (l’"Utilisateur"). Cela concerne toutes les 
                                    informations, commentaires, captures d’écran ou autres ("Données") émis ou reçus par l’Utilisateur 
                                    auprès d’UX DATAHUB. 
                                </p>   
                                <p>
                                    Les CGU sont mises à la disposition des Utilisateurs où elles sont directement consultables et peuvent également leur être communiquées sur demande. 
                                    Le fait qu’UX DATAHUB ne se prévale pas à un moment donné de l'une des quelconques dispositions des CGU ne peut être interprété comme valant 
                                    renonciation à se prévaloir ultérieurement de l'une quelconque desdites conditions. 
                                </p>                                  
                                <h5>Utilisations non autorisées</h5>                          
                                <p>
                                    L’utilisateur accepte de ne pas utiliser le Site à des fins illégales ou dans des buts à caractère illégitime, diffamatoire, discriminatoire, 
                                    agressif, invasif en termes de confidentialité d’autrui, abusif, menaçant ou obscène. Il doit utiliser le site de manière loyale, conformément 
                                    aux lois et règlements mais aussi conformément à la décence, aux bonnes meurs et ne pas troubler par votre utilisation l’ordre public. 
                                </p>
                                <p>
                                    Il ne peut notamment pas se servir de robot ou d’autres techniques automatisées d’exploration de données pour cataloguer, télécharger,
                                    stocker ou autrement reproduire ou distribuer le contenu offert sur le Site, ou encore pour manipuler les résultats de toute enquête 
                                    présentée sur le Site. Il ne peut agir de manière à perturber le Site ou l’accès de tout autre utilisateur du Site, y compris, 
                                    sans s’y limiter, en employant des méthodes de surcharge, « d’inondation » (ex : SPAM) ou de « bombardement » (ex : stress serveur, intrusions répétitives serveurs)
                                    du Site, ou encore en tentant de lui faire générer artificiellement des erreurs. Il ne peut envoyer de courriel non sollicité, y compris des promotions ou publicités 
                                    de produit ou service, par l’intermédiaire du Site, pas plus que créer un créer une fausse identité, ni la masquer à l’intérieur de tout courriel ou affichage. 
                                </p>
                                <p>
                                    Il ne peut notamment pas utiliser, appréhender, sélectionner, copier, reproduire, utiliser des parties du Site à l’intérieur d’un autre site Web ni altérer l’apparence du Site. 
                                    Il ne peut créer des liens à partir de tout autre site Web vers l’une ou l’autre des pages du Site notamment si la ou les source(s) est/sont à caractère menaçant, calomniateur, 
                                    diffamatoire, discriminateur, obscène, scandaleux ou excessif et d’une façon plus générale contraire aux lois et règlements, immorales ou contraires aux bonne meurs et à l’ordre public. 
                                </p>
                                <p>
                                    Il ne peut utiliser un matériel pouvant être contraire aux restrictions ci-dessus pour les sources. UX DATAHUB offrira toute sa coopération à toute autorité ou organisme chargé de faire 
                                    respecter et appliquer les Lois et règlements et/ou les principes ci-dessus. Toute injonction émanant des tribunaux, autorités et organismes exigeant d’UX DATAHUB qu’elle divulgue 
                                    l’identité de quiconque qui aurait de tels comportements ou agissements ou qui inciterait, faciliterait, permettrait de tels comportement et ou agissements sera respectée.  
                                </p>
                                <h5>Relations entre les parties </h5>                          
                                <p>
                                    UX DATAHUB d'une part et les Utilisateurs d'autre part sont des parties respectivement indépendantes, chacune agissant en son nom et pour son propre compte, sous réserves des 
                                    strictes prérogatives confiées à UX DATAHUB au titre des CGU.
                                    <br />
                                    Les CGU ne créent aucun lien de subordination, société en participation, entreprise commune, de relations 
                                    employeur/employé ou franchiseur/franchisé entre UX DATAHUB et les Utilisateurs. Les Utilisateurs acceptent les missions en toute indépendance et sont libres dans la réalisation
                                    des Données. 
                                </p>
                                <h5>Droits de propriété intellectuelle  </h5>    
                                <p>
                                    IL’ensemble des éléments figurant sur le Site et sur les sites objets des missions sont protégés par la législation française sur le droit d’auteur, droit à l'image et/ou droit des marques.
                                    Vous ne pouvez en aucun cas utiliser, distribuer, copier, reproduire, modifier, dénaturer ou transmettre le Site ou les sites ou certains de leurs éléments sans l’autorisation écrite 
                                    préalable d’UX DATAHUB. 
                                </p>
                                <p>
                                    Aucun droit ou licence ne saurait être attribué sur l’un quelconque de ces éléments sans l’autorisation écrite expresse d’UX DATAHUB. UX DATAHUB se réserve le droit de poursuivre
                                    toute action en contrefaçon de ses droits de propriété intellectuelle. 
                                </p>
                                <h5>Données à caractères personnelles  </h5>    
                                <p>
                                    UX DATAHUB comprend que la protection des données et de la vie privée soit un enjeu pour l’ensemble des internautes visitant le site de la société. UX DATAHUB s’engage, conformément
                                    à la réglementation RGPD, à respecter votre vie privée et à protéger vos données à caractère personnel, c’est à dire susceptible de vous identifier directement ou indirectement 
                                    en tant que personne. Pour en savoir plus, nous vous invitons à lire notre page consacrée à la politique d’UX DATAHUB concernant le respect de la vie privée. 
                                </p>
                                <h5>Responsabilité </h5>    
                                <p>
                                    UX DATAHUB se réserve le droit, à tout moment, de modifier ou interrompre son Site et ses missions sans que sa responsabilité ne puisse être engagée. 
                                    L’Utilisateur devra disposer des compétences et du matériel requis pour effectuer les missions. UX DATAHUB ne saurait être tenu responsable en cas de mauvais 
                                    fonctionnement de son site et des sites objets des missions. 
                                    <br />
                                    L’Utilisateur accepte en utilisant le Site et en réalisant les missions tous les risques et les caractéristiques
                                    propres à l’utilisation d’internet, en particulier les délais de transmission, erreurs techniques et risque de piratage. UX DATAHUB n’est pas responsable des coûts téléphoniques
                                    et/ou coûts de transmission des Données et/ou toutes autres informations téléchargées. UX DATAHUB n’assume aucune responsabilité pour les dommages qui pourraient être causés 
                                    au matériel informatique des Utilisateurs. 
                                    <br />
                                    La responsabilité d’UX DATAHUB ne saurait être engagée en cas d'inexécution d’une mission du fait d'un tiers, en cas de force majeure
                                    telle que définie par les tribunaux français, et d'une manière générale tous événements extérieurs ne permettant pas la bonne exécution de la mission. 
                                </p>
                                <h5>Limitation de responsabilité  </h5>    
                                <p>
                                    Le Site, aussi bien lors de son utilisation que pour l’ensemble du contenu ou des services mis à la disposition des utilisateurs ou auxquels on peut accéder grâce au Site est proposé 
                                    « tel quel » en l’état. UX DATAHUB ne donne pas d’avis ni de garantie quant au contenu du Site. De plus, UX DATAHUB décline toute responsabilité face à toute garantie formelle ou 
                                    implicite, y compris, sans s’y limiter, pour non-contrefaçon, pour les titres, qualités marchandes ou aptitudes à l’utilisation des services proposés. 
                                    <br />
                                    UX DATAHUB ne garantit pas que : 
                                    <br />
                                    <span style={{ fontSize :"24px", fontWeight : 900, marginLeft : "1rem"}}>•</span> les fonctions contenues dans ce Site, pas plus que le matériel ou contenus qu’il propose, ne seront pas interrompus ou exempts d’erreurs, 
                                    <br />
                                    <span style={{ fontSize :"24px", fontWeight : 900, marginLeft : "1rem"}}>•</span> les défauts seront corrigés ou que le Site ou le serveur qui le développe seront ajustés et modifiés en fonction des erreurs ou défauts, 
                                    <br />
                                    <span style={{ fontSize :"24px", fontWeight : 900, marginLeft : "1rem"}}>•</span> le Site ou le serveur qui le fournit sera exempt de virus ou d’autres éléments nuisibles. Les utilisateurs ne pourront pas être indemnisés pour les préjudices qu’ils pourraient subir dans les cas visés ci-dessus. 
                                </p>
                                <p>
                                    La responsabilité juridique civile, contractuelle ou autre d’UX DATAHUB ne sera en aucun cas engagée vis-à-vis des utilisateurs, pour tout préjudice, pour la perte de profit, 
                                    la perte de données, la perte d’opportunité, les coûts de couverture, de dommages-intérêts, les blessures personnelles ou un décès imputable à une faute non intentionnelle 
                                    d’UX DATAHUB. Ceci y compris les dommages accessoires particuliers ou autres dommages indirects.
                                    <br />
                                    Nonobstant l’énoncé précédent, si nous sommes jugés responsables d’un dommage, 
                                    préjudice, d’une perte subie par vous ayant son origine dans votre utilisation du Site ou de son contenu, notre responsabilité financière ne pourrait être mise en cause au-delà 
                                    d’une somme supérieure à trois cents euros (300 euros), cette somme est un maximum et doit toutefois être justifiée par le préjudice subit. 
                                </p>
                                <h5>Modifications </h5> 
                                <p>
                                    Toutes les informations figurant sur le Site peuvent faire l’objet de modification sans avis. Les changements éventuels seront agrégés aux présentes. Il vous appartient donc de 
                                    consulter fréquemment les présentes pages pour demeurer au fait de tout changement. Votre accès au Site suite à l’application de telles modifications signifie que vous êtes 
                                    d’accord sur ces changements. 
                                </p>
                                <h5>Indemnisation de UX DATAHUB du fait des préjudices de votre fait  </h5> 
                                <p>
                                    Vous acceptez d’indemniser la société UX DATAHUB de la défendre et de l’exonérer de toute responsabilité y compris pour ses employés, cadres, mandataires, agents et représentants
                                    et mandataires sociaux contre toute réclamation, demande, mise en responsabilité, coût ou dépense, y compris les frais de procédure et des conseils (avocat, expert, etc.) , découlant de,
                                    ou touchant, toute violation de votre part des présentes stipulations ou de l’utilisation non conformes de nos services et du Site ou du non-respect de toute loi en vigueur. Il en sera 
                                    de même suite à l’utilisation du Site ou de son contenu qu’elle qu’en soit la forme de façon irrégulière. 
                                </p>
                                <h5>Divisibilité des mentions applicables aux présentes  </h5> 
                                <p>
                                    Au cas où une ou des parties des présentes ou de ces conditions serait déclarée non valable ou inapplicable par tout tribunal ou autorité compétente et pour toute raison que ce soit,
                                    la disposition en cause sera considérée comme inopérante sans toutefois affecter les autres dispositions des présentes ou des conditions qui continueront à s’appliquer. 
                                </p>
                                <h5>Relations avec UX DATAHUB </h5> 
                                <p>
                                    A l’exception de vos données personnelles (nom, prénom, adresse précise, email), aucune confidentialité ou réserve de publicité ne sera apportée à toute information ou tout 
                                    élément que vous envoyez à UX DATAHUB sous forme de courrier électronique ou autrement, y compris toutes les données, questions, commentaires, suggestions ou autres,
                                    deviendront publiques et de dénomination commune, et seront traités comme tels.  
                                </p>
                                <p>
                                    Sauf dans la mesure ou les informations reçues seraient explicitement couvertes par notre Politique de confidentialité des données, tout ce que vous transmettez ou affichez
                                    peut être utiliser librement par UX DATAHUB ou ses sociétés affiliées ou ses partenaires, y compris, sans toutefois s’y limiter, par reproduction, divulgation, transmission, 
                                    publication et diffusion. De plus, UX DATAHUB peut à son gré utiliser toute idée, tout concept, tout savoir-faire ou toute technique qui serait incluse dans n’importe quelle 
                                    communication envoyée par vous vers notre Site sans qu’il y ait rétribution ou avantage autre que ceux contractuellement définis. L’utilisation pourra être à toute fin, y compris, 
                                    entre autres, pour le développement, la modification, la fabrication et la commercialisation de produits et services UX DATAHUB à l’aide des dites informations recueillies. 
                                </p>
                                <h5>Liens hypertextes - Cookies  </h5> 
                                <p>
                                    Lors de la consultation du site https://UX DATAHUB.fr, des cookies sont déposés sur votre ordinateur, votre tablette ou votre smartphone. La page politique de cookies 
                                    vous permet de mieux comprendre comment fonctionnent les cookies et comment utiliser les outils actuels afin de les paramétrer.   
                                </p>
                                <h5>Informations des tiers </h5> 
                                <p>
                                    Le Site peut contenir des liens vers d’autres sites Web qui ne sont pas en maintenance par UX DATAHUB ou qui contiennent des informations sur de produits ou services tiers.
                                    UX DATAHUB ne vérifie pas les pratiques juridiques, commerciales, les informations ou autres de ces tiers qui sont indépendants d’UX DATAHUB et ne donne aucune garantie en leur nom.  
                                </p>
                                <p>
                                    La mise à disposition de tout lien ou le renvoi vers tout lien tiers ne sera jamais synonyme de la prise en charge de la responsabilité de ces tiers par UX DATAHUB sur les contenus de ces sites tiers.
                                    Nous vous conseillons de faire preuve de prudence lorsque vous quittez notre Site et nous vous demandons de prendre connaissance des déclarations de confidentialité, d’utilisation de chacun des sites
                                    Web que vous consultez sous votre responsabilité. Les données contenues sur notre Site ne le sont seulement qu’à titre d’information. Les vues et opinions exprimées sur notre Site ne sont
                                    pas nécessairement celles d’UX DATAHUB et chaque utilisateur doit garder son libre arbitre.   
                                </p>
                                <h5>Programmes promotionnels  </h5> 
                                <p>
                                    Dans le cadre d’un effort de prospection, UX DATAHUB pourra offrir ou organiser des panels, tirages, récompenses, programmes de points de fidélité ou autres promotions ou programmes 
                                    concernant les activités figurant sur notre Site (Services). Ces Services seront assujettis aux règlements, conditions, clauses, dispositions, règles, directives ou accords en vigueur 
                                    au moment où vous accéderez auxdits services. UX DATAHUB se réserve le droit de modifier ou d’annuler, à tout moment et sans préavis les récompenses et avantages attribués par le programme. 
                                </p>
                                <h5>Droit applicable - Litige  </h5> 
                                <p>
                                    Toutes les dispositions contractuelles définies ci-dessus sont régies par le droit français. Tous litiges afférents aux CGU relèvent de la compétence du tribunal de commerce de Paris.  
                                </p>
                                <h5>Conditions d’inscription et compte Utilisateur Testeur  </h5> 
                                <p>
                                    Pour pouvoir utiliser le Site et profiter des missions présentées sur le Site, l’Utilisateur devra s’inscrire et créer un compte Utilisateur Testeur. 
                                    <br />
                                    L’Utilisateur testeur devra être 
                                    une personne physique majeure. S’il s’agit d’une personne physique, elle devra au minimum être inscrite en tant qu’auto-entrepreneur ou avoir un statut spécifique lui permettant d’effectuer
                                    les missions proposées par UX DATAHUB, dès lors que le compte Utilisateur atteint un montant de 500 euros. Si l’Utilisateur réside à l’étranger, il devra s’assurer que son statut soit 
                                    compatible avec celui exigé par UX DATAHUB. Pour toute question sur votre statut, n’hésitez pas à contacter par email à contact_insightdata@2m-advisory.fr 
                                    <br />
                                    Lors de l’ouverture du compte, 
                                    l’Utilisateur devra communiquer des informations personnelles relatives à son identité telles que, pour une personne physique, nom, prénom, adresse email, date de naissance.
                                    <br />
                                    L’Utilisateur devra déclarer être titulaire d’un compte avec un IBAN ou une carte bancaire. Tout Utilisateur ne remplissant pas les conditions prévues dans les CGU se verra interdire l’accès et l’utilisation 
                                    des missions. UX DATAHUB se réserve le droit de suspendre temporairement ou définitivement le compte de tout Utilisateur. L’Utilisateur reconnait et accepte de garder confidentiel l’identifiant et le mot de passe
                                    permettant un accès à son compte. L’identifiant et le mot de passe sont personnels et ne doivent pas être partagés ni transférés à une quelconque personne physique ou morale, sous quelque forme que ce soit, sans le 
                                    consentement écrit et préalable d’UX DATAHUB L’Utilisateur est seul responsable de son compte et de l’utilisation qu’il en fait.  
                                </p>
                                <p>
                                    Les missions disponibles sont consultables sur le Site. Les missions sont régulièrement mises à jour et UX DATAHUB se réserve la possibilité de modifier la liste et le contenu des missions à tout moment. 
                                    A chaque mission correspond des critères spécifiques qu’il est demandé à l’Utilisateur de respecter.
                                    Le non-respect d’un de ces critères rendra caduque la mission.
                                    <br />
                                    Aucune mission ne vous demandera d’acheter et payer un produit sur un site internet autrement que par le biais d’un numéro spécifique pour réaliser ledit achat et communiqué 
                                    dans le cadre d’une mission. UX DATAHUB ne peut être tenue pour responsable de l’achat par un Utilisateur d’un produit réalisé en contradiction avec les termes et conditions
                                    d’une mission.                                
                                </p>
                                <p>
                                    Une fois la mission sélectionnée, l’Utilisateur devra notamment accéder au site objet de la mission, faire une série de tests sur ce site, répondre à des questions précises et commenter son expérience, 
                                    le tout dans les délais impartis dans le cadre de ladite mission. Une fois cette étape réalisée conformément à la description faite dans le descriptif de la mission, l’Utilisateur
                                    devra alors transférer ses Données à UX DATAHUB en suivant les instructions figurant sur le Site. 
                                    <br />
                                    L’ensemble des données qui pourraient être communiquées à l’Utilisateur
                                    au cours d’un mission et/ou dont il pourrait avoir accès dans le cadre de l’exécution de sa mission, demeurent confidentielles et l’Utilisateur s’engage à les considérer comme 
                                    confidentielles et à ne pas les divulguer sans l’accord préalable d’UX DATAHUB. L'utilisateur s'engage à supprimer de son appareil l'application testée dans le cas où celle-ci ne 
                                    serait pas encore publique sur les stores d'application. L’Utilisateur s’engage à ne transmettre à UX DATAHUB que des Données libres de tout droit et pour lesquelles l’Utilisateur est le seul
                                    propriétaire des droits d’auteurs, de sorte qu’UX DATAHUB soit le seul bénéficiaire et propriétaire des Données, étant entendu qu’UX DATAHUB pourra librement, sous son seul nom, disposer 
                                    des Données, les éditer et/ou les communiquer à tout tiers, en l’état ou retraitées.
                                    <br />
                                     UX DATAHUB se réserve le droit de refuser toutes Données de l’Utilisateur qu’il considèrerait mal exécutées 
                                    eu égard aux critères de la mission. Tout refus est notifié à l’Utilisateur par email et rend caduque la mission et son règlement. L’Utilisateur pourra cependant reprendre la mission et proposer
                                    à UX DATAHUB de nouvelles Données en conformité avec les attentes d’UX DATAHUB.                                 
                                    </p>
                                    <p>
                                        Le transfert des Données de l’Utilisateur vers UX DATAHUB emporte cession des droits d’auteurs, ce que reconnait expressément l’Utilisateur.
                                        <br />
                                        Par ailleurs, et dans le cadre 
                                        de certaines missions, l’Utilisateur pourra être amené à faire part des conditions de réalisation de sa mission directement au client propriétaire du site objet de la mission. 
                                        Cet entretien entre le propriétaire du site en question et l’Utilisateur sera effectué via un échange audio et vidéo et ledit propriétaire pourra poser toute question relative
                                        à la mission et/ou au site auxquelles l’Utilisateur s’engage à répondre avec diligence.
                                        <br />
                                        La réalisation d’un tel entretien sera précisée en amont dans les descriptifs de la mission,
                                        étant entendu qu’un tel échange constituera une condition de validité de ladite mission dont le défaut entraînera absence de validation de la mission et absence paiement.
                                        Sauf convention contraire, les données audio et vidéo de l’Utilisateur ne pourront en aucun cas être utilisées par le propriétaire du site et/ou UX DATAHUB sauf à des usages 
                                        internes aux fins d’améliorer le site objet de la mission, étant entendu que les CGU ne valent pas renonciation aux droits à l’image de l’Utilisateur par ce dernier. 
                                        <br />
                                        La validation 
                                        de la mission est notifiée à l’Utilisateur par email et le compte Utilisateur est alors crédité du montant indiqué dans la mission.                                
                                       </p>
                                    <p>
                                        Un testeur ne pourra prétendre au virement sur son compte du montant des prestations réalisées et validées que lorsque celui-ci aura atteinte un montant cumulé minimum 
                                        fixé à 28 (vingt huit) Euros. Tant que ce seuil ne sera pas atteint, UX DATAHUB ne sera pas tenu de verser les sommes qui seront alors comptabilisées sur le compte du testeur.
                                        Toutefois si au terme de 6 mois le compte du testeur ne dépasse pas la somme de 28 (vingt huit) Euros, celui-ci pourra demander que cette somme lui soit payée. 
                                        <br />
                                        Tout virement d’un montant supérieur ou égal à 28 (vingt huit) Euros est gratuit vers un Compte Bancaire domicilié en France. Pour tout virement éventuel inférieur 
                                        à 28 (vingt huit) Euros, ou pour tout virement intervenant dans la même semaine qu’un précédent virement, des frais administratifs seront imputés sur le versement. 
                                        Aucun virement ne sera possible vers un compte bancaire domicilié à l'étranger.
                                        <br />
                                        En cas de coordonnées erronées, l’Utilisateur en sera notifié par email afin qu’il puisse
                                        régulariser ses informations. Une retenue de 3 euros pour frais de gestion sera appliquée sur son compte.  
                                    </p>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Modals>
)}

export default ModelConditions