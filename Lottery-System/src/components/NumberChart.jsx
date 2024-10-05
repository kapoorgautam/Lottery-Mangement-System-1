import React from "react";
import Color from "./Color";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLanguage } from "./LanguageContext";
import { translations } from "../translator/translations";

const NumberChart = () => {
  const numberArr = JSON.parse(localStorage.getItem("numberArr")) || [];

  const time =[ "Dhani ram", "Mansarovar","Sri ganesh", "Delhi bazaar", "Faridabad", "Gajiyabad", "Gali", "Disawer"];



  const { language } = useLanguage();
  const prettifyDate = (i, parts) => {
    const time = new Date("09-01-2024").getTime() + i * 3600 * 24 * 1000;
    const date = new Date(time);
    const options = { month: "short", day: "numeric" };

    return date.toLocaleString("en-US", options);
  };
  const arrLen = Math.floor((numberArr?.length - 1) / 8) - 6
  return (
    <div>
      <Navbar />
      <h1
        style={{
          textAlign: "center",
          fontSize: "3rem",
          color: "white",
        }}
      >  {translations[language].btn2}</h1>
      <div style={{ overflowY: "auto", textAlign: "center", }}>

      <h1>October 2024</h1>
        <table className="table table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">Date</th>
              {time.map((ele, i) => (
                <th scope="col" key={i}>
                  {ele}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ textAlign: "center", color: "white" }} >
            {Array.from({
              length: arrLen-30,
            }).map((_, i) => (
              <tr>
                <td>{prettifyDate(i+30, 8)}</td>
                {Array.from({ length: 8 }).map((_, ind) => {
                  return (
                    <td>
                      {
                        numberArr?.slice(53+30*8, numberArr?.length - 1)[
                        i * 8 + ind
                        ]
                      }
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>




        <h1>September 2024</h1>
        <table className="table table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">Date</th>
              {time.map((ele, i) => (
                <th scope="col" key={i}>
                  {ele}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ textAlign: "center", color: "white" }} >
            {Array.from({
              length: 30,
            }).map((_, i) => (
              <tr>
                <td>{prettifyDate(i, 8)}</td>
                {Array.from({ length: 8 }).map((_, ind) => {
                  return (
                    <td>
                      {
                        numberArr?.slice(53, numberArr?.length - 1)[
                        i * 8 + ind
                        ]
                      }
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      
      </div>
      <Footer />
    </div>
  );
};

export default NumberChart;
