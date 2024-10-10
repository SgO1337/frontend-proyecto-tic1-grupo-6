import { useParams } from "react-router-dom";
import React, { useState } from 'react';
import './stylesSeatsForm.css'; // Carga correcta de estilos

const SeatsForm = () => {
    const { q } = useParams();
    const [row, setRow] = useState(10);
    const [column, setColumn] = useState(15);
    const [selectedSeats, setSelectedSeats] = useState([]);


    const quantity = parseInt(q, 10);


    const seats = (row > 0 && column > 0) ? Array.from({ length: row }, (_, rowIndex) =>
        Array.from({ length: column }, (_, colIndex) => {
            const seatId = `${rowIndex}-${colIndex}`;
            const isSelected = selectedSeats.includes(seatId);

            return (
                <div
                    key={seatId}
                    className={`seat ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSeatClick(rowIndex, colIndex)}
                ></div>
            );
        })
    ) : [];


    const handleSeatClick = (rowIndex, colIndex) => {
        const seatId = `${rowIndex}-${colIndex}`;

        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
        } else if (selectedSeats.length < quantity) {
            setSelectedSeats([...selectedSeats, seatId]);
        } else {
            alert(`You can only select up to ${quantity} seats.`);
        }
    };

    return (
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
    );
}

export default SeatsForm;
