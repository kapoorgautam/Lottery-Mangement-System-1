import React, { useState, useEffect } from 'react';
import Avatar1 from './Avatar1';
import Color from './Color';
import { Button } from '@mui/material';
import axios from 'axios';
import Navbar from './Navbar';

const Admin = () => {
    const [colorResult, setColorResult] = useState([]);
    const [numberResult, setNumberResult] = useState([]);
    const [start, setStart] = useState();
    const [startcolor, setStartColor] = useState();

    const prettifyDate = (time) => {
        const date = new Date(time);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleString('en-US', options);
    };

    const editNumber = (id, val) => {
        axios.post('https://lottery-mangement-system-1.onrender.com/edit', {
            thing: "number",
            id: Number(id),
            value: val
        }).then(() => {
            // Update numberResult array after successful edit
            setNumberResult(prev => prev.map((num, index) => (index === id ? val : num)));
        }).catch(error => console.error('Error editing number:', error));
    };

    const editColor = (id, val) => {
        axios.post('https://lottery-mangement-system-1.onrender.com/edit', {
            thing: "color",
            id: Number(id),
            value: val
        }).then(() => {
            // Update the colorResult array in state for the specific color being edited
            setColorResult(prev => prev.map((color, index) => (index === id ? val : color)));
        }).catch(error => console.error('Error editing color:', error));
    };

    const getArray = async () => {
        try {
            const response = await fetch('https://lottery-mangement-system-1.onrender.com/arr');
            const data = await response.json();
            setNumberResult(data.numberArr);
            setColorResult(data.colorArr);
            setStart(data.numberArr.length - 31);
            setStartColor(data.colorArr.length - 31);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const time = ["result time 4:30", " result time 3:10", " result time 6:00M", " result time 8:40", "result time 11:40", "result time 2:00", " result time 4:00", " result time 7:00"];
    const time2 = ["2AM", "6AM"];

    useEffect(() => {
        getArray();
    }, []);

    if (start === undefined || startcolor === undefined) return <>Loading...</>;

    const numberNames = ["Dhani ram", "Mansarovar", "Sri ganesh", "Delhi bazaar", "Faridabad", "Gajiyabad", "Gali", "Disawer"];
    const colorNames = ["Color 1 (2 PM)", "Color 2 (3 PM)"];

    return (
        <>
            <Navbar />
            <h4 style={{ textAlign: "center", fontSize: "1.5rem", color: "white", fontWeight: "600" }}>
                Edit numbers
            </h4>
            <div className='cards-container'>
                {numberResult.slice(start + 8, start + 16).map((ele, ind) => (
                    <div className='card1' style={{ padding: '1rem', margin: '0.25rem', fontSize: '1rem', fontWeight: '600' }} key={ind}>
                        <div className='card-name' style={{ fontSize: '.5rem', fontWeight: '700', color: 'blue' }}>
                            {numberNames[ind % numberNames.length]}
                            
                        </div>

                        
                        <div style={{ fontSize: '1rem' }}>{ele}</div>
                        

                        <div style={{ fontSize: '.5rem', fontWeight: '600' }}>
                            {prettifyDate(new Date().getTime())} {time[ind % 8]}
                        </div>
                        <div style={{ position: 'relative', fontSize: '1rem', borderColor: 'black' }}>
                            <Avatar1
                                info={{
                                    ind: ind + start + 8,
                                    val: numberResult[ind + start + 8],
                                    editNumber: editNumber,
                                    date: `${ind < 8 ? prettifyDate(new Date().getTime() + (-1) * 1000 * 24 * 3600) : prettifyDate(new Date().getTime())} ${time[ind % 8]}`,
                                    time: time[ind % 8]
                                }} />
                        </div>
                    </div>
                ))}
            </div>

            <h4 style={{ textAlign: "center", fontSize: "3rem", color: "white", fontWeight: "600" }}>
                Edit color
            </h4>

            <div className='cards-container'>
                {colorResult.slice(startcolor + 2, startcolor + 4).map((ele, ind) => (
                    <div className='card1' style={{ padding: '1rem', margin: '0.25rem', fontSize: '1rem', fontWeight: '600' }} key={ind}>
                        <div className='card-name' style={{ fontSize: '.5rem', fontWeight: '700', color: 'green' }}>
                            {colorNames[ind % colorNames.length]}
                        </div>
                        <Color colour={ele} />
                        <Color colour={colorResult[ind + startcolor + 4]} />
                        <div style={{ fontSize: '.5rem', fontWeight: '600', marginTop: '0.5rem' }}>
                            {prettifyDate(new Date().getTime())} {time2[ind % 4]}
                        </div>
                        <div style={{ position: 'relative', borderColor: 'black', marginTop: '1rem' }}>
                            <Avatar1
                                info={{
                                    iscolor: true,
                                    ind: ind + startcolor + 4,
                                    val: colorResult[ind + startcolor + 4],
                                    editColor: editColor,
                                    date: `${prettifyDate(new Date().getTime())} ${time2[ind % 4]}`
                                }} />
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
                <Button variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => { localStorage.removeItem('userinfo-Lucky'); window.location.reload(); }}>
                    Signout
                </Button>
                <Avatar1 info={{ isPassword: true }} />
            </div>
        </>
    );
};

export default Admin;
