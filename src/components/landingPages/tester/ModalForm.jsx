import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
} from "reactstrap";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import data from "./data.json";
import Logo from "../../../assets/logo-vector.svg";

const QuestionItemSingleChoice = ({
  questionTitle,
  responses,
  isMultipleResponse,
  handleChange,
  questionNum,
  isChecked,
}) => {
  return (
    <Col className="mt-1">
      <strong>{questionTitle}</strong>
      <div>
        {responses?.map((response) => {
          return (
            <div className="d-flex align-items-center mt-1">
              <Radio
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
                value="a"
                name="radio-button-demo"
                inputProps={{ "aria-label": "A" }}
              />
              <span className="ml-2">{response}</span>
            </div>
          );
        })}
      </div>
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
      <strong>{questionTitle}</strong>
      <div>
        {responses?.map((response) => {
          return (
            <div className="d-flex align-items-center mt-1">
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
          );
        })}
      </div>
    </Col>
  );
};
const ModalForm = ({ visible, handleClose }) => {
  const [responses, setResponses] = React.useState([]);
  function handleChangeResponse({ questionNum, isMultipleResponse, response }) {
    let exist = responses?.find((res) => res?.questionNum === questionNum);
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
    const exist = responses?.find((res) => res?.questionNum === questionNum);
    if (!exist) return false;
    if (!isMultipleResponse) {
      return exist?.response === response;
    }
    return exist?.response?.some((r) => r === response);
  }
  return (
    <Modal
      isOpen={visible}
      className="modal-xl center-modal"
      toggle={handleClose}
    >
      <Row className="padding-modal">
        <Col md="6" sm="6" lg="6" className="p-2 d-flex justify-content-start">
          <img style={{ maxWidth: "170px" }} src={Logo} alt="Logo" />
        </Col>
        <Col
          md="6"
          sm="6"
          lg="6"
          className="p-2 d-flex justify-content-end height-X"
        >
          <Button onClick={handleClose}>
            <span>X</span>
          </Button>
        </Col>
      </Row>
      <ModalBody>
        <Col
          md="12"
          lg="12"
          className="d-flex flex-column justify-content-space-around"
        >
          {data?.enquette?.map((item) =>
            item?.isMultipleResponse ? (
              <QuestionItemMultiChoice
                {...item}
                isChecked={isChecked}
                handleChange={handleChangeResponse}
              />
            ) : (
              <QuestionItemSingleChoice
                {...item}
                isChecked={isChecked}
                handleChange={handleChangeResponse}
              />
            )
          )}
        </Col>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleClose} className="btn-success">
          {" "}
          Envoyer
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default ModalForm;
