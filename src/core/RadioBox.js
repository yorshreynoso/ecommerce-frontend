import React, { Fragment, useState } from "react";

const RadioBox = ({prices, handleFilters}) => {
    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        handleFilters(event.target.value);
        setValue(event.target.value);

    }

    return (
        prices.map( (price, index) => {
            return(
                <div key={index}>
                    <input onChange={handleChange} value={`${price._id}` } name={price} type="radio" className="form-check-input"/>
                    <label className="form-check-label"> {price.name}</label>
                </div>
            )
        })
    );
}

export default RadioBox;