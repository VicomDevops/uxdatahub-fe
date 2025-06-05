import React, { useState } from 'react'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import userServices from '../../services/userServices'
import { useHistory } from "react-router";

function ResetPasword() {
    const history = useHistory()
    const [passwordObj, setPasswordObj] = useState({
        password: "",
        repassword: ""
    })

    onchange = (e) => {
        setPasswordObj({
            ...passwordObj, [e.target.name]: e.target.value
        })
    }
    const submit = () => {
        const searchParam = window.location.search;
        const token = searchParam.split('token=')
        const formData = new FormData();
        formData.append("password", passwordObj.password);
        formData.append("repassword", passwordObj.repassword);
        formData.append("token", token[1]);
        userServices.submitNewPwd(formData).then(res => history.push('/login'))
    }

    return (
        <div className="ctn__login">
            <div className="form__login">
                <span id="header__login">Réinitialiser votre mot de passe</span>
                <span id="header__login">Insight Data</span>
                <hr className="line" />
                <AvForm onValidSubmit={submit}>
                    <AvField name="password" value={passwordObj.password}
                        placeholder="Nouveau mot de passe" type="password"
                        onChange={onchange}
                        id='password__login'
                        validate={{
                            minLength: { value: 8, errorMessage: "Ce champ doit comporter au moins 8 caractères" },
                            required: { value: true, errorMessage: "Ce champ est obligatoire" },
                        }}
                    />
                    <AvField name="repassword" value={passwordObj.repassword}
                        placeholder="confirmer le mot de passe" type="password"
                        onChange={onchange}
                        id='password__login'
                        validate={{
                            minLength: { value: 8 },
                            required: { value: true, errorMessage: "Ce champ est obligatoire" },
                            match: { value: "password", errorMessage: "Les mots de passe saisis ne sont pas identiques" }
                        }}
                    />
                    <div className="btn_modal_ctn">
                        <Button type="submit" className="login__button" >
                            Confirmer
                        </Button>
                    </div>
                </AvForm>
            </div>
        </div>
    )
}
export default ResetPasword