
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Color from "./Color";
import { Button, Grid, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import { translations } from "../translator/translations";
import Footer from "./Footer";

const LandingPage = () => {
  const [colorResult, setcolorResult] = useState([]);
  const [numberResult, setnumberResult] = useState([]);
  const [start, setStart] = useState();
  const [startcolor, setStartcolor] = useState();
  const navigate = useNavigate();

  // Time arrays
  const time = ["4:00", "7:00", "3:10", "4:30", "6:00", "8:40", "11:40", "2:00", ];
  const time2 = ["2:00 PM", "3:00 PM"];

  // Highlighted card names and background colors
  const cardNames = [
    "Dhani ram ",
    "Mansarovar ",
    "Sri ganesh ",
    "Delhi bazaar ",
    "Faridabad",
    "Gajiyabad ",
    "Gali ",
    "Disawer ",
   
  ];
  const cardBackgroundColors = [
    "#FFBF00",
    "#FFBF00",
    "#FFBF00",
    "#FFBF00",
    "#FFBF00",
    "#FFBF00",
    "#FFBF00",
    "#FFBF00",
  ];

  const { language } = useLanguage();

  const getArray = async () => {
    try {
      const response = await fetch("https://lottery-mangement-system-1.onrender.com/arruser");
      const data = await response.json();
      setnumberResult(data.numberArr);
      setcolorResult(data.colorArr);
      localStorage.setItem("colorArr", JSON.stringify(data.colorArr));
      localStorage.setItem("numberArr", JSON.stringify(data.numberArr));
      setStart(data.numberArr.length - 17);
      setStartcolor(data.colorArr.length - 31);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getArray();
  }, []);

  return (
    <>
      <div id="root">
        <Navbar />
        <Box
          display="flex"
          flexDirection="column"
          gap={4}
          alignItems="center"
          padding={2}
          sx={{ maxWidth: "1200px", margin: "0 auto" }}
        >
          {/* Blinking Text */}
          <Box className="text-container" textAlign="center">
            {[...Array(3)].map((_, idx) => (
              <Typography
                key={idx}
                variant="h5"
                className="blink-text"
                component="p"
                sx={{ animation: "blink 1s infinite" }}
              >
                {translations[language].fast}{" "}
                <span style={{ color: "yellow" }}>{translations[language].logo}</span>
              </Typography>
            ))}
          </Box>

          {/* Number Results Section */}
          <Box className="number-results" width="100%">
            <Grid container spacing={2} justifyContent="center">
              {numberResult.slice(start, start + 16).map((ele, ind) =>
                ind > 7 ? null : (
                  <Grid item xs={12} sm={6} md={3} key={`number-box${ind}`}>
                    <Box
                      className="card1 number-box"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      padding={2}
                      fontSize="1.3rem"
                      fontWeight="600"
                      bgcolor={cardBackgroundColors[ind]}
                      borderRadius={2}
                      color="white"
                      boxShadow={3}
                      sx={{
                        transition: "transform 0.3s",
                        "&:hover": { transform: "scale(1.05)" },
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        padding={1}
                        bgcolor="#333"
                        borderRadius={1}
                        fontSize="1rem"
                        mb={1}
                      >
                        {cardNames[ind]} ({time[ind]})
                      </Box>
                      <Box display="flex" width="100%" justifyContent="space-between">
                        <Box>
                          {numberResult[start + ind]}
                          <Typography variant="caption" color="error" display="block">
                            {translations[language].yesterday}
                          </Typography>
                        </Box>
                        <Box>
                          {numberResult[start + ind + 8]}
                          <Typography variant="caption" color="success.main" display="block">
                            {translations[language].today}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                )
              )}
            </Grid>
          </Box>

          {/* Buttons Section */}
          <Box width="100%" display="flex" justifyContent="center" gap={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate("/color-chart")}
              sx={{
                maxWidth: 200,
                bgcolor: "black",
                "&:hover": { bgcolor: "grey.800" },
              }}
            >
              {translations[language].btn1}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => navigate("/number-chart")}
              sx={{
                maxWidth: 200,
                bgcolor: "black",
                "&:hover": { bgcolor: "grey.800" },
              }}
            >
              {translations[language].btn2}
            </Button>
          </Box>

          {/* Marquee */}
          <Box className="marquee-container" width="100%" overflow="hidden">
            <Box
              className="marquee"
              color="white"
              whiteSpace="nowrap"
              display="flex"
              animation="marquee 15s linear infinite"
            >
              {[...Array(9)].map((_, idx) => (
                <Typography key={idx} component="span" mr={4}>
                  {translations[language].welcome}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Color Results Section */}
          <Box className="color-results" width="100%">
            <Typography variant="h4" align="center" gutterBottom sx={{ color: "white" }}>
              Color Results
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {colorResult.slice(startcolor, startcolor + 8).map((ele, ind) =>
                ind > 1 ? null : (
                  <Grid item xs={12} sm={6} md={3} key={`color-${ind}`}>
                    <Box
                      className="card1"
                      bgcolor={cardBackgroundColors[ind]}
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      padding={2}
                      fontSize="1.3rem"
                      fontWeight="600"
                      borderRadius={2}
                      color="white"
                      boxShadow={3}
                      sx={{
                        transition: "transform 0.3s",
                        "&:hover": { transform: "scale(1.05)" },
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        padding={1}
                        bgcolor="#333"
                        borderRadius={1}
                        fontSize="1rem"
                        mb={1}
                      >
                        ({time2[ind]})
                      </Box>
                      <Box display="flex" width="100%" justifyContent="space-between">
                        <Box>
                          <Color colour={colorResult[startcolor + ind]} />
                          <Typography variant="caption" color="error" display="block">
                            {translations[language].yesterday}
                          </Typography>
                        </Box>
                        <Box>
                          <Color colour={colorResult[startcolor + ind + 4]} />
                          <Typography variant="caption" color="success.main" display="block">
                            {translations[language].today}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                )
              )}
            </Grid>
          </Box>
        </Box>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;

