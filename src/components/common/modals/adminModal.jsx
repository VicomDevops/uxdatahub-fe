import React, {useState, useEffect} from "react";
import {ModalHeader, Modal, ModalBody} from 'reactstrap';

const Modals = (props) => {
  const { show, toggleShow, header, modalSize, style, backdrop,fullscreen } = props
  const [backdropValue, setBackdropValue] = useState(backdrop);


  useEffect(() => {
    if (backdropValue !== 'static') {
      setBackdropValue(true);
    }
  }, [ backdropValue ]);

  return (
    <Modal
      style={{ minWidth: style ? style : "" }}
      className={modalSize ? modalSize : ""}
      isOpen={show}
      toggle={() => toggleShow()}
      aria-labelledby={modalSize ? `contained-modal-title-vcenter ${modalSize}` : "contained-modal-title-vcenter"}
      backdrop={backdropValue}
      centered
      fullscreen={fullscreen ? fullscreen : false}
    >
      <ModalHeader  toggle={() => toggleShow()}>{header}</ModalHeader>
      <ModalBody>
        {props.children}
      </ModalBody>
    </Modal>
  )
}
export default Modals;