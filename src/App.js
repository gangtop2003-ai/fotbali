import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./nav.jsx";
import "./css.css";
import Football from "./football.jsx";

function App() {
  const [team, setteam] = useState([]);

  useEffect(() => {
    const fechdata = async () => {
      const res = await fetch(
        "https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=Arsenal"
      );
      const data = await res.json();
      setteam(data.player);
    };
    fechdata();
  }, []);

  function Alluser() {
    return (
      <div className="user-div">
        {team.map((e) => (
          <div className="card" key={e.idPlayer}>
            <div className="card-img-box">
              <img
                src={e.strThumb || "https://via.placeholder.com/200x200"}
                alt={e.strPlayer}
                className="card-img"
              />
            </div>
            <div className="card-body">
              <h3>{e.strPlayer}</h3>
              <p>
                <strong>⚽ Position:</strong> {e.strPosition || "Unknown"}
              </p>
              <p>
                <strong>🌍 Nationality:</strong> {e.strNationality}
              </p>
              <p>
                <strong>🎂 Birth:</strong> {e.dateBorn || "N/A"}
              </p>
              <p>
                <strong>🏟️ Team:</strong> {e.strTeam}
              </p>
              {e.strPosition && (
                <a
                  href={e.strWikimedia}
                  target="_blank"
                  rel="noreferrer"
                  className="card-btn"
                  style={{ cursor: "pointer" }}
                >
                  More Info
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
  const Home = () => {
    return (
      <div className="home">
        <video autoPlay muted loop playsInline>
          <source src="bgvid1.mp4" type="video/mp4" />
          مرورگر شما از ویدیو پشتیبانی نمی‌کند.
        </video>
        <div className="home-content">
          <h1>چقدر تیمتو میشناسی؟</h1>
           <div className="aster">
        <video autoPlay muted loop playsInline>
          <source src="aster.mp4" type="video/mp4" />
          </video>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Arsenal" element={<Alluser />} />
         <Route path="/football" element={<Football />} />
      </Routes>
    </>
  );
}

export default App;
