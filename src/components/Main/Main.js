import React, { useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './styles.sass';

import { findNumber } from '../../Utils';

const Main = () => {
    const history = useHistory();
    const location = useLocation();
    const params = useRef(new URLSearchParams(location.search)); //Used to save input value in the url
    const [inputValue, setInputValue] = useState(params.current.get('input') || '');
    const [selectedLayouts, setSelectedLayouts] = useState([]);
    const [validLayout, setValidLayout] = useState(true);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        params.current.set('input', e.target.value);
    };

    const handleLayouts = () => {
        const layoutsStr = inputValue.split(',');
        const layoutsArray = [];
        let heightSum = 0;
        layoutsStr.forEach((layout) => {
            const count = findNumber(layout);
            const size = layout.replace(count, '');
            for (let i = 0; i < count; i++) {
                layoutsArray.push(size);
            }
        });
        heightSum += layoutsArray.filter((item) => item === 'XL').length;
        heightSum += layoutsArray.filter((item) => item === 'L').length;
        heightSum += Math.ceil(layoutsArray.filter((item) => item === 'SM').length / 2);
        history.push({ pathname: '/', search: params.current.toString() });
        setValidLayout(heightSum <= 4);
        setSelectedLayouts(layoutsArray);
    };

    return (
        <div className="container">
            <div className="input-wrapper">
                <input type="text" onChange={handleInputChange} value={inputValue} />
                <button onClick={handleLayouts}>Generate</button>
            </div>
            {validLayout ? (
                <div className="layout-wrapper">
                    {selectedLayouts.map((layout, index) => {
                        return (
                            <div key={`slot${index}`} className={`layout${layout}`}>
                                slot-{index + 1}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>The layout you have entered is not valid!</p>
            )}
        </div>
    );
};

export default Main;
