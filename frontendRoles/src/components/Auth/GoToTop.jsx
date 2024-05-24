import React from 'react';

function GoToTop() {
    const goToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
        // console.log("dkj")
    }

    return (
        <div 
            onClick={goToTop} 
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                padding: '10px 20px',
                backgroundColor: '#333',
                color: '#fff',
                borderRadius: '5px',
            }}
        >
            Top
        </div>
    );
}

export default GoToTop;
