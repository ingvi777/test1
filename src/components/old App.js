import React, {useEffect, useState} from "react";
import "./App.css";
import {useFetch} from "./hooks/request";

export default function App() {
/*---------запрос----------------------------------------------------------*/
    const [data, setData] = useState([]);
    const { state, error } = useFetch(
        'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
    );

    useEffect(() => {
        const dollarEuro = state.filter(item => {return item.ccy !== 'BTC'});
        setData(dollarEuro);
    },[state]);
/*--------вводимый инпут---------------------------------------------------------*/
    const [position, setPosition] = useState('left');
/*--------выбор валюты----------------------------------------------------------*/
    const [selectValue1, setSelectValue1] = useState('UAH');
    function selectChange1 (event) {
        setSelectValue1(event.target.value);
    }
    const [selectValue2, setSelectValue2] = useState('USD');
    function selectChange2(event) {
        setSelectValue2(event.target.value);
    }
/*------------значение инпута------------------------------------------------------*/
    const [inputValue1, setInputValue1] = useState(1);
    function inputChange1(event) {
        setInputValue1(event.target.value);
        setPosition('left');
    }
    const [inputValue2, setInputValue2] = useState(1);
    function inputChange2(event) {
        setInputValue2(event.target.value);
        setPosition('right');
    }

/*-----------------вычисление с левого инпута-------------------------------------------------*/
    useEffect(() => {

        if(data.length && typeof Number(inputValue1) === "number" && position === 'left'){

            if(selectValue1 === 'USD' && selectValue2 === 'USD') setInputValue2(inputValue1);
            if(selectValue1 === 'USD' && selectValue2 === 'EUR') setInputValue2(inputValue1 * ( Number(data[0].sale) / Number(data[1].sale) ) );
            if(selectValue1 === 'USD' && selectValue2 === 'UAH') setInputValue2(inputValue1 * Number(data[0].sale) );

            if(selectValue1 === 'EUR' && selectValue2 === 'EUR') setInputValue2(inputValue1);
            if(selectValue1 === 'EUR' && selectValue2 === 'USD') setInputValue2(inputValue1 * ( Number(data[1].sale) / Number(data[0].sale) ) );
            if(selectValue1 === 'EUR' && selectValue2 === 'UAH') setInputValue2(inputValue1 * Number(data[1].sale) );

            if(selectValue1 === 'UAH' && selectValue2 === 'UAH') setInputValue2(inputValue1);
            if(selectValue1 === 'UAH' && selectValue2 === 'USD') setInputValue2(  inputValue1 * ( 1 / Number(data[0].sale) ) );
            if(selectValue1 === 'UAH' && selectValue2 === 'EUR') setInputValue2(  inputValue1 * ( 1 / Number(data[1].sale) ) );
        }

    },[inputValue1, selectValue1, selectValue2, data, position]);
/*------------------вычисление с правого инпута----------------------------------------------------------------------*/
    useEffect(() => {

        if(data.length && typeof Number(inputValue1) === "number"  && position === 'right'){

            if(selectValue2 === 'USD' && selectValue1 === 'USD') setInputValue1(inputValue2);
            if(selectValue2 === 'USD' && selectValue1 === 'EUR') setInputValue1(inputValue2 * ( Number(data[0].sale) / Number(data[1].sale) ) );
            if(selectValue2 === 'USD' && selectValue1 === 'UAH') setInputValue1(inputValue2 * Number(data[0].sale) );

            if(selectValue2 === 'EUR' && selectValue1 === 'EUR') setInputValue1(inputValue2);
            if(selectValue2 === 'EUR' && selectValue1 === 'USD') setInputValue1(inputValue2 * ( Number(data[1].sale) / Number(data[0].sale) ) );
            if(selectValue2 === 'EUR' && selectValue1 === 'UAH') setInputValue1(inputValue2 * Number(data[1].sale) );

            if(selectValue2 === 'UAH' && selectValue1 === 'UAH') setInputValue1(inputValue2);
            if(selectValue2 === 'UAH' && selectValue1 === 'USD') setInputValue1(  inputValue2 * ( 1 / Number(data[0].sale) ) );
            if(selectValue2 === 'UAH' && selectValue1 === 'EUR') setInputValue1(  inputValue2 * ( 1 / Number(data[1].sale) ) );
        }

    },[inputValue2, selectValue1, selectValue2, data, position]);

/*------------------------------------------------------------------*/
  return (
      <div>
          <header>
              <h1>Курсы валют</h1>
              <ul>
                  {data.map((item, i) => {
                      return ([
                          <li key={i + item.ccy}>{item.ccy}</li>,
                          <li key={i + item.buy}>{item.buy}</li>,
                          <li key={i + item.sale}>{item.sale}</li>
                      ])
                  })}
              </ul>
          </header>
          <main>
              <input value={inputValue1} onChange={inputChange1}/>
              <select value={selectValue1} onChange={selectChange1}>
                  {data.map((item, i) =>
                      ( <option key={i} value={item.ccy}>{item.ccy}</option> )
                  )}

                  <option key={"UAH"} value="UAH">UAH</option>
              </select>

              <input value={inputValue2} onChange={inputChange2}/>
              <select value={selectValue2} onChange={selectChange2}>
                  {data.map((item, i) =>
                      ( <option key={i} value={item.ccy}>{item.ccy}</option> )
                  )}

                  <option key={"UAH"} value="UAH">UAH</option>
              </select>

          </main>
      </div>
  );
}