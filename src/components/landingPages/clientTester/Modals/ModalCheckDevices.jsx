import React from "react";
import Modals from '../../../common/modals/modal';
import { Button } from "reactstrap";

/**
 * Renders a modal for checking devices.
 *
 * @param {object} visible - Flag to control the visibility of the modal
 * @param {function} toggle - Function to toggle the visibility of the modal
 * @return {JSX.Element} The modal component
 */
const ModalCheckDevices = ({ visible, toggle, deviceError }) => {
  const { camera, micro, ecran} = deviceError
  console.log( deviceError);
  return (
    <Modals
      className="modal-sm center-modal align-items-start"
      show={visible}
      toggleShow={toggle}
      header="Erreur de détection"
      fullscreen={false}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div>
          <span style={{ textAlign: 'center', fontWeight: 'bold' }}>
            Veuillez vous assurer que :
          </span>
          <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <span style={{ textAlign: 'start' }}>
                 Vous avez bien partagé l'écran  de votre ordinateur : {ecran ? <span className="text-danger">Non activé</span> : <span className="text-success">Activé</span>}
              </span>
              <span style={{ textAlign: 'center' }}>
                 Vous avez bien ouvert votre caméra : {camera ?  <span className="text-danger">Non activé</span> : <span className="text-success">Activé</span>}
              </span>
              <span style={{ textAlign: 'center' }}>
                 Vous avez bien ouvert votre microphone : {micro ? <span className="text-danger">Non activé</span> : <span className="text-success">Activé</span>}
              </span>
          </div>
        </div>
        <Button className="btn__close" style={{ marginTop: 20 }} onClick={() => toggle()} >Fermer</Button>
      </div>
    </Modals>
  );
};
export default ModalCheckDevices;