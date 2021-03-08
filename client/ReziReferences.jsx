import React from "react";
import PropTypes from 'prop-types';

export function ReziReferences(props) {
    return <div className="references">{props.references}</div>
}

ReziReferences.propTypes = {
    references: PropTypes.string
}