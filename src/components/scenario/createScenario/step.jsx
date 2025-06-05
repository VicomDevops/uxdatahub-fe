import React, { useState, memo } from "react";

/**
 * Reactstrap imports
 */
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Col, Input, Label, Tooltip, Button } from "reactstrap";
import ReactTooltip from "react-tooltip";

/**
 * Material UI imports
 */
import TextField from "@material-ui/core/TextField";

/**
 * assets import
 */
import Delete from "../../../assets/tdb/delete.svg";

const StepContainer = memo(
    ({
        type,
        etape,
        drop,
        inputs,
        onChangeStep,
        data,
        substruct,
        add,
        step,
        response,
        addStep,
        duplicate,
        onchange,
        onChangeResponse,
        onChangeType,
    }) => {
    /* ---------------------------------- HOOKS --------------------------------- */
    const [tooltipOpenURL, setTooltipOpenURL] = useState(false);
    const [tooltipOpenQuestion, setTooltipOpenQuestion] = useState(false);
    const [borneInfError, setBorneInfError] = useState("");
    const [borneSupError, setBorneSupError] = useState("");
    const [isStepValidated, setIsStepValidated] = useState(false);


    /* ----------------------------- RENDER HELPERS ----------------------------- */

    /**
     *  @description: toggle tooltip for Url
     */
    const toggleURL = () => setTooltipOpenURL(!tooltipOpenURL);

    /**
     *  @description: toggle tooltip for Question
     */
    const toggleQuestion = () => setTooltipOpenQuestion(!tooltipOpenQuestion);
    const handleError = (event, errors, values) => {
        if (errors.length === 0 && borneSupError === "" && borneInfError === "") {
            addStep(etape);
            setIsStepValidated(true);
        }
    };

    const onchangeBorn = (e) => {
        const { name, value } = e.target;
            if (name === "borneInf") {
                setBorneInfError("");
                const isValid = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/.test(value);
            if (isValid) {
                onchange(e);
                setBorneInfError("");
            } else {
                setBorneInfError("Veuillez entrer uniquement des lettres");
            }
        }

        if (name === "borneSup") {
            setBorneSupError("");
            const isValid = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/.test(value);
            if (isValid) {
                onchange(e);
                setBorneSupError("");
            } else {
                setBorneSupError("Veuillez entrer uniquement des lettres");
            }
        }
    };

    return (
        <div>
            <div className={(isStepValidated ? "step_container_valid" : "step_container")}>
                <Col md="3" className="etape_left">
                    <Label className="label__step">
                        {" "}
                        <span id="url">Url</span>
                        <Tooltip
                        placement="top"
                        isOpen={tooltipOpenURL}
                        autohide={false}
                        target="url"
                        toggle={toggleURL}
                    >
                        URL: inscrire l'adresse du site à tester
                        </Tooltip>
                    </Label>
                    <br />
                    <Label className="label__step">
                        {" "}
                        <span id="Question">Question</span>
                        <Tooltip
                        placement="top"
                        isOpen={tooltipOpenQuestion}
                        autohide={false}
                        target="Question"
                        toggle={toggleQuestion}
                    >
                        Question: formuler la question à laquelle l'utilisateur doit
                        répondre
                        </Tooltip>
                    </Label>
                    </Col>
                    <AvForm className="form-container" onSubmit={handleError}>
                        <Col md="6">
                        <div className="input__style_steps">
                            <div className="url_steps_style">
                            <AvField
                                id="url__style"
                                className="input__style_StepQustion"
                                name="url"
                                value={step.url}
                                onChange={onChangeStep}
                                placeholder="https://www.exemple.com/"
                                validate={{
                                required: {
                                    value: true,
                                    errorMessage:
                                    "Veulliez remplir ce champ s'il vous plait",
                                },
                                pattern: {
                                    value: "^https?://(www.)?",
                                    errorMessage: "Ce lien n'est pas valide",
                                },
                                }}
                            />
                            </div>
                        </div> 
                        <AvField
                            placeholder="Saisissez votre question"
                            value={step.question}
                            onChange={onChangeStep}
                            type="textarea"
                            name="question"
                            id="url__style"
                            validate={{
                            required: {
                                value: true,
                                errorMessage: "Veulliez remplir ce champ s'il vous plait",
                            },
                            }}
                        />
                        {type === "scale" && (
                            <>
                            <div className="display__flex__row">
                                <div className="scaleEtapeSection">
                                <AvField
                                    value={1}
                                    type="number"
                                    name="minScale"
                                    className="scaleField"
                                    readOnly
                                />
                                <span style={{ marginTop: 12 }}>à</span>
                                <AvField
                                    type="number"
                                    onChange={onchange}
                                    name="maxScale"
                                    className="scaleField"
                                    value={
                                    data.questionChoices?.maxScale
                                        ? data.questionChoices?.maxScale
                                        : ""
                                    }
                                    validate={{
                                    required: {
                                        value: true,
                                        errorMessage:
                                        "Veulliez remplir ce champ s'il vous plait",
                                    },
                                    max: { value: 10, errorMessage: "le maximum est 10" },
                                    min: { value: 3, errorMessage: "le minimum est 3" },
                                    }}
                                />
                                </div>
                            </div>
                            <span className="etapenotion">
                                {" "}
                                L'échelle de notation doit être du négatif vers le positif.{" "}
                            </span>
                            <div className="display__flex__col" style={{ width: "40%" }}>
                                <TextField
                                    id="outlined-textarea"
                                    error={borneInfError}
                                    className="mt-3"
                                    onChange={onchangeBorn}
                                    name="borneInf"
                                    placeholder="Libellé (facultatif)"
                                />
                                <Label className="label__step_borns">
                                Borne inférieure :{" "}
                                </Label>
                                {borneInfError !== "" && (
                                <Label className="label__step_borns_error">
                                    {borneInfError}
                                </Label>
                                )}

                                <TextField
                                    id="outlined-textarea"
                                    error={borneSupError}
                                    className="mt-3"
                                    onChange={onchangeBorn}
                                    name="borneSup"
                                    placeholder="Libellé (facultatif)"
                                />
                                <Label className="label__step_borns">
                                Borne supérieure :{" "}
                                </Label>
                                {borneSupError !== "" && (
                                <Label className="label__step_borns_error">
                                    {borneSupError}
                                </Label>
                                )}
                            </div>
                            <span className="etapenotion">
                                {" "}
                                Les bornes doivent être des alphabets.{" "}
                            </span>
                            </>
                        )}
                        {type === "close" && (
                            <>
                            <div
                                style={{
                                flexDirection: "row",
                                display: "flex",
                                marginTop: "2em",
                                paddingLeft: "inherit",
                                }}
                            >
                                <Label className="radio__label">
                                <Input type="radio" disabled />
                                reponse 1
                                </Label>
                                <AvField
                                    placeholder="choix 1"
                                    value={response?.choice1}
                                    type="text"
                                    onChange={onChangeResponse}
                                    name="choice1"
                                    id="url__style"
                                    validate={{
                                        required: {
                                        value: true,
                                        errorMessage:
                                            "Veulliez remplir ce champ s'il vous plait",
                                        },
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                flexDirection: "row",
                                display: "flex",
                                paddingLeft: "inherit",
                                }}
                            >
                                <Label className="radio__label">
                                <Input type="radio" disabled />
                                reponse 2
                                </Label>
                                <AvField
                                    placeholder="choix 2"
                                    value={response?.choice2}
                                    type="text"
                                    onChange={onChangeResponse}
                                    name="choice2"
                                    id="url__style"
                                    validate={{
                                        required: {
                                        value: true,
                                        errorMessage:
                                            "Veulliez remplir ce champ s'il vous plait",
                                        },
                                    }}
                                />
                            </div>
                            {inputs.map((input, index) => (
                                <div
                                style={{
                                    flexDirection: "row",
                                    display: "flex",
                                    paddingLeft: "inherit",
                                }}
                                >
                                <Label className="radio__label">
                                    <Input type="radio" disabled />
                                    reponse {index + 3}
                                </Label>
                                <AvField
                                    placeholder={`${"choix".concat(" ", index + 3)}`}
                                    type="text"
                                    onChange={onChangeResponse}
                                    value={response?.[`${"choice".concat("", index + 3)}`]}
                                    name={"choice".concat("", index + 3)}
                                    id="url__style"
                                    validate={{
                                    required: {
                                        value: true,
                                        errorMessage:
                                        "Veulliez remplir ce champ s'il vous plait",
                                    },
                                    }}
                                />
                                <img
                                    src={Delete}
                                    alt="delete"
                                    className="delete__icon"
                                    onClick={() => substruct(etape)}
                                />
                                </div>
                            ))}
                            <div
                                style={{
                                flexDirection: "row",
                                display: "flex",
                                justifyContent: "space-between",
                                }}
                            >
                                <Button className="add-option" onClick={() => add(etape)}>
                                    {" "}
                                    Ajouter une option
                                </Button>
                            </div>
                            </>
                        )}
                        </Col>
                        <div className="step_left_side">
                        <div className="step_type_selector">
                            <Input
                                type="select"
                                name="select"
                                className="select_step"
                                onChange={onChangeType}
                            >
                            <option value="open" selected>
                                Question ouverte
                            </option>
                            <option value="close">Choix multiples</option>
                            <option value="scale">Echelle de notation</option>
                            </Input>
                        </div>
                        <div className="icons__style">
                            {/* <Button className="fa fa-eye fa-md" data-tip="visualiser" onClick={() => visualise(etape)} /> */}
                            <Button
                                className="fa fa-files-o fa-md"
                                data-tip="Dupliquer"
                                onClick={() => duplicate(etape)}
                            />
                            <Button
                                className="fa fa-trash-o fa-md"
                                data-tip="Supprimer"
                                onClick={() => drop(etape - 1)}
                            />
                            <Button className="fa fa-check fa-md" disabled={isStepValidated} data-tip="Valider" />
                        </div>
                        </div>
                    </AvForm>
                <ReactTooltip />
            </div>
        </div>
    )}
);
export default StepContainer;
