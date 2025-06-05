import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Generates a PDF from HTML content and downloads it.
 * 
 * @param {string} clientName - The name of the client for whom the PDF is generated.
 * 
 * This function captures the HTML content of the element with ID "pdf-content"
 * using `html2canvas`, converts it to an image, and then creates a PDF document
 * using `jsPDF`. The generated PDF is automatically downloaded with a filename
 * including the client's name.
 */

export const generateSinglePagePDF_Landscape = async (type="", scenarioName) => {
    
    let input = document.getElementById("pdf-content");

    const canvas = await html2canvas(input, { scale: 2 });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "mm", "A4");

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);


    pdf.save(`${type}_${scenarioName}.pdf`);
};

/**
 * Generates a PDF from HTML content and downloads it.
 * 
 * @param {string} ScenarioName - The name of the scenario for whom the PDF is generated.
 * 
 * This function captures the HTML content of the element with ID "pdf-content"
 * using `html2canvas`, converts it to an image, and then creates a PDF document
 * using `jsPDF`. The generated PDF is automatically downloaded with a filename
 * including the scenario's name.
 */
export const generateSinglePagePDF_Portrait = async (type="", scenarioName) => {
    
    let input = document.getElementById("pdf-content");

    const canvas = await html2canvas(input, { scale: 2 });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "A4");

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);


    pdf.save(`${type}_${scenarioName}{cenarioName}.pdf`);
};

/**
 * Generates a PDF from HTML content and downloads it.
 * 
 * @param {string} clientName - The name of the client for whom the PDF is generated.
 * 
 * This function captures the HTML content of the elements with IDs "pdf-content-0", "pdf-content-1", and "pdf-content-2"
 * using `html2canvas`, converts it to an image, and then creates a PDF document using `jsPDF`.
 * The generated PDF is automatically downloaded with a filename including the client's name.
 */
export const generatedMultiplePagePDF_Portrait = async (type="", scenarioName, nbPage) => {
    const pdf = new jsPDF("p", "mm", "A4");
    let input;

    for(let i = 0; i < nbPage; i++) {
        input = document.getElementById(`pdf-content-${i}`);
        
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);     
    }

    pdf.save(`${type}_${scenarioName}.pdf`);
};


/**
 * Generates a PDF from HTML content and downloads it.
 * 
 * @param {string} clientName - The name of the client for whom the PDF is generated.
 * 
 * This function captures the HTML content of the elements with IDs "pdf-content-0", "pdf-content-1", and "pdf-content-2"
 * using `html2canvas`, converts it to an image, and then creates a PDF document using `jsPDF`.
 * The generated PDF is automatically downloaded with a filename including the client's name.
 */
export const generatedMultiplePagePDF_Landscape = async (type="", scenarioName, nbPage) => {
    const pdf = new jsPDF("l", "mm", "A4");
    let input;

    for(let i = 0; i < nbPage; i++) {
        input = document.getElementById(`pdf-content-${i}`);
        
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);     
    }

    pdf.save(`${type}_${scenarioName}.pdf`);
};
