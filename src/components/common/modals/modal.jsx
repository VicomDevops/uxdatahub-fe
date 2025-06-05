import React, {useState, useEffect} from "react";
import {ModalHeader, Modal, ModalBody} from 'reactstrap';

/**
 * A custom modal component.
 *
 * @param {object} props - The props.
 * @param {boolean} props.show - Whether the modal is visible.
 * @param {function} props.toggleShow - The function to toggle the visibility of the modal.
 * @param {string} props.header - The header of the modal.
 * @param {string} [props.modalSize] - The size of the modal.
 * @param {string} [props.style] - The style of the modal.
 * @param {string} [props.backdrop] - The backdrop of the modal.
 * @param {boolean} [props.fullscreen] - Whether the modal is full screen.
 * @param {boolean} [props.notWithCloseButton] - Whether the modal does not have a close button.
 * @param {string} [props.size] - The size of the modal.
 *
 * @return {JSX.Element} The modal component.
 */
const Modals = (props) => {
  const { show, toggleShow, header, modalSize, style, backdrop, fullscreen, notWithCloseButton = false, size } = props
  const [backdropValue, setBackdropValue] = useState(backdrop);

  useEffect(() => {
    if (backdropValue !== 'static') {
      setBackdropValue(true);
    }
  }, [ backdropValue ]);

  return (
    <Modal
      style={{ minWidth: style ? style : "" }}
      isOpen={show}
      toggle={() => toggleShow()}
      aria-labelledby={modalSize ? `contained-modal-title-vcenter ${modalSize}` : "contained-modal-title-vcenter"}
      backdrop={backdropValue}
      centered
      fullscreen={fullscreen ? fullscreen : "false"}
      size={size ? size : "l"}
    >
      {
        header && 
        notWithCloseButton ? 
          <ModalHeader>{header}</ModalHeader>
          : 
          <ModalHeader toggle={() => toggleShow()}>{header}</ModalHeader>
      }
      <ModalBody>
        {props.children}
      </ModalBody>
    </Modal>
  )
}
export default Modals;