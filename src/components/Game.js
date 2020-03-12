import React from 'react';
import styled from 'styled-components';

import cookieSrc from '../cookie.svg';
import Item from "./Item"
import useInterval from "../hooks/use-interval.hook"

const items = [
  { id: 'cursor', name: 'Cursor', cost: 10, value: 1 },
  { id: 'grandma', name: 'Grandma', cost: 100, value: 10 },
  { id: 'farm', name: 'Farm', cost: 1000, value: 80 },
];


const Game = () => {
  const [numCookies, setNumCookies] = React.useState(100)

  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });



  let cookiesPerTick = 0;

  //Change document title 

  React.useEffect(() => {
    document.title = numCookies + " cookies";

    return () => {
      document.title = "Cookie Clicker Workshop"
    }
  }, [numCookies])

  //KEYPRESS

  React.useEffect(() => {
    const doSomething = (e) => {
      if (e.key === " ") {
        setNumCookies(numCookies + 1)
      }
    }
    window.addEventListener("keypress", doSomething)

    return () => {
      window.removeEventListener("keypress", doSomething)
    }
  })

  //FOCUS 

  // const cookieRef = React.useRef(null);

  // React.useEffect(() => {
  //   console.log(cookieRef)
  //   if (cookieRef) {
  //     cookieRef.current.focus();
  //   }

  // }, [])


  //INTERVAL

  const calculateCookiesPerTick = (purchased) => {
    let cursorTick = purchased.cursor * items[0].value;
    let grandmaTick = purchased.grandma * items[1].value;
    let farmTick = purchased.farm * items[2].value;
    cookiesPerTick = cursorTick + grandmaTick + farmTick
    return cookiesPerTick
  }
  {
    useInterval(() => {
      const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
      setNumCookies(numCookies + numOfGeneratedCookies)
    }, 1000)
  }




  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>
            {calculateCookiesPerTick(purchasedItems)}
          </strong> cookies per second
        </Indicator>
        <Button >
          <Cookie onClick={() => { setNumCookies(numCookies + 1) }} src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {/* //TODO: Add item instances here, 1 for each item type.   */}

        {items.map((item, index) => {
          return (
            <Item
              key={item.id}
              index={index}
              item={item.name}
              cost={item.cost}
              numOwned={purchasedItems[item.id]}
              value={item.value}



              handleItemClick={() => {
                if (item.id === "cursor") {
                  setNumCookies(numCookies - item.cost)
                  setPurchasedItems({
                    ...purchasedItems,
                    cursor: purchasedItems[item.id] + 1
                  })
                } else if (item.id === "grandma") {
                  setNumCookies(numCookies - item.cost)
                  setPurchasedItems({
                    ...purchasedItems,
                    grandma: purchasedItems[item.id] + 1
                  })
                } else if (item.id === "farm") {
                  setNumCookies(numCookies - item.cost)
                  setPurchasedItems({
                    ...purchasedItems,
                    farm: purchasedItems[item.id] + 1
                  })
                }

              }}
            />


          )

        })}

      </ItemArea>
    </Wrapper >
  );
};

const Wrapper = styled.div`
      display: flex;
      height: 100vh;
      justify-content: space-evenly;
    
    `;
const GameArea = styled.div`
      /* flex: 1; */
      display:flex;
      justify-content: center;
      display: grid;
      place-items: center;
    `;
const Button = styled.button`
      border: none;
      background: transparent;
      cursor: pointer;
    `;

const Cookie = styled.img`
      width: 200px;
    `;

const ItemArea = styled.div`
      height: 100%;
      padding-right: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    `;

const SectionTitle = styled.h3`
      text-align: center;
      font-size: 32px;
      color: yellow;
    `;

const Indicator = styled.div`
      position: absolute;
      width: 250px;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      text-align: center;
    `;

const Total = styled.h3`
      font-size: 28px;
      color: lime;
    `;

export default Game;
