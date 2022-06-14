import React, {useEffect, useState} from 'react';
import './select.style.scss';
import axios from 'axios';

function Select({link, name, handleChange, parentId, root, curentValue}) {
    const [list, setList] = useState([]);

    curentValue = curentValue ? curentValue : "DEFAULT";
    if (parentId != null) link = link + parentId;
    useEffect(
        () => {
            if (parentId === null && root === false) return;
            axios.get(link)
                .then(function (response) {
                    const data = response.data
                    setList(Object.values(data));
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                });
        },
        [parentId, link, root]
    )

    return (
        <div>
            {list.length > 0 && (root || parentId) ? (
                <select className="custom-select" onChange={handleChange} name={name} defaultValue={"DEFAULT"}
                        value={curentValue}>
                    <option value="DEFAULT" disabled>Choose here</option>
                    {
                        list.map((element, index) => {
                            const arr = Object.values(element);
                            return (
                                <option className="custom-option" key={index} value={arr[0]}>
                                    {arr[1]}
                                </option>
                            )
                        })
                    }
                </select>) : (<select defaultValue={"DEFAULT"}></select>)}
        </div>
    )
}

/**
 * Option tag
 * @param {object} props Component props
 * @param {string} props.link link api to get list element with id and value
 * @param {string} props.name name of select tag
 * @param {function} props.handleChange handle change of select
 */
export default Select;