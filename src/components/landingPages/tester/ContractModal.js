import React, {useState} from "react";
import {
  Modal,
  ModalBody,
  Button,
  Col,
} from "reactstrap";

const labels = {
  contract:
    "Random text which you can use in your documents or web designs.\n How does it work? First we took many books available on project Gutenberg and stored their contents in a database. Then a computer algorithm takes the words we stored earlier and shuffles them into algorithm takes the words we stored earlier and shuffles them into.\n want the person viewing the resulting random text to focus on the design we are presenting, rather than try to read and understand the text. It is better than Lorem ipsum because it can produce text in many languages and in particular: Chinese, Dutch, English, Finnish, French, German, Greek, Hebrew, Italian, Japanese, Latin, Polish, Portuguese, Russian, Serbian and Spanish.\n Also when you use plain Lorem ipsum text, your design will look like a million other designs out there. With Random Text Generator your designs will look more unique while still containing text which truly means nothing many books available on project Gutenberg and stored their contents in a database. Then a computer algorithm takes the words we stored earlier and shuffles them into algorithm takes the words we stored earlier and shuffles them into.\n want the person viewing the resulting random text to focus on the design we are presenting, rather than try to read and understand the text. It is better than Lorem ipsum because it can produce text in many languages and in particular: Chinese, Dutch, English, Finnish, French, German, Greek, Hebrew, Italian, Japanese, Latin, Polish, Portuguese, Russian, Serbian and Spanish.\n Also when you use plain Lorem ipsum text, your design will look like a million other designs out there. With Random Text Generator your designs will look more unique while still containing text which truly means nothing" ,
};

const ContractModal = ({ visible, handleClose }) => {

  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <Modal
      isOpen={visible}
      className="modal-xl center-modal"
      //  className="center-modal modal-xl"
      toggle={handleClose}
    >
      <Col md="12" sm="12" lg="12" className="p-2 d-flex justify-content-end">
        <Button onClick={handleClose}>
          <span>X</span>
        </Button>
      </Col>

      <ModalBody>
        <Col
          md="12"
          lg="12"
          className="d-flex flex-column justify-content-space-around"
        >
          <span style={{ fontWeight: "bold", fontSize: 25 }}>
            Contrat d'utilisateur.
          </span>
          <div className="pop-up-contract">{labels?.contract}</div>
        </Col>
      </ModalBody>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginLeft: 40,
        }}
      >
        <label>
          <input type="checkbox" checked={checked} onChange={handleChange} />
          <span style={{ fontWeight: "bold", paddingLeft: 5 }}>
            J'ai lu et j'accepte les termes et conditions du contrat.
          </span>
        </label>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 20,
        }}
      >
        <Button onClick={checked && handleClose} className={checked ? "btn-success" : "btn-secondary" }>
          {" "}
          Appliquer et fermer
        </Button>
      </div>
    </Modal>
  );
};
export default ContractModal;
