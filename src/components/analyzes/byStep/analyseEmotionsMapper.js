/**
 * Adds a new analysis to the list of analyses.
 *
 * @param {Array} analyses - The array of existing analyses.
 * @param {Object} analyse - The analysis object to be added.
 * @param {number} testerNumber - The number of the tester.
 * @return {Array} The updated array of analyses.
 */
export const analyseEmotionsMapper = (analyses, analyse, testerName, tester_id) => {
    return [
        ...analyses,
        {
            id: analyse.answer_id,
            question: analyse.question,
            duration: analyse.duration,
            happy: analyse.happy,
            calm: analyse.calm,
            angry: analyse.angry,
            sad: analyse.sad,
            confused: analyse.confused,
            disgusted: analyse.disgusted,
            fear: analyse.fear,
            surprised: analyse.surprised,
            answer: analyse.answer,
            comment: analyse.comment,
            clientComment: analyse.clientComment,
            tester: testerName,
            tester_id: tester_id
        },
    ];
};