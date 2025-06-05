//REACT IMPORT
import React, { useCallback, useMemo } from 'react';
//LIBRARY IMPORT
import PropTypes from 'prop-types';
//ASSET IMPORT
import ReportNegativePoints from '../../../../../assets/Report/ReportNegativePoints.png';
import ReportPositivePoints from '../../../../../assets/Report/ReportPositivePoints.png';
import ReportConcurrence from '../../../../../assets/Report/ReportConcurrence.png';
import ReportRecomendation from '../../../../../assets/Report/recomendation.png';


/**
 * A component to display a section of a report
 * 
 * @param {{title: string, className: string, children: ReactNode, etat: string}} props
 * @prop {string} title - the title of the section
 * @prop {string} className - the className of the section
 * @prop {ReactNode} children - the elements to be displayed in the section
 * @prop {string} etat - the state of the section, can be "Positif" or "Negatif", determines the color and icon of the section
 */
const RapportSection = ({title, className, children, etat}) => {

    //HOOKS
    let titleClassName = useMemo(() => {
        if(etat === "Positif"){
            return ' section-title-strengths'
        }else if(etat === "Negatif") {
            return 'section-title-improvements'
        }
    }, [etat])

    const icon = useCallback(() => {
    if(etat === "Positif"){
        return(
            <div className='iconStyleContainer'>
                <div className='iconStyle'>
                    <img src={ReportPositivePoints} alt={title} />
                </div>
            </div>
        )
    }else if(etat === "Negatif") {
        return(
            <div className='iconStyleContainer'>
                <div className='iconStyle'>
                    <img src={ReportNegativePoints} alt={title} />
                </div>   
            </div>
        )
    }else if (etat === "Recommandations"){
        return (
            <div className='iconStyleRightSide'>
                <img src={ReportRecomendation} alt={title} />
            </div> 
        )
    }else if (etat === "Concurrence"){
        return (
            <div className='iconStyleRightSide'>
                <img src={ReportConcurrence} alt={title} />
            </div> 
        )
    }
    }, [etat, title]);
    
    //RENDER
    return (
        <div className={className}>
            <div className='section-title-container'>
                <h5 className={`section-title ${titleClassName} `}>{title}</h5>
                {icon()}
            </div>
            {children}
        </div>
    )
}

//PROPTYPES
RapportSection.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    etat: PropTypes.string
};

//EXPORT
export default RapportSection;