import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import "./chat.css";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

let socket;

const Chat = () => {
  const [Name, setName] = useState("");
  const [Room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "https://chat-server-smoky.vercel.app/";

  const [searchParams] = useSearchParams();
  const NameParam = searchParams.get("Name");
  const RoomParam = searchParams.get("Room");

  useEffect(() => {
    socket = io(ENDPOINT);

    setRoom(RoomParam);
    setName(NameParam);

    socket.emit("join", { Name: NameParam, Room: RoomParam }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, NameParam, RoomParam]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar Room={Room} />
        <Messages messages={messages} Name={Name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
