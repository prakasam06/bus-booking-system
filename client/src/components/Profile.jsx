import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import { useAuth } from "../contexts/JWTAuthContext";
import moment from "moment";
const Profile = () => {
  const { user } = useAuth();
  const { accessToken, setaccessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showTickets, setShowTickets] = useState(false);
  const [bookingId, setBookingId] = useState(false);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [bookings, setBookings] = useState([]);

  const showTicketsHandler = (id) => {
    setBookingId(id);
    setShowTickets(true);
    console.log(id);
  };

  useEffect(() => {
    const fetchData = async (token = accessToken) => {
      try {
        console.log("hiii");
        setIsLoading(true);
        const res = await axios.get("/myBookings", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data.results, "imm results");
        setBookings(res.data.results);
        setIsLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          const res = await axios.post("users/auth");
          console.log(res.data);
          setaccessToken(res.data.accessToken);
          fetchData((token = res.data.accessToken));
        } else {
          console.log(error);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (showTickets) {
      const getTickets = async (token = accessToken, id = bookingId) => {
        try {
          console.log("hiii from get toickets");
          console.log(id);
          setIsLoading(true);
          const res = await axios.get("/getTickets/" + id, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(res.data.results, "imm results");
          setTicketDetails(res.data.results);
          setIsLoading(false);
        } catch (error) {
          if (error.response && error.response.status === 403) {
            const res = await axios.post("users/auth");
            console.log(res.data);
            setaccessToken(res.data.accessToken);
            getTickets((token = res.data.accessToken), (id = bookingId));
          } else {
            console.log(error);
          }
        }
      };
      getTickets();
    }
  }, [showTickets]);

  return isLoading ? (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-medium">Loading...</div>
      </div>
    </>
  ) : (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-10">
        <div className="container max-w-4xl bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <p className="text-lg">
              <strong>First Name:</strong> {user.firstName}
            </p>
            <p className="text-lg">
              <strong>Last Name:</strong> {user.lastName}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {user.email}
            </p>
          </div>
          {showTickets ? (
            <>
              {ticketDetails.length > 0 ? (
                <div className="mt-6">
                  <h2 className="text-2xl font-semibold text-center mb-4">
                    Booking Details
                  </h2>
                  <h3 className="text-lg font-semibold">Tickets</h3>
                  {ticketDetails.map((ticket) => (
                    <div key={ticket._id} className="border p-4 rounded-lg">
                      <div className="flex flex-col md:flex-row justify-between items-center">
                        <div>
                          <p className="font-semibold">
                            {ticket.ticket.passengerName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {ticket.ticket.passengerAge} years old
                          </p>
                          <p className="text-sm text-gray-500">
                            {ticket.seat.class}
                          </p>
                          <p className="text-sm text-gray-500">
                            {ticket.seat.price} rupees
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setShowTickets(false)}>Go Back</button>
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  Looks like you have no tickets.
                </p>
              )}
            </>
          ) : (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-center mb-4">
                Booking History
              </h2>
              {bookings.length > 0 ? (
                <ul className="space-y-4">
                  {bookings.map((booking) => (
                    <li
                      key={booking.booking._id}
                      className="border p-4 rounded-lg"
                    >
                      <div
                        onClick={() => showTicketsHandler(booking.booking._id)}
                        className="flex flex-col md:flex-row justify-between items-center"
                      >
                        <div>
                          <p className="font-semibold">{booking.bus.name}</p>
                          <p className="text-sm text-gray-500">
                            {booking.booking.tickets.length} tickets
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.path.departure} to{" "}
                            {booking.path.destination}
                          </p>
                          <p className="text-sm text-gray-500">
                            Date:{" "}
                            {moment(booking.bookedAt).format(
                              "MMMM D, YYYY, HH:mm"
                            )}
                          </p>
                          <p className="text-sm text-gray-500">
                            Price: ${booking.booking.totalAmount}
                          </p>
                        </div>
                        <button>Cancel Booking</button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500">
                  Looks like you have no bookings.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
