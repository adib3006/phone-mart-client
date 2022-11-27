import React from 'react';

const Spinner = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="radial-progress animate-spin" style={{ "--value": 80 }}></div>
        </div>
    );
};

export default Spinner;