// HeaderItem.js
import React from 'react';
import SkeletonHeader from './skeletonHeader';
import { Label } from 'reactstrap';

const HeaderItem = ({ label, value, condition, skeleton, className = '', formatValue }) => {
    return (
        <div className="header-item">
            <Label className="header_label">{label}</Label>
            {skeleton ? (
                <SkeletonHeader />
            ) : (
                condition && (
                <span className={`header_span ${className}`}>
                    {formatValue ? formatValue(value) : value}
                </span>
                )
            )}
        </div>
    );
};

export default HeaderItem;
