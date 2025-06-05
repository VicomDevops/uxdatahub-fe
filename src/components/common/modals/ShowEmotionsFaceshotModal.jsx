//REACT IMPORT
import React, { useState } from "react";
//SERVICE IMPORT
import AnswersEmotions from "../../analyzes/facialRecognition/answersEmotions";
//COMPONENT IMPORT
import Modals from "./modal";
import EmotionTable from "../table/EmotionTable";
import ImagesCarousel from "../ImagesCarousel";
//LIBRARY IMPORT
import { Row, Col, CarouselCaption, CarouselItem } from "reactstrap";
import PropTypes from "prop-types";
//STYLE IMPORT
import "../common.css";


/**
 * A component to display a modal with a carousel of a tester's emotions for a given step.
 * 
 * @param {boolean} showFaceshots - Whether or not the modal should be shown.
 * @param {function} toggleSlideFaceshots - A function to toggle the modal.
 * @param {Object} emotionsStepAnswer - The emotions answers for the step.
 * @param {Object} scenarioData - The scenario data.
 * @return {JSX.Element} The rendered modal component.
 */
const ShowEmotionsFaceshotModal = ({ showFaceshots, toggleSlideFaceshots, emotionsStepAnswer }) => {
  //HOOKS
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  //DATA
  const items = emotionsStepAnswer.faceShots.map((faceShot, index) => ({
      altText: ``,
      caption: ``,
      id: index + 1,
      src: faceShot.image
  }));

  const currentFaceShot = emotionsStepAnswer.faceShots[activeIndex];

  //FUNCTION
  const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
  };
  
  const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
  };
  
  const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
  };
  
  const slides = items.map((item) => (
    <CarouselItem 
      className="carouselItem"
      tag="div"
      key={item.id}
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
    >
    <img src={item.src} alt={item.altText} />
    <CarouselCaption
        captionText={item.caption}
        captionHeader={item.caption}
    />
    </CarouselItem>
));

  //RENDER
  return (
    <Modals 
      show={showFaceshots} 
      centered 
      size="lg"
      header="Analyse des emotions"
      toggleShow={toggleSlideFaceshots}
      backdrop="static"
    >
      <Row className="justify-content-md-center">
        <Col md="6">
          <Col md="12">
            <ImagesCarousel 
              className="w-100"
              items={items}
              slides={slides}
              activeIndex={activeIndex}
              next={next}
              previous={previous}
              goToIndex={goToIndex}
              fade={true} 
              interval={10000} 
            />
          </Col>
          <Col md="12" className="mt-5">
            <AnswersEmotions data={emotionsStepAnswer} type="result"/>
          </Col>
        </Col>
        <Col md="6">
          <Col md="12">
            <AnswersEmotions data={emotionsStepAnswer} type="scenario" activeIndex={activeIndex} />
          </Col>
          <Col md="12 mt-3">
            <p className="tab-text">Liste des sentiments :</p>
            <EmotionTable currentFaceShot={currentFaceShot} />
          </Col>
        </Col>
      </Row>
    </Modals>
  );
};

//PROPTYPES
ShowEmotionsFaceshotModal.propTypes = {
    showFaceshots: PropTypes.bool,
    toggleSlideFaceshots: PropTypes.func,
    emotionsStepAnswer: PropTypes.object
};

//EXPORT
export default ShowEmotionsFaceshotModal;