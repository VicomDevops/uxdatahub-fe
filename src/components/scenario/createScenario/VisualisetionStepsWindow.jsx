/**
 * React imports
 */
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import url from '../../../utils/https';

/**
 * Renders the content in a new window with specified URL and settings.
 *
 * @param {Object} props - The properties object containing the URL and other settings.
 * @return {Object} The content to be rendered in the new window.
*/
const VisualisetionStepsWindow = (props) => {
    const [container, setContainer] = useState(null);
    const newWindow2 = useRef(window);

    useEffect(() => {
      const div = document.createElement("div");
      setContainer(div);
    }, []);
  
    useEffect(() => {
      if (container) {
        const screenWidth = window.screen.availWidth/4.05;
        const screenHeight = window.screen.availHeight;
        newWindow2.current = window.open(
          props.url,
          "",
          `width=${screenWidth},height=${screenHeight},left=${5000000},top=0`
        );
        if(newWindow2?.current){
          newWindow2.current.onload = () => {
            newWindow2.current.postMessage({ isYourData: true, payload: props.data }, url);
          };
        }

        return () => newWindow2?.current?.close();
      }
    }, [container, props.url, props.data]);
  
    useEffect(() => {
      const checkFirstWindowClosed = setInterval(() => {
        if (newWindow2.current && newWindow2.current.closed) {
          // La première fenêtre est fermée, vous pouvez effectuer des actions ici
          console.log("La fenêtre est fermée");
          // Arrêter de vérifier
          clearInterval(checkFirstWindowClosed);
        }
      }, 1000); 
    }, [newWindow2]);
  
  
    return container && createPortal(props.children, container);
};
  
export default VisualisetionStepsWindow;