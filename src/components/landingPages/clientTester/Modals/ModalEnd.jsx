import React from "react";
import Modals from '../../../common/modals/modal';
import { Button } from "reactstrap";

const ModalEnd = ({ visible, toggle }) => {
  return (
    <Modals
      className="modal-sm center-modal align-items-start"
      show={visible}
      toggleShow={toggle}
      header="C'est terminé !"
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ textAlign: 'center' }}>
          Un grand merci pour tes Insights &#128521; Ton aide est
          <br />
          précieuse. Grâce à tes réponses, tu fais avancer la
          <br />
          marque dans l'optimisation de son expérience client.
        </span>
        <span style={{ textAlign: 'center', marginTop: 20 }}>
          S'il te reste encore un peu de temps, n'hesite pas à
          <br />
          participer à un nouveau test UX DATAHUB.
        </span>
        <Button className="btn__close" style={{ marginTop: 20 }} onClick={() => toggle()} >Fermer</Button>
      </div>
    </Modals>
  );
};
export default ModalEnd;