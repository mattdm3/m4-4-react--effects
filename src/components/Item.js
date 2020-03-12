import React from "react"
import styled from "styled-components"

const StyledItems = styled.button`
    display: flex; 
    text-align: left;
    border: none;
    color: white;
    background-color: transparent;
    width: 550px; 
    justify-content: space-between;
    font-size: 26px; 
    padding: 15px 0; 
    border-bottom: 1px solid darkgray;
    cursor: pointer;

    h3{
        
        
        font-size: 35px; 
    }
    p {
        font-size: 16px; 
    }
`



const Item = ({ item, numOwned, cost, value, handleItemClick, index }) => {

    const ref = React.useRef(null);

    React.useEffect(() => {
        if (index === 0) {
            ref.current.focus();
        }
    }, []);

    return (
        <StyledItems
            ref={ref}
            index={index} onClick={handleItemClick} >
            <div>
                <h2>{item}</h2>
                <p>Cost: {cost} cookies. Produces {value} cookies/second. </p>
            </div>
            <h3>{numOwned}</h3>
        </StyledItems >
    )


}

export default Item; 