import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <div className="container">
                <Link to="/manager">
                    <button className="btn">Manager</button>
                </Link>
                <Link to="/players">
                    <button className="btn">Player</button>
                </Link>
            </div>
        </>
    );
};

export default Home;
