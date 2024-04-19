import { SeatsioSeatingChart } from '@seatsio/seatsio-react';
import { useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import '../seat.css';


const SeatChart = () => {
    const [busData, setBusData] = useState([]);
    const [seatData, setSeatData] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const { tripId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/book/${tripId}`);
                if (response.data.status === 200) {
                    console.log(response.data);
                    setBusData(response.data.result);
                    setSeatData(response.data.result.seats.map(seat => ({
                        ...seat,
                        isSelected: false
                    })));
                } else {
                    alert("Error occurred");
                    navigate("/");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                alert("Error fetching data");
                navigate("/");
            }
        };

        fetchData();
    }, [tripId, navigate]);

    const toggleSeatSelection = (seatId) => {
        const updatedSeats = seatData.map(seat => {
            if (seat._id === seatId) {
                if(seat.status !== "Selected"){
                    return {
                        ...seat,
                        status: "Selected"
                    };
                
                } 
                else if(seat.status === "Selected"){
                    return {
                        ...seat,
                        status: "Open"
                    };
                }
            }
            return seat;
        });

        console.log(updatedSeats);
        setSeatData(updatedSeats);
    
        const newSelectedSeats = updatedSeats
            .filter(seat => seat.status === "Selected")
            .map(seat => seat._id); 
    
        setSelectedSeats(newSelectedSeats);
    };

    useEffect(() => {
        console.log(selectedSeats);
    },[seatData]);

    return (
        seatData && seatData.length > 0 ? (
                
                <div className="seat-chart-container flex justify-between items-center">
                <div className="toolbar">
                    <h1>Selected Seats Count: {selectedSeats.length}</h1>
                    <label>Total Price</label>
                    <input type="text" readOnly value={selectedSeats.reduce((total, seat) => total + seat.price, 0)} />
                    <div className='flex justify-center items-center w-full'>
                    <button >Confirm Seats</button>
                    </div>
                </div>
                    <div className="seat-grid-container">
                        {seatData.map((seat, index) => (
                            <div key={seat._id} id={seat._id}
                                 onClick={() => seat.status !== 'Booked' && toggleSeatSelection(seat._id)}
                                 className={`seat ${seat.status === 'Booked' ? 'bg-dark-gray cursor-not-allowed' :
                                            seat.status === 'Selected' ? 'bg-light-gray' : 'bg-light'}`}>
                                <div className="seat-index font-semibold">{`Seat ${index + 1}`}</div>
                                <div className="seat-class text-gray-500">{seat.class}</div>
                                <div className="seat-price font-bold text-blue-500">${seat.price}</div>
                            </div>
                        ))}
                    </div>
                </div>
                
        ) : (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg font-medium">Loading...</div>
            </div>
        )
    );
    
    
    
}

export default SeatChart;