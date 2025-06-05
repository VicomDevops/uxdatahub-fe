//REACT IMPORT
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const RenderInQuestionWindow = (props) => {
  const [container, setContainer] = useState(null);
  const newWindow = useRef(null);


  useEffect(() => {
    const div = document.createElement("div");
    setContainer(div);
  }, []);

  useEffect(() => {
    if (container) {
      const allScreenWidth = window.screen.availWidth;
      const screenWidth = allScreenWidth- (allScreenWidth / 4.05)
      const screenHeight = window.screen.availHeight;
      newWindow.current = window.open(
        props.url,
        "",
        `width=${screenWidth},height=${screenHeight}`
      );

      if (newWindow.current) {
        newWindow.current.document.body.appendChild(container);
        newWindow.current.location.replace(props.url);
      }

      return () => {
        if (newWindow.current) newWindow.current.close();
        localStorage.setItem("Test", true);
      };
    }
  }, [container, props.url]);

  useEffect(() => {

    const handleDoubleScreen = () => {
      let screen = window?.screen;
      if (screen && screen.isExtended) {
        console.log('Window is extended across multiple screens');
        newWindow.current.close();
      }
    };


    const checkFirstWindowClosed = setInterval(() => {
      if (newWindow.current && newWindow.current.closed) {
        console.log("La fenêtre est fermée");
        window.close();
        clearInterval(checkFirstWindowClosed);
      }
      window.addEventListener("resize", handleDoubleScreen);
    }, 500);



      return () => {
        window.removeEventListener("resize", handleDoubleScreen);
        clearInterval(checkFirstWindowClosed);
      }
  }, [newWindow]);
  return container && createPortal(props.children, container);
};

export default RenderInQuestionWindow;
