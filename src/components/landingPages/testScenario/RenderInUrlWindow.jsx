//REACT IMPORT
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
//SERVICE IMPORT
import scenarioServices from "../../../services/scenarioServices.js"

/**
 * Renders a React component in a new window.
 *
 * @param {object} props - The properties passed to the component.
 * @param {string} props.url - The URL to open in the new window.
 * @param {object} props.player - The player object.
 * @param {string} props.uri - The URI.
 * @param {string} props.idTest - The test ID.
 * @param {ReactNode} props.children - The React component to render in the new window.
 * @return {ReactPortal} The React portal containing the rendered component.
 */
const RenderInUrlWindow = (props) => {
    const [container, setContainer] = useState(null);
    const newWindow2 = useRef(window);
    useEffect(() => {
      const div = document.createElement("div");
      setContainer(div);
    }, []);
  
    // Open the new window
    useEffect(() => {
      if (container) {
        const screenWidth = window.screen.availWidth/4.05;
        const screenHeight = window.screen.availHeight;
        const leftPosition = window.screen.availWidth;
        newWindow2.current = window.open(
          props.url,
          "",
          `width=${screenWidth},height=${screenHeight},left=${leftPosition},top=0`
        );
        newWindow2.current?.document.body.appendChild(container);
        const curWindow = newWindow2.current;

        curWindow.my_childs_special_setting = props.player;
        curWindow.my_childs_special_setting2 = props.uri;
        curWindow.my_childs_special_setting3 = props.idTest;
        return () => curWindow.close();
      }
    }, [container, props.idTest, props.player, props.uri, props.url]);
  
    // Check if the new window 1  is closed close this window and set the test as interrupted
    useEffect(() => {
      const checkFirstWindowClosed = setInterval(async () => {
        if (newWindow2.current && newWindow2.current.closed) {
          try {
            await scenarioServices.setTestAsInterrupted(props.idTest);
            window.location.reload();
          } catch (error) {
            console.error("Failed to set the test as interrupted:", error);
          } finally {
            clearInterval(checkFirstWindowClosed);
          }
        }
      }, 1000);
    }, [newWindow2, props.idTest]);
  
    // Check if the window is double screen if true close this window
    useEffect(() => {
      const handleDoubleScreen = () => {
        let screen = window?.screen;
          if (screen && screen.isExtended) {
            console.log('Window is extended across multiple screens');
            window.close();
          }
      };
  
      window.addEventListener("resize", handleDoubleScreen);
  
      return () => {
        window.removeEventListener("resize", handleDoubleScreen);
      };
    }, []);
  
    return container && createPortal(props.children, container)

};

export default RenderInUrlWindow;