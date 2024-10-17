import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import './stylesSeatsForm.css'; // Carga correcta de estilos

const SeatsForm = () => {
    const { q } = useParams();
    const {screeningId} = useParams()
    const [row, setRow] = useState(10);
    const [column, setColumn] = useState(15);
    const [occupiedSeats, setOccupiedSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);


    const quantity = parseInt(q, 10);

    const [formData, setFormData] = useState({
        isCancelled: false,
        seats: [

        ],
        user: {
            idUser: 2
        },
        screening: {
            idScreening: screeningId
        }
    });

    useEffect(() => {
        const fetchOccupiedSeats = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/screenings/${screeningId}/occupied-seats`);
                setOccupiedSeats(response.data);
            } catch (error) {
                console.error("Error al obtener los asientos ocupados:", error);
            }
        };

        fetchOccupiedSeats();
    }, [screeningId]);

    const seats = (row > 0 && column > 0) ? Array.from({ length: row }, (_, rowIndex) =>
        Array.from({ length: column }, (_, colIndex) => {
            const seatId = `${rowIndex}-${colIndex}`;
            const isSelected = selectedSeats.includes(seatId);
            const isOccupied = occupiedSeats.some(seat => seat.seatRow === rowIndex && seat.seatCol === colIndex);

            return (
                <div
                    key={seatId}
                    className={`seat ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : ''}`}
                    onClick={() => !isOccupied && handleSeatClick(rowIndex, colIndex)}
                ></div>
            );
        })
    ) : [];


    const handleSeatClick = (rowIndex, colIndex) => {
        const seatId = `${rowIndex}-${colIndex}`;

        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));

            setFormData(prevState => ({
                ...prevState,
                seats: prevState.seats.filter(seat => seat.seatRow !== rowIndex || seat.seatCol !== colIndex)
            }));
        } else if (selectedSeats.length < quantity) {
            setSelectedSeats([...selectedSeats, seatId]);

            setFormData(prevState => ({
                ...prevState,
                seats: [...prevState.seats, { seatRow: rowIndex, seatCol: colIndex }]
            }));
        } else {
            alert(`You can only select up to ${quantity} seats.`);
        }
    };

    return (
        <div>
            <div>
                <h1>Choose your seats:</h1>
                {Array.isArray(seats) && seats.length > 0 ? (
                    seats.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row}
                        </div>
                    ))
                ) : (
                    <p>No seats available.</p>
                )}
            </div>
            <div className="seat-information">
                <h2>Booking details:</h2>

                {formData.seats.length > 0 ? (
                    <ul>
                        {formData.seats.map((seat, index) => (
                            <li key={index}>Seat: Row {seat.seatRow + 1},
                                Column {seat.seatCol + 1}</li>
                            ))}
                    </ul>
                ) : (
                    <p>No seats selected yet.</p>
                )}
            </div>
        </div>

    );
}

export default SeatsForm;
