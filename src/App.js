import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import rocketDoge from './images/doge-rocket.jpeg';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExports from './aws-exports';

import { updateDoge } from './graphql/mutations'
import { getDoge } from './graphql/queries'
Amplify.configure(awsExports);


function App() {

  useEffect(() => {
    fetchDogePrice()
  }, [])

  const [dogePrice, setDogePrice] = useState(0);

  async function fetchDogePrice() {
    try {
      console.log("in doge price")
      const dogeData = await API.graphql(graphqlOperation(getDoge))
      const dogePrice = dogeData.data.getDoge.price
      console.log("==Dogeprice: ", dogePrice)
      setDogePrice(dogePrice)

    } catch (err) {
      console.log('error fetching todos')
      console.log(err)
    }
  }

  async function updateDogePrice() {
    try {
      console.log("in doge price")
      const dogeData = await API.graphql(graphqlOperation(getDoge))
      const dogePrice = dogeData.data.getDoge.price + 0.1
      console.log("==Dogeprice: ", dogePrice)
      // const dogeObject = { id: "1", price: dogePrice }
      const updatedDogePrice = await API.graphql(graphqlOperation(updateDoge, { input: dogePrice }))
      console.log("==Dogeprice: ", updatedDogePrice)
      setDogePrice(updatedDogePrice.data.updateDoge.price)
      // var snd = new Audio("../../assets/images/cash.mp3"); // buffers automatically when created
      // snd.play();
      const audioEl = document.getElementsByClassName("audio-element")[0]
      audioEl.play()

    } catch (err) {
      console.log('error fetching todos')
      console.log(err)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
         <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Dogecoin Price <span className="text-color-primary">Predictor</span>
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                One click = 10 cents
                </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
               <span className="text-color-secondary">$ {dogePrice.toFixed(2)}</span>
               </h1>
               
                  <button tag="a" color="secondary" wideMobile onClick={updateDogePrice}>
                    <strong>Doge 🚀</strong>
                    </button>
                  
                
            </div>
            <br/>
            <div>
              <img
                className="has-shadow"
                src={rocketDoge}
                alt="Hero"
                width={896}
                height={504} />
            </div>
            </div>
          </div>
      </header>
    </div>
  );
}

export default App;
