
import React from 'react'
import Modals from '../common/modals/modal'
import ClientRegisterForm from '../register/client/register'


const RenderModalSignup = ({show,toggleShow,confirmText,next,confirmText2,currentUser,onSubmit,onchange,loading,onChangePhone,
    error,field,handleChange,cgu,privacyPolicy,handleConditions,handlePolitique,handleLegal}) => {
    const userLabel= {
            name: "Prénom",
            lastname: "Nom",
            email: "Email",
            useCase: "Cas d'utilisation",
            sector: "Secteur",
            profession: "Fonction",
            phone: "Téléphone",
            nbEmployees: "Nombre d'employés",
            company: "Société",
        }
    const usecase = ["Entreprise: Projet Ponctuel", "Entreprise: Plusieurs projets à tester", "Agence ou cabinet de conseil"]
    const nbemployees = ["1-10", "11-50", "51-250", "+250"]

    return (
        <Modals
            show={show}
            toggleShow={toggleShow}
            header='Devenir un client'
        >
            <ClientRegisterForm
                tog_standard={toggleShow}
                confirmText='Devenir un client'
                confirmText2='Suivant'
                handleSubmit={onSubmit}
                next={next}
                onchange={onchange}
                nbemployees={nbemployees}
                usecase={usecase}
                currentUser={currentUser}
                userText={userLabel}
                loading={loading}
                onChangePhone={onChangePhone}
                error={error}
                field={field}
                handleChange={handleChange}
                checkedCGU={cgu}
                checkedPDC={privacyPolicy}
                handleConditions={handleConditions}
                handlePolitique={handlePolitique}
                handleLegal={handleLegal}
            />
        </Modals>
    )
}

export default RenderModalSignup