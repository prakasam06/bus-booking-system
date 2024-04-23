import { SeatsioSeatingChart } from "@seatsio/seatsio-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "../config/axios";
import "../seat.css";
import { useAuth } from "../contexts/JWTAuthContext";

const SeatChart = () => {
  const [busData, setBusData] = useState([]);
  const [seatData, setSeatData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { accessToken, setaccessTokenExpired, setaccessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { tripId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/book/${tripId}`);
        if (response.data.status === 200) {
          console.log(response.data);
          setBusData(response.data.result);
          setSeatData(
            response.data.result.seats.map((seat) => ({
              ...seat,
              isSelected: false,
            }))
          );
        } else {
          alert("Error occurred");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data");
        navigate("/");
      }
    };

    fetchData();
  }, [tripId, navigate]);

  const toggleSeatSelection = (seatId) => {
    const updatedSeats = seatData.map((seat) => {
      if (seat._id === seatId) {
        if (seat.status !== "Selected") {
          return {
            ...seat,
            status: "Selected",
          };
        } else if (seat.status === "Selected") {
          return {
            ...seat,
            status: "Open",
          };
        }
      }
      return seat;
    });

    console.log(updatedSeats);
    setSeatData(updatedSeats);
    const newSelectedSeats = updatedSeats
      .filter((seat) => seat.status === "Selected")
      .map((seat) => {
        return {
          name: "",
          age: "",
          class: seat.class,
          price: seat.price,
          seatId: seat._id,
        };
      });
    setSelectedSeats(newSelectedSeats);
  };

  useEffect(() => {
    console.log(selectedSeats, "im selectedSeats");
  }, [seatData]);

  const handleChange = (id, type, value) => {
    console.log(id, type, value);
    const updatedSeats = selectedSeats.map((seat) => {
      if (seat.seatId === id) {
        seat[type] = value;
      }
      return seat;
    });
    console.log(updatedSeats);
    setSelectedSeats(updatedSeats);
  };

  const getNewToken = async () => {
    try {
      const authResponse = await axios.post("/users/auth");
      if (authResponse.data.status === 200) {
        console.log(authResponse.data, "res.data from auth endpoint");
        setaccessToken(authResponse.data.accessToken);
        return authResponse.data.accessToken;
      } else {
        alert("Error occurred during token refresh");
      }
    } catch (authError) {
      console.error("Failed to refresh token", authError);
      alert("Session has expired. Please log in again.");
      navigate("/login");
    }
  };
  const handleSubmit = async (event, token = accessToken) => {
    event.preventDefault();
    setIsLoading(true);
    const body = {
      seats: selectedSeats,
      date: Date.now(),
      tripId: tripId,
      busId: busData.bus._id,
      pathId: busData.path._id,
    };

    console.log(body, "ready to book tickets");
    console.log(accessToken, "accessToken");

    try {
      const response = await axios.post("/confirm-tickets", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      if (response.data.status === 200) {
        alert("tickets booked successfully");
        navigate("/");
      } else {
        throw new Error("Error occurred while booking tickets");
      }
    } catch (error) {
      console.error("Request failed", error.response);

      if (error.response && error.response.status === 403) {
        const newToken = await getNewToken();
        if (newToken) {
          setaccessToken(newToken);
          handleSubmit(event, (token = newToken));
        } else {
          alert("Some error occured");
          navigate("/login");
        }
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return seatData && seatData.length > 0 ? (
    <>
      {isConfirmed ? (
        selectedSeats.length > 0 ? (
          isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="text-lg font-medium">Loading...</div>
            </div>
          ) : (
          <form
            className="form-control w-full max-w-2xl m-auto"
            onSubmit={() => handleSubmit(event)}
          >
            <center className="mb-3">
              <h3>Fill the Passengers Details to Continue</h3>
            </center>
            {selectedSeats.map((seat) => (
              <div
                key={seat.seatId}
                className="mb-4 flex justify-between items-center"
              >
                <div className="flex-1 mr-2">
                  <label className="label">
                    <span className="label-text">Passenger Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    className="input input-bordered w-full"
                    required
                    onChange={(e) =>
                      handleChange(seat.seatId, "name", e.target.value)
                    }
                  />
                </div>
                <div className="flex-1 ml-2">
                  <label className="label">
                    <span className="label-text">Passenger Age</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    placeholder="Enter age"
                    className="input input-bordered w-full"
                    required
                    onChange={(e) =>
                      handleChange(seat.seatId, "age", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
            <div className="flex justify-center gap-4 mt-4">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setIsConfirmed(false)}
              >
                Go Back
              </button>
              <button type="submit" className="btn btn-primary">
                Confirm Booking
              </button>
            </div>
          </form>
        )
        ) : (
          <div className="flex flex-col justify-center items-center h-screen">
            <h2>No Seats Selected</h2>
            <button onClick={() => setIsConfirmed(false)}>Go Back</button>
          </div>
        )
      ) : (
        <div className="parent-container">
          <div className="seat-chart-container ">
            <div className="seat-grid-container">
              {seatData.map((seat, index) => (
                <div
                  key={seat._id}
                  id={seat._id}
                  onClick={() =>
                    seat.status !== "Booked" && toggleSeatSelection(seat._id)
                  }
                  className={`seat ${
                    seat.status === "Booked"
                      ? "bg-dark-gray cursor-not-allowed"
                      : seat.status === "Selected"
                      ? "bg-light-gray"
                      : "bg-light"
                  }`}
                >
                  <div className="seat-index font-semibold">{`${
                    index + 1
                  }`}</div>
                  <div className="seat-price font-bold text-blue-500">
                    ${seat.price}
                  </div>
                  <p>{seat.class}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="toolbar">
            <h2>{busData.bus.name}</h2>
            <h3>
              {busData.path.departure} to {busData.path.destination}
            </h3>
            <h3>{moment(busData.date).format("MMMM D, YYYY, HH:mm")}</h3>
            <h1>Selected Seats Count: {selectedSeats.length}</h1>
            <label>Total Price</label>
            <input
              type="text"
              readOnly
              value={selectedSeats.reduce(
                (total, seat) => total + seat.price,
                0
              )}
            />
            <div className="flex justify-center items-center w-full">
              <button onClick={() => setIsConfirmed(true)}>
                Confirm Seats
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <div className="text-lg font-medium">Loading...</div>
    </div>
  );
};

export default SeatChart;
