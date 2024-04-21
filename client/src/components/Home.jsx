import axios from "../config/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/trips");
      console.log(res.data.trips);
      setData(res.data.trips);
    };
    fetchData();
  }, []);

  const getSearchResults = async () => {
    console.log("hi");
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const date = document.getElementById("date").value;
    console.log(from, to, date);
    const res = await axios.post("/search", { from: from, to: to, date: date });
    console.log(res);
    setData(res.data.trips);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex flex-col w-full max-w-6xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="input input-bordered flex items-center gap-2">
                From
                <input type="text" id="from" className="grow" />
              </label>
            </div>
            <div>
              <label className="input input-bordered flex items-center gap-2">
                To
                <input type="text" className="grow" id="to" />
              </label>
            </div>
            <div>
              <label className="input input-bordered flex items-center gap-2">
                Date
                <input type="date" className="grow" id="date" />
              </label>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button className="btn btn-primary" onClick={getSearchResults}>
              Search
            </button>
          </div>
        </div>
      </div>

      {data ? (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.map((item,index) => (
              <div key={index} className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                  <img
                    src="https://source.unsplash.com/random/?Bus&1/300x200"
                    alt="Random Image"
                    className="rounded-xl"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{item.bus.name}</h2>
                  <p>DEPARTURE :- {item.path.departure}</p>
                  <p>DESTINATION :- {item.path.destination}</p>
                  <p>Date: {moment(item.date).format("MMMM D, YYYY, HH:mm")}</p>
                  <div className="card-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/book/${item.tripId}`)}
                    >
                      Book Seats
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1>No Trips</h1>
        </>
      )}
    </>
  );
};

export default Home;
