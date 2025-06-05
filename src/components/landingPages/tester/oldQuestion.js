import React from "react";
import { Button, Row, Input, Label, Col } from "reactstrap";
import Draggable from "react-draggable";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import data from "./data.json";
import upArrow from "../../../assets/upArrow.png";
import downArrow from "../../../assets/downArrow.png";
import axios from "axios";
import { URL_API } from "../../../config.json";

import ModalQuiz from "./ModalQuiz";
import httpServices from "../../../services/httpServices";

const QuestionItemSingleChoice = ({
  questionTitle,
  responses,
  isMultipleResponse,
  handleChange,
  questionNum,
  isChecked,
  setIsDeveloped,
  isDeveloped,
}) => {
  return (
    <Col className="mt-1">
      <div className="question-container">
        <span className="question-typo">{questionTitle}</span>
        <div onClick={() => setIsDeveloped(!isDeveloped)}>
          <img
            style={{
              height: 30,
              width: 30,
              resizeMode: "contain",
              marginRight: -20,
            }}
            src={isDeveloped ? upArrow : downArrow}
            alt=""
          />
        </div>
      </div>
      {isDeveloped && (
        <div>
          {responses?.map((response) => {
            return (
              <div className="d-flex align-items-center mt-1">
                <div style={{ display: "flex", width: 390 }}>
                  <Radio
                    checked={isChecked({
                      questionNum,
                      response,
                      isMultipleResponse,
                    })}
                    onChange={() =>
                      handleChange({
                        questionNum,
                        isMultipleResponse,
                        response,
                      })
                    }
                    style={{
                      color: "green",
                    }}
                    value="a"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "A" }}
                  />
                  <span className="ml-2">{response}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Col>
  );
};
const QuestionItemMultiChoice = ({
  questionTitle,
  responses,
  isMultipleResponse,
  handleChange,
  questionNum,
  isChecked,
}) => {
  return (
    <Col className="mt-1">
      <div className="question-container">
        <span className="question-typo"> {questionTitle}</span>
      </div>
      <div>
        {responses?.map((response) => {
          return (
            <div className="d-flex align-items-center mt-1 mr-1 pr-1">
              <div style={{ display: "flex", width: 390 }}>
                <Checkbox
                  checked={isChecked({
                    questionNum,
                    response,
                    isMultipleResponse,
                  })}
                  onChange={() =>
                    handleChange({ questionNum, isMultipleResponse, response })
                  }
                  style={{
                    color: "green",
                  }}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <span className="ml-2">{response}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Col>
  );
};
const Questions = ({ visible, handleClose, match }) => {
  const [responses, setResponses] = React.useState([]);
  const [indice, setIndice] = React.useState(0);
  const [isDeveloped, setIsDeveloped] = React.useState(true);
  const [scenario, setScenario] = React.useState([]);
  React.useEffect(async () => {
    const response = await axios
      .get(URL_API + `/api/scenario/${match?.params?.id}`, {
        headers: httpServices.getAuthorization(),
      })
      .then((response) => {
        setScenario(response?.data?.steps);
      })
      .catch((error) => {
        console.log(error, "err");
      });
  }, [isDeveloped]);
  function handleChangeResponse({ questionNum, isMultipleResponse, response }) {
    let exist = responses?.find((res) => res?.questionNum == questionNum);
    if (!exist) {
      return setResponses([
        ...responses,
        {
          questionNum,
          isMultipleResponse,
          response: !isMultipleResponse ? response : [response],
        },
      ]);
    }
    if (isMultipleResponse) {
      const responseExist = exist?.response?.some((r) => r === response);
      if (responseExist)
        exist.response = exist?.response.filter((r) => r !== response);
      else {
        exist?.response?.push(response);
      }
      setResponses([
        ...responses?.map((r) =>
          r?.questionNum === exist?.questionNum ? exist : r
        ),
      ]);
    } else {
      exist.response = response;
      setResponses([
        ...responses?.map((r) =>
          r?.questionNum === exist?.questionNum ? exist : r
        ),
      ]);
    }
  }
  function isChecked({ questionNum, isMultipleResponse, response }) {
    const exist = responses?.find((res) => res?.questionNum == questionNum);
    if (!exist) return false;
    if (!isMultipleResponse) {
      return exist?.response === response;
    }
    return exist?.response?.some((r) => r === response);
  }
  const question = data?.enquette[indice];

  return (
    <>
      <div style={{ backgroundColor: "white", borderRadius: 10 }}>
        {/* <Row className="padding-modal">
        </Row>
        <Row>
          <Col md="12" lg="12" className="questions">
            <div style= {{width:1000}}>
            {question?.isMultipleResponse ? (
              <QuestionItemMultiChoice
                {...question}
                isChecked={isChecked}
                handleChange={handleChangeResponse}
              />
            ) : (
              <QuestionItemSingleChoice
                {...question}
                isChecked={isChecked}
                handleChange={handleChangeResponse}
              />
            )}
            </div>
            <div className="column-left-comment ">
              <Label className="comment-label">Commentaire</Label>
              <Input placeholder={"Commentaire"} />
            </div>
            {data?.enquette?.length - 1 >= indice && (
          <Col style={{ display: "flex", justifyContent: "flex-end" , width: 40, height:50}}>
            <Button color="success" onClick={() => setIndice(indice + 1)}>
              {"   Suivant   "}
            </Button>
          </Col>
        )}
          </Col>
        </Row> */}
        <Draggable>
          <div className="quiz">
            <Row>
              <Col md="12" lg="12" className="questions">
                <div style={{ width: 1000 }}>
                  {question?.isMultipleResponse ? (
                    <QuestionItemMultiChoice
                      {...question}
                      isChecked={isChecked}
                      handleChange={handleChangeResponse}
                      setIsDeveloped={setIsDeveloped}
                      isDeveloped={isDeveloped}
                    />
                  ) : (
                    <QuestionItemSingleChoice
                      {...question}
                      isChecked={isChecked}
                      handleChange={handleChangeResponse}
                      setIsDeveloped={setIsDeveloped}
                      isDeveloped={isDeveloped}
                    />
                  )}
                </div>
                {isDeveloped && (
                  <div className="column-left-comment ">
                    <Label className="questions-typo ">Commentaire</Label>
                    <Input placeholder={"Commentaire"} />
                  </div>
                )}
                {data?.enquette?.length - 1 >= indice && (
                  <div style={{ display: "flex", width: "70%" }}>
                    <Col
                      style={{ width: 40, height: 50, alignItems: "flex-end" }}
                    >
                      <Button
                        color="success"
                        onClick={() => setIndice(indice + 1)}
                      >
                        {"   Suivant   "}
                      </Button>
                    </Col>
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </Draggable>
        <iframe
          src="https://www.europcar.fr/fr-fr?gclsrc=aw.ds&gclsrc=aw.ds&gclid=Cj0KCQjwnueFBhChARIsAPu3YkRMD92CU7ocynJOf-7zYUA6FN9ty7qjtyYbH4TeQwnZ8MWdPutepp0aAhamEALw_wcB"
          title="W3Schools Free Online Web Tutorials"
          className="iframe"
        ></iframe>
        <ModalQuiz />
      </div>
    </>
  );
};
export default Questions;
