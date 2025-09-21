import React, { useEffect, useState } from "react";

const HistoryComponent = () => {
  // const [history, setHistory] = useState([]);
  var history = [];

  let user_id = localStorage.getItem("userId");
  console.log("User ID from localStorage:", user_id);
  user_id = parseInt(user_id, 10);

  const getMusic = async (musicId) => {
    try {
      const response = await fetch(`http://localhost:8080/music/${musicId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch music");
      }
      const data = await response.json();
      console.log("Music data:", data);
      return (
        <div>
          Image
          </div>
      );
    } catch (error) {
      console.error("Error fetching music:", error);
      return <p>Error fetching music</p>;
    }
  };

  // useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:8080/history");
        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }
        const data = await response.json();
        console.log("History data:", data);
        let filter_data = data.filter((item) => item.userId === user_id, console.log("User ID:", user_id));
        console.log("Filtered history data:", filter_data);
        let array = [];
        filter_data.forEach((item) => {
          console.log("Music ID:", item.musicId);
          array.push(item.musicId);
        });
        // setHistory(array);
        history = array;
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  // }, []);

  return (
    <div className="history">
      <h3>History</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>{
            getMusic(item) 
          }</li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryComponent;
