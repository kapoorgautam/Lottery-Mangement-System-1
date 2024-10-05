// 


// ColorChart.jsx
import React from "react";
import { useLanguage } from "./LanguageContext";
import { translations } from "../translator/translations";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Color from "./Color";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

const ColorChart = () => {
  const colorArr = JSON.parse(localStorage.getItem("colorArr")) || [];
  const time2 = ["2 PM", "3 PM"];
  const { language } = useLanguage();

  const prettifyDate = (i) => {
    const baseDate = new Date("09-01-2024");
    const time = baseDate.getTime() + i * 3600 * 24 * 1000;
    const date = new Date(time);
    const options = { month: "short", day: "numeric" };
    return date.toLocaleString("en-US", options);
  };

  // Calculate the number of rows based on the data length
  const numberOfRows = Math.floor((colorArr.length - 7 - 40 - 16) / 4);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          // padding: { xs: 2, sm: 3, md: 4 },
          maxWidth: "1500px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Typography
          style={{
            textAlign: "center",
            fontSize: "3rem",
            color: "white",
          }}
        >
          {translations[language].btn1}
        </Typography>

        {/* Table Container */}
       
          
        <h1>October 2024</h1>
        <TableContainer
          component={Paper}
          sx={{

            overflowY: "auto",
            marginTop: 1,
            boxShadow: 3,
          }}
        >
          <Table stickyHeader aria-label="color chart table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#32383E",
                    color: "white",
                    fontWeight: "bold",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  Date
                </TableCell>
                {time2.map((ele, i) => (
                  <TableCell
                    key={i}
                    sx={{
                      backgroundColor: "#32383E",
                      color: "white",
                      fontWeight: "bold",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                    align="center"
                  >
                    {ele}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: numberOfRows-30 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold" }}
                  >
                    {prettifyDate(i+30, 4)}
                  </TableCell>
                  {Array.from({ length: 2 }).map((_, ind) => (
                    <TableCell key={ind} align="center">
                      <Color
                        colour={
                          colorArr.slice(40+30*4, colorArr.length - 7 - 16)[i * 4 + ind + 3]
                        }
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


        {/* september table */}

        <h1>September 2024</h1>
        <TableContainer
          component={Paper}
          sx={{

            overflowY: "auto",
            marginTop: 1,
            boxShadow: 3,
          }}
        >

        <Table stickyHeader aria-label="color chart table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#32383E",
                    color: "white",
                    fontWeight: "bold",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  Date
                </TableCell>
                {time2.map((ele, i) => (
                  <TableCell
                    key={i}
                    sx={{
                      backgroundColor: "#32383E",
                      color: "white",
                      fontWeight: "bold",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                    align="center"
                  >
                    {ele}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: 30 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold" }}
                  >
                    {prettifyDate(i, 4)}
                  </TableCell>
                  {Array.from({ length: 2 }).map((_, ind) => (
                    <TableCell key={ind} align="center">
                      <Color
                        colour={
                          colorArr.slice(40, colorArr.length - 7 - 16)[i * 4 + ind + 3]
                        }
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Footer />
    </>
  );
};

export default ColorChart;
