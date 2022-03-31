import React, {useState, useEffect} from "react";


const Checkbox = ( {categories, handleFilters}) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = c => () => { // const handleToggle = c => { we dont use it like this because it is a trick to dont do so many petitions
    
        const currentCategoryId     = checked.indexOf(c); //return the first index or -1
        const newCheckCategoryId    = [...checked];

        //if currently checked was not already in checked state -> push, else  pull/take off

        if(currentCategoryId === -1 ) {
            newCheckCategoryId.push(c)
        } else {
            newCheckCategoryId.splice(currentCategoryId, 1)
        }

        setChecked(newCheckCategoryId);
        handleFilters(newCheckCategoryId);
    }

    return (
        categories.map( (category, index) => {
            return(
                <li key={index} className="list-unstyled">
                    <input onChange={handleToggle(category._id)} value={checked.indexOf(category._id === -1)} type="checkbox" className="form-check-input"/>
                    <label className="form-check-label"> {category.name}</label>
                </li>
            )
        })
    );
}

export default Checkbox;