import React from 'react'
import "../Spinner.css"

const Spinner = () => {
    return (
        <div className="spinner_body">
        <h1 className="spinner_h1">Please wait while we are fetching details</h1>
        <div id="loading"></div>
        </div>
    )
}

export default Spinner