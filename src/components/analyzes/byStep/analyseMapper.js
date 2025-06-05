/**
 * Adds a new analysis to the list of analyses.
 *
 * @param {Array} analyses - The array of existing analyses.
 * @param {Object} analyse - The analysis object to be added.
 * @param {number} testerNumber - The number of the tester.
 * @return {Array} The updated array of analyses.
 */
export const analyseMapper = (analyses, analyse, testerName, tester_id) => {
    return [
        ...analyses,
        {
            id: analyse.answer_id,
            score: analyse.score,
            magnitude: analyse.magnitude,
            question: analyse.question,
            videoText: analyse.videoText,
            duration: analyse.duration,
            answer: analyse.answer,
            videoEtap: analyse.video,
            comment: analyse.comment,
            clientComment: analyse.clientComment,
            tester: testerName,
            tester_id: tester_id
        },
    ];
};