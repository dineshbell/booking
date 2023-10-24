import React, { useState } from "react";
import "./Booking.css";

const totalSeats = 100;
const availableSeats = {
  standard: 50,
  premium: 50,
};

function Booking() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatType, setSeatType] = useState("standard");
  const [numSeats, setNumSeats] = useState(1);

  // const handleSeatClick = (seatNumber) => {
  //   const isAlreadyBooked = selectedSeats.includes(seatNumber);

  //   if (
  //     (seatType === "standard" && seatNumber <= availableSeats.standard) ||
  //     (seatType === "premium" &&
  //       seatNumber > availableSeats.standard &&
  //       seatNumber <= totalSeats)
  //   ) {
  //     if (isAlreadyBooked) {
  //       setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
  //     } else {
  //       setSelectedSeats([...selectedSeats, seatNumber]);
  //     }
  //   } else {
  //     alert("This seat is not available for the selected type.");
  //   }
  // };
  const handleSeatClick = (seatNumber) => {
    const isAlreadyBooked = selectedSeats.includes(seatNumber);
    const isSelected = selectedSeats.includes(seatNumber);

    if (
      (seatType === "standard" && seatNumber <= availableSeats.standard) ||
      (seatType === "premium" &&
        seatNumber > availableSeats.standard &&
        seatNumber <= totalSeats)
    ) {
      if (isAlreadyBooked) {
        // Remove seat from selectedSeats if it's already booked
        if (!isSelected) {
          setSelectedSeats([...selectedSeats, seatNumber]);
        } else {
          setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
        }
      } else {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    } else {
      alert("This seat is not available for the selected type.");
    }
  };

  const handleProceedClick = () => {
    if (selectedSeats.length === numSeats) {
      availableSeats[seatType] -= numSeats;
      setSelectedSeats([]);
      alert(`Seats ${selectedSeats.join(", ")} booked successfully!`);
    } else {
      alert("Please select the correct number of seats.");
    }
  };

  return (
    <div className="App">
      <h1>Book My Seat</h1>
      <div className="seating-section">
        <div className="booking-controls">
          <label style={{padding:"2px"}}>
            Seat Type :
             <select onChange={(e) => setSeatType( e.target.value)}>
              <option style={{padding:"2px"}} value="standard"> Standard</option>
              <option style={{padding:"2px"}} value="premium"> Premium</option>
            </select>
          </label>

          <label style={{padding:"20px"}}>
          Number of Seats:
            <input
              type="number"
              min="1"
              max={availableSeats[seatType]}
              value={numSeats}
              onChange={(e) => setNumSeats(parseInt(e.target.value, 10))}
            />
          </label>
        </div>
        <h2>Standard Seats</h2>
        <div className="seats standard-seats">
          {Array.from({ length: availableSeats.standard }, (_, index) => {
            const seatNumber = index + 1;
            const isBooked = selectedSeats.includes(seatNumber);
            const seatClass = isBooked
              ? "seat booked"
              : selectedSeats.includes(seatNumber)
              ? "seat selected"
              : seatType === "standard"
              ? "seat standard"
              : "seat premium";

            return (
              <div
                key={seatNumber}
                className={seatClass}
                onClick={() => !isBooked && handleSeatClick(seatNumber)}
              >
                {seatNumber}
              </div>
            );
          })}
        </div>
      </div>
      <div className="seating-section">
        <h2>Premium Seats</h2>
        <div className="seats premium-seats">
          {Array.from({ length: availableSeats.premium }, (_, index) => {
            const seatNumber = index + 1 + availableSeats.standard;
            const isBooked = selectedSeats.includes(seatNumber);
            const seatClass = isBooked
              ? "seat booked"
              : selectedSeats.includes(seatNumber)
              ? "seat selected"
              : seatType === "standard"
              ? "seat standard"
              : "seat premium";

            return (
              <div
                key={seatNumber}
                className={seatClass}
                onClick={() => !isBooked && handleSeatClick(seatNumber)}
              >
                {seatNumber}
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={handleProceedClick}>Proceed</button>
    </div>
  );
}

export default Booking;
