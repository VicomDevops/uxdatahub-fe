/**
 * React import
 */
import React, { useState } from 'react';

/**
 * Components import
 */
import InfoPart1 from "./infoPart1";
import InfoPart2 from "./infoPart2";
import InfoPart3 from "./infoPart3";
import InfoPart4 from "./infoPart4";
import Modals from "../../../../common/modals/modal";
import { pays } from '../../../../../utils/pays'

/**
 * Services import
 */
import userServices from "../../../../../services/userServices";

/**
 * Libraries import
 */
import { toast } from "react-toastify";

import '../../modal.css';

/**
 * A functional component for handling user information.
 *
 * @param {Object} userInfo - the user's information object
 * @param {boolean} part1 - the state of part 1
 * @param {function} setPart1 - function to set the state of part 1
 * @param {string} userId - the user's ID
 * @param {function} setIsSubmitted - function to set the state of form submission
 * @return {JSX.Element} The rendered component for user information form
*/
const UserInfo = ({ userInfo, part1, setPart1, userId }) => {
    
    /* HOOKS */
    const [part2, setPart2] = useState(false);
    const [part3, setPart3] = useState(false);
    const [part4, setPart4] = useState(false);
    const [tester, setTester] = useState({});
    const [error, setError] = useState("");

    /* CONSTANTS */
    const os = ["Android", "IOS", "Autre"];
    const osPc = ["Windows", "MacOS", "linux", "Autre"];


    /** FUNCTIONS */
    function onChangeGender(gender) {
        setTester({ ...tester, gender: gender });
    }

    /**
     * Function to close part 1.
     */
    function closeP1() {
        setPart1(!part1);
    }

    /**
     * Function to close part 2.
     */
    function closeP2() {
        setPart2(!part2);
    }

    /**
     * Function to close part 3.
     */
    function closeP3() {
        setPart3(!part3);
    }

    /**
     * Function to close part 4.
     */
    function closeP4() {
        setPart4(!part4);
    }

    /**
     * Description of the onChangePhone function.
     *
     * @param {type} value - description of parameter
     * @return {type} description of return value
    */
    function onChangePhone(value) {
        setTester({ ...tester, phone: value });
    }

    /**
     * A function that handles the onChange event.
     *
     * @param {type} e - the event object
     * @return {type} undefined
     */
    function onChange(e) {
        setTester({ ...tester, [e.target.name]: e.target.value });
    }


    /**
     * Handles the change event for the OS input.
     *
     * @param {Event} e - The event object
     * @return {void} 
     */
    function onChangeCsp(testerCsp) {
        setTester({ ...tester, csp: testerCsp });
    }

    const  onChangeOs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setTester({ ...tester, [name]: value });
    }


    /**
     * Function to handle the submission of form part 1.
     */
    function handleSubmit1() {
        if(tester.gender === "" || tester.gender === undefined || tester.gender === null) {
            setError("Veuillez selectionner votre genre s'il vous plait");
            setTimeout(() => {
                setError("");
            }, 3000);
            return
        }else{
            setPart1(false);
            setPart2(true);
            setError("");
        }
    }

    /**
     * Function to handle the submission of form part 2.
     */
    function handleSubmit2() {
        if(tester.csp === "" || tester.csp === undefined || tester.csp === null) {
            setError("Veuillez selectionner votre CSP s'il vous plait");
            setTimeout(() => {
                setError("");
            }, 3000);
        }else{
            setPart2(false);
            setPart3(true);
            setError("");
        }
    }

    /**
     * Function to handle the submission of form part 3.
     */
    function handleSubmit3() {
        console.log(tester);
        if((tester.dateOfBirth === "" || tester.dateOfBirth === undefined || tester.dateOfBirth === null) ||
        (tester.country === "" || tester.country === undefined || tester.country === null || tester.country === "Veuillez selectionner votre pays") ||
        (tester.phone === "" || tester.phone === undefined || tester.phone === null || tester.adresse==="" || tester.adresse === undefined || tester.adresse === null
        || tester.city === "" || tester.city === undefined || tester.city === null || tester.postalCode === "" || tester.postalCode === undefined || tester.postalCode === null)
        ) {
            setError("Veuillez saisir tous les champs s'il vous plait");
            setTimeout(() => {
                setError("");
            }, 3000);
            return
        }else{
            setPart3(false);
            setPart4(true);
            setError("");
        }
    }

    /**
     * A function to handle the submission process.
     *
     */
    async function handleSubmit4() {
        let infoTester = tester;
        console.log(userId)
        infoTester.id = userId;
        if(
            (tester.osMobile !== 'Android' && tester.osMobile !== 'IOS' && tester.osMobile !== 'Autre') || 
            (tester.os !== 'Windows' && tester.os !== 'MacOS' && tester.os !== 'linux' && tester.os !== 'Autre') ||
            (tester.osTablet !== 'Android' && tester.osTablet !== 'IOS' && tester.osTablet !== 'Autre')) {
            setError("Veuillez saisir tous les champs s'il vous plait");
            setTimeout(() => {
                setError("");
            }, 3000);
            return
        }else{
            try{
                const result = await userServices.updateClientTester(infoTester)
                if(result?.header?.code !== 200) {
                    toast.error(result?.header?.message);
                    setPart4(false);
                    setPart1(true);
                }else{
                    toast.success(result?.header?.message);
                    setPart4(false);
                    //TODO : Begin the tour
                    //setIsSubmitted(true)
                }
            }catch(err){
                console.log(err);
            }
        }
    }

    /**
     * Renders the component for part 1 of the user information form.
     *
    */
    function renderPart1() {
        if (part1)
        return (
            <Modals
                show={part1}
                toggleShow={closeP1}
                header="Vos informations (1/4)"
                backdrop="static"
                notWithCloseButton={true}
            >
            <InfoPart1
                handleSubmit={handleSubmit1}
                onChangeGender={onChangeGender}
                tester={tester}
                error={error}
            />
            </Modals>
        );
    }

    /**
     * Renders the component for part 2 of the user information form.
     *
    */
    function renderPart2() {
        if (userInfo)
        return (
            <Modals
                show={part2}
                toggleShow={closeP2}
                header="Vos informations (2/4)"
                backdrop="static"
                notWithCloseButton={true}
            >
            <InfoPart2
                tester={tester}
                handleSubmit={handleSubmit2}
                onChangeCsp={onChangeCsp}
                error={error}
            />
            </Modals>
        );
    }


    /**
     * Renders the component for part 3 of the user information form.
     *
    */
    function renderPart3() {
        if (userInfo)
        return (
            <Modals
                show={part3}
                toggleShow={closeP3}
                header="Vos informations (3/4)"
                backdrop="static"
                notWithCloseButton={true}
            >
            <InfoPart3
                handleSubmit={handleSubmit3}
                onChange={onChange}
                onChangePhone={onChangePhone}
                pays={pays}
                error={error}
            />
            </Modals>
        );
    }

    /**
     * Renders the component for part 4 of the user information form.
     *
    */
    function renderPart4() {
        if (userInfo)
        return (
            <Modals
                show={part4}
                toggleShow={closeP4}
                header="Vos informations (4/4)"
                backdrop="static"
                notWithCloseButton={true}
            >
                <InfoPart4 
                    handleSubmit={handleSubmit4} 
                    os={os} 
                    osPc={osPc} 
                    onChangeOs={onChangeOs}    
                    error={error}
                />
            </Modals>
        );
    }
    
    
    /* RENDER */
    return (
        <>
            {renderPart1()}
            {renderPart2()}
            {renderPart3()}
            {renderPart4()}
        </>
    )
}

export default UserInfo;