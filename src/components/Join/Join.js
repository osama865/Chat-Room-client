import React, { useState} from "react";
import { Link, useParams } from "react-router-dom";
import "./join.css";

export default function Join() {
  const [Name, setName] = useState("");
  const [Room, setRoom] = useState("");

  const params = useParams()
  console.log(params);
  const handleJoin = (event) => {
    if (!Name || !Room) {
      event.preventDefault();
    }
  };

  const queryString = `/chat?Name=${Name}&Room=${Room}`;

  return (
    <div className="joinoutterContainer">
      <div className="joininnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          ></input>
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          ></input>
        </div>
        <Link
          onClick={handleJoin}
          to={{pathname:queryString}}
        >
          <button className="button mt-20" type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}