import React, { useState } from "react";
import { NavItem, Table } from "react-bootstrap";
import axios from 'axios';
import TableContent from "./TableContent";
import "../styles/Main.css"

const test = false;
const API_KEY = '7dea41f416493fc0c753a2dc9f6f79a8';

function Main(props) {

    let [forecast, setForecast] = useState([]);
    let [searchData, setSearchData] = useState("");1
    let [coords, setCoords] = useState({lat: 55.9016773, lon: 38.1397082})

    pullSearchData = setSearchData;
    updateForecast = getForecast;
    updateCoords = setCoords;
    

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    }

    function success(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setCoords({lat: lat, lon: lon})
    }

    function getForecast(mode='hourly') {
        if (test) {
            axios.get(`http://localhost:3000/${mode}`)
                .then(resp => {
                    var weaterData = [];
                    if (mode == 'hourly') {
                        console.log('hourly');
                        resp.data.forEach(element => {
                            weaterData.push({dt: new Date(element.dt * 1000).toLocaleTimeString(), temp: element.temp, pressure: element.pressure, humidity: element.humidity});    
                        });
                    } else {
                        console.log('daily');
                        resp.data.forEach(element => {
                            weaterData.push({dt: new Date(element.dt * 1000).toLocaleDateString(), temp: element.temp.day, pressure: element.pressure, humidity: element.humidity});    
                        });  
                    }

                    setForecast(weaterData);
                });

        } else {
            axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=ru`)
                .then(resp => {
                    var weaterData = [];
                    console.log(resp.data)
                    if (mode == 'hourly') {
                        console.log('hourly');
                        resp.data['hourly'].forEach(element => {
                            weaterData.push({dt: new Date(element.dt * 1000).toLocaleTimeString(), temp: element.temp, pressure: element.pressure, humidity: element.humidity});    
                        });
                    } else {
                        console.log('daily');
                        resp.data['daily'].forEach(element => {
                            weaterData.push({dt: new Date(element.dt * 1000).toLocaleDateString(), temp: element.temp.day, pressure: element.pressure, humidity: element.humidity});    
                        });  
                    }

                    setForecast(weaterData);
                });
        }
    }

    if (Object.keys(forecast).length == 0) {
        return "";
    }
    else {
        return (
            <main>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Время</th>
                            <th>Температура</th>
                            <th>Давление</th>
                            <th>Влажность</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableContent forecast={forecast}></TableContent>   
                    </tbody>
                </Table>
            </main>
        )
    }
}

var pullSearchData;
var updateForecast;
var updateCoords;

Main.pullSearchData = (data) => {
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${data}&limit=1&appid=${API_KEY}`)
        .then(resp => {
            if (resp.data.length > 0) {
                console.log(resp.data[0])
                let lat = resp.data[0]['lat'];
                let lon = resp.data[0]['lon'];
                updateCoords({lat: lat, lon: lon})
                updateForecast();
            }
        });
};

Main.switchMode = (data) => {
    updateForecast(data);
}

export default Main;