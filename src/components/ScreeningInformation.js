import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../styles/stylesSeatsForm.css';
const ScreeningInformation = () => {

    const screeningId = useParams()
    const [data, setData] = useState([]);

    const ScreeningInfo = ({ screeningId }) => {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:9090/api/screenings/view/${screeningId}`);
                    setData(response.data);

                } catch (error) {
                    console.error('Error al obtener los datos:', error);
                }
            };

            fetchData();
        }, [screeningId]);
    }


    const movieTitle = data.movie?.title || "Loading...";
    const branchName = data.room?.branch?.location || "";
    const date = data.date || "";
    const time = data.time || "";
    const language = data.language || "";
    const subtitle = data.subtitles || "";


    return (
        <div className={"screening-information"}>
            <h2>Booking details: </h2>
            <h3> Movie: {movieTitle}</h3>
            <h3> Branch: {branchName}</h3>
            <h3> Date: {date}</h3>
            <h3> Time: {time}</h3>
            <h3> Language: {language}</h3>
            <h3> Subtitles: {subtitle}</h3>
        </div>
    )


}
export default ScreeningInformation;
