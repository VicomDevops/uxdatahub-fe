import React from "react";
import { Row, Label, } from "reactstrap"

const Answers = (props) => {
    const { data } = props
    return (
      <div className="answers_container">
          <Row className="asnwer_row">
            <Label className="video_label">Réponse:</Label>
            <span className='video_span'>{data?.answer ?? 'Aucune données'}</span>
          </Row>
          <Row className="asnwer_row">
            <Label className="video_label">Commentaire:</Label>
            <span className='video_span'>{data?.comment ?? 'Aucune données'}</span>
          </Row>
          <Row className="asnwer_row" data-tip='Notre outil retranscrit ce qui a été dit par le testeur à loral'>
            <Label className="video_label" >Retranscription vidéo:</Label>
            <span className='video_span'>{data?.videoText ?? 'Aucune données'}</span>
          </Row>
      </div>
    )
  }
  export default Answers;