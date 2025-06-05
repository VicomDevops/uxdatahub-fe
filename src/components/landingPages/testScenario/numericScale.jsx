import React from "react";

/**
 * Generates a numeric scale based on the provided parameters.
 *
 * @param {object} props - The properties object.
 * @param {string} props.id - The ID of the scale.
 * @param {number} props.maxRange - The maximum range of the scale.
 * @param {function} props.setPicked - The function to set the picked value.
 * @param {number} props.picked - The currently picked value.
 * @param {function} props.handleChange - The function to handle changes.
 * @return {Array} An array of React components representing the numeric scale.
*/
const NumericScale = ({
    id,
    maxRange,
    setPicked,
    picked,
    handleChange,
  }) => {
    var values = [];
    let i = 1;
    if (maxRange > 10)
      maxRange = 10
    while (i <= maxRange) {
      values.push(i++);
    }
    return values.map((v) => {
      return (
        <div key={id} className="valuesScaleContainer">
          <div
            onClick={() => {
              setPicked(v);
              handleChange({ key: "answer", value: v.toString() });
            }}
            style={
              picked !== v
                ? {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 7,
                  width: 30,
                  borderRadius: 15,
                  backgroundColor: "#F5F5F5",
                  marginLeft: 3,
                }
                : {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 5,
                  width: 30,
                  borderRadius: 15,
                  backgroundColor: "green",
                  marginLeft: 3,
                }
            }
          >
            <span
              style={
                picked !== v
                  ? { fontSize: 20, fontWeight: "bold", color: "green" }
                  : { fontSize: 20, fontWeight: "bold", color: "white" }
              }
            >
              {v}
            </span>
          </div>
        </div>
      );
    });
};

export default NumericScale;