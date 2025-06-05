import React from "react";
import AnswerDisplay from "../../common/AnswerDisplay";

/**
 * A component to display the answer of a tester for a given step with emotions feedback.
 *
 * @param {Object} props - The props of the component.
 *
 * @return {JSX.Element} The rendered component.
 */
const AnswersEmotions = (props) => {
    const { data, type, activeIndex } = props
    return (
      <div className="answers_container_emotion">
          <AnswerDisplay  label={type === "result" ? "Question" : "Scenario"} answer={type === "result" ? data?.step?.number : data?.step?.scenario?.title} />
          <AnswerDisplay  label={type === "result" ? "Question" : "Nom du Testeur"} answer={type === "result" ? data?.step?.question : `${data?.clientTester?.name} ${data?.clientTester?.lastname}`} />
          <AnswerDisplay  label={type === "result" ? "Réponse" : "N° d'image"} answer={type === "result" ? data?.answer : activeIndex && data?.faceShots[activeIndex]?.faceshotNumber} />
          <AnswerDisplay  label={type === "result" ? "Commentaire" : "Horaire"} answer={type === "result" ? data?.comment ?? "Aucun commentaire" : activeIndex && data?.faceShots[activeIndex]?.faceshotTimestamp} />
      </div>
    )
  }
  export default AnswersEmotions;

  