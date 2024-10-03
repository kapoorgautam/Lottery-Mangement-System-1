import React from "react";
import Color from "./Color";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLanguage } from "./LanguageContext";
import { translations } from "../translator/translations";

const NumberChart = () => {
  const numberArr = JSON.parse(localStorage.getItem("numberArr")) || [];
  const time2 = ["2AM", "6AM", "10AM", "2PM"].reverse();
  const time = ["Dhani ram", "Mansarovar", "Sri ganesh", "Delhi bazaar", "Faridabad", "Gajiyabad", "Gali", "Disawer"];
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
        <h1>September</h1>
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
        <h1>October</h1>
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
      </div>
      <Footer />
    </div>
  );
};

export default NumberChart;


// NumberChart.jsx
// import React from "react";
// import { useLanguage } from "./LanguageContext";
// import { translations } from "../translator/translations";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import {
//   Box,
//   Typography,
//   TableContainer,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
// } from "@mui/material";

// const NumberChart = () => {
//   const numberArr = JSON.parse(localStorage.getItem("numberArr")) || [];
//   // const time2 = ["2AM", "6AM", "10AM", "2PM"].reverse();
//   const time = ["Sri ganesh 2AM", "Delhi bazaar 4AM", "Faridabad 6AM", "Gajiyabad 8AM", "Gali 10AM", "Disawer 12PM", "Dhani ram 2PM", "Mansarovar 4PM"];
//   const { language } = useLanguage();

//   const prettifyDate = (i) => {
//     const baseDate = new Date("09-01-2024");
//     const time = baseDate.getTime() + i * 3600 * 24 * 1000;
//     const date = new Date(time);
//     const options = { month: "short", day: "numeric" };

//     return date.toLocaleString("en-US", options);
//   };

//   // Calculate the number of rows based on the data length
//   const numberOfRows = Math.floor((numberArr.length - 1) / 8) - 6;

//   return (
//     <>
//       <Navbar />
//       <Box
//         sx={{
//           padding: { xs: 2, sm: 3, md: 4 },
//           // maxWidth: "1200px",
//           margin: "0 auto",
//           textAlign: "center",
//         }}
//       >
//         <Typography
//           variant="h4"
//           gutterBottom
//           sx={{ marginTop: 4, color: "text.primary" }}
//         >
//           {translations[language].btn2}
//         </Typography>

//         {/* Table Container */}
//         <TableContainer
//           component={Paper}
//           sx={{
//             // maxHeight: "70vh",
//             overflowY: "auto",
//             marginTop: 4,
//             boxShadow: 3,
//           }}
//         >
//           <Table stickyHeader aria-label="number chart table">
//             <TableHead>
//               <TableRow>
//                 <TableCell
//                   sx={{
//                     backgroundColor: "primary.dark",
//                     color: "white",
//                     fontWeight: "bold",
//                     position: "sticky",
//                     top: 0,
//                     zIndex: 1,
//                   }}
//                 >
//                   Date
//                 </TableCell>
//                 {time.map((ele, i) => (
//                   <TableCell
//                     key={i}
//                     sx={{
//                       backgroundColor: "primary.dark",
//                       color: "white",
//                       fontWeight: "bold",
//                       position: "sticky",
//                       top: 0,
//                       zIndex: 1,
//                     }}
//                     align="center"
//                   >
//                     {ele}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {Array.from({ length: numberOfRows }).map((_, i) => (
//                 <TableRow key={i}>
//                   <TableCell
//                     component="th"
//                     scope="row"
//                     sx={{ fontWeight: "bold" }}
//                   >
//                     {prettifyDate(i, 8)}
//                   </TableCell>
//                   {Array.from({ length: 8 }).map((_, ind) => (
//                     <TableCell key={ind} align="center">
//                       <Typography
//                         variant="body1"
//                         component="span"
//                         fontWeight="600"
//                       >
//                         {numberArr.slice(53, numberArr.length - 1)[i * 8 + ind]}
//                       </Typography>
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//       <Footer />
//     </>
//   );
// };

// export default NumberChart;
