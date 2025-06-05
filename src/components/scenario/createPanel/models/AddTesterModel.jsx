import React from 'react'
import TesterForm from '../testerForm'
import Modals from '../../../common/modals/modal'

/**
 * Renders the AddTesterModel component based on the toggleModifier value.
 *
 */
const AddTesterModel = ({ clientTester, toggleModifier, onSubmitTesteur, onModifTesteur, 
    onChange, show, onToggle, error, errorExistTester, onRemplaceTesteur, remplaceTester, detachTester, onDetachTesteur, isLoading }) => {
    
    
    /* CONSTANT */
    const userLabel = {
        name: "Prénom",
        lastname: "Nom",
        email: "Email",
    }
    
    /*RENDER */
    if (toggleModifier === "update") {
        return (
            <Modals 
                show={show} 
                toggleShow={onToggle} 
                backdrop="static" 
                header='Modifier Testeur'
            >
                <TesterForm
                    confirmText='Modifier testeur'
                    handleSubmit={onModifTesteur}
                    onChange={onChange}
                    currentUser={clientTester}
                    userText={userLabel}
                    loading={isLoading}
                    error={error}
                    errorExistTester={errorExistTester}
                />
            </Modals>
        )
    } else if (toggleModifier === "remplace") {
        return (
            <Modals 
                show={show} 
                toggleShow={onToggle} 
                backdrop="static" 
                header='Remplacer Testeur'
            >
                <TesterForm
                    remplaceTester={remplaceTester}
                    confirmText='Valider'
                    handleSubmit={onRemplaceTesteur}
                    onChange={onChange}
                    currentUser={clientTester}
                    userText={userLabel}
                    loading={isLoading}
                    error={error}
                    errorExistTester={errorExistTester}
                />
            </Modals>
        )
    } else if (toggleModifier === "detacher") {
        return (
            <Modals 
                show={show} 
                toggleShow={onToggle} 
                backdrop="static" 
                header='Detacher Testeur'
            >
                <TesterForm
                    detachTester={detachTester}
                    confirmText='Valider'
                    handleSubmit={onDetachTesteur}
                    onChange={onChange}
                    currentUser={clientTester}
                    userText={userLabel}
                    loading={isLoading}
                    error={error}
                    errorExistTester={errorExistTester}
                />
            </Modals>
        )
    } 
    else {
        return (
            <Modals 
                show={show}
                toggleShow={onToggle}
                backdrop="static"
                header='Ajouter Testeur'
            >
                <TesterForm
                    confirmText='Ajouter testeur'
                    handleSubmit={onSubmitTesteur}
                    onChange={onChange}
                    currentUser={clientTester}
                    userText={userLabel}
                    loading={isLoading}
                    error={error}
                    errorExistTester={errorExistTester}
                />
            </Modals>

        )
    }
}

export default AddTesterModel;
