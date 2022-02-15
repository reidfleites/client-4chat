/* eslint-disable react-hooks/exhaustive-deps */
import "./chat.css";
import io from "socket.io-client";
import { useRef, useEffect, useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { FaRegSmile } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import Picker from "emoji-picker-react";
//import { BiMessageRounded } from "react-icons/bi";
import logo from "../../images/Logo.png";
import { Avatar } from "@material-ui/core";
import useSound from "use-sound";
import sound from "../data/notification.mp3";
//import { format } from "timeago.js";
import { BsFillChatFill } from "react-icons/bs";
import dateFormat from "dateformat";

// import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
// import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
// import MicIcon from "@material-ui/icons/Mic";
//import MenuIcon from "@material-ui/icons/Menu";
function Chat() {
  const [play] = useSound(sound);
  const [currentUser, setCurrentUser] = useContext(AppContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [arrivedMessage, setArrivedMessage] = useState(null);
  const [roomMessage, setRoomMessage] = useState(null);
  const [receiver, setReceiverId] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();
  const [showPicker, setShowPicker] = useState(false);
  const [notification, setNotification] = useState(false);
  const [roomNotification, setRoomNotification] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();
  const [rooms, setRooms] = useState([]);
  /*
  const [rooms, setRooms] = useState([
    { room: "general", newMessage: false },
    { room: "musik", newMessage: false },
    { room: "sport", newMessage: false },
  ]);*/
  //Random Avatar
  //const [seed, setSeed] = useState("");
  //get current User
  const getCurrentUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/currentUser`, {
      method: "GET",
      credentials: "include",
    });
    const user = await response.json();
    setCurrentUser({ ...user });
  };
  //set allUser array
  const getAllUsers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/allUsers`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (response.ok) {
      const users = await response.json();
      setAllUsers([...users]);
    }
  };
  //return User from  allUser
  const getUser = (id) => {
    if (allUsers.length > 0) {
      const user = allUsers.find((user) => user._id === id);
      return user.username;
    }
  };
  //retun avatar number
  const getAvatar = (id) => {
    if (allUsers.length > 0) {
      const user = allUsers.find((user) => user._id === id);
      return user.avatar;
    }
  };

  useEffect(() => {
    socket.current = io(`${process.env.REACT_APP_BACKEND_URL}`, {
      withCredentials: true,
    });
    socket.current.on("roomMessage", (data) => {
      setRoomMessage({
        from: data.from,
        to: data.to,
        text: data.text,
        createdAt: Date.now(),
      });
      play();
    });
    socket.current.on("messageArrived", (data) => {
      setArrivedMessage({
        from: data.from,
        to: data.to,
        text: data.text,
        createdAt: Date.now(),
      });
      play();
    });
  }, []);
  useEffect(() => {
    if (arrivedMessage && receiver === arrivedMessage.from) {
      setCurrentChat((prev) => [...prev, arrivedMessage]);
    }
    if (arrivedMessage && receiver !== arrivedMessage.from) {
      setNotification(true);
    }
  }, [arrivedMessage]);

  useEffect(() => {
    roomMessage &&
      roomMessage.to === room &&
      setCurrentChat((prev) => [...prev, roomMessage]);
    roomMessage && roomMessage.to !== room && setRoomNotification(true);
  }, [roomMessage]);

  useEffect(() => {
    if (roomNotification) {
      const room = rooms.find((r) => r.room === roomMessage.to);
      const index = rooms.findIndex((r) => r.room === roomMessage.to);
      rooms[index] = { ...room, newMessage: true };
      setRoomNotification(false);
    }
  }, [roomNotification]);

  useEffect(() => {
    //const avatar = Math.floor(Math.random() * 5000);
    //setSeed(avatar);
    socket.current.emit("add user", currentUser._id, currentUser.username);
    socket.current.on("onlineUsers", (onlineUsers) => {
      const myOnlineUsersList = onlineUsers.filter(
        (user) => user.id !== currentUser._id
      );
      setOnlineUsers([...myOnlineUsersList]);
    });
    socket.current.emit("join-rooms");
    socket.current.on("rooms-list", (rooms) => {
      setRooms([...rooms]);
    });
  }, [socket, currentUser]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    if (currentChat.length > 0) {
      localStorage.setItem("currentChat", JSON.stringify(currentChat));
    }
  }, [currentChat]);

  useEffect(() => {
    getCurrentUser();
    getAllUsers();
    const chat = JSON.parse(localStorage.getItem("currentChat"));
    if (chat) {
      setCurrentChat([...chat]);
    }
  }, []);

  useEffect(() => {
    if (notification) {
      const user = onlineUsers.find((user) => user.id === arrivedMessage.from);
      const index = onlineUsers.findIndex(
        (user) => user.id === arrivedMessage.from
      );
      let count = user.countMessage + 1;
      onlineUsers[index] = { ...user, countMessage: count };
      setNotification(false);
    }
  }, [notification]);

  useEffect(() => {
    const user = onlineUsers.find((user) => user.id === receiver);
    const index = onlineUsers.findIndex((user) => user.id === receiver);
    onlineUsers[index] = { ...user, countMessage: 0 };
    (async () => {
      if (receiver !== "") {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/history`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              history: { from: currentUser._id, to: receiver },
            }),
          }
        );
        const history = await response.json();
        if (response.ok) {
          setCurrentChat([...history]);
        }
      }
    })();
  }, [receiver]);

  useEffect(() => {
    const currentroom = rooms.find((r) => r.room === room);
    const index = rooms.findIndex((r) => r.room === room);
    rooms[index] = { ...currentroom, newMessage: false };
    (async () => {
      if (room !== "") {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/chatRoom`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ room: { roomName: room } }),
          }
        );
        if (response.ok) {
          const chatRoom = await response.json();
          setCurrentChat(chatRoom);
        }
      }
    })();
  }, [room]);

  const handleNewMessage = (e) => {
    const iNewMessage = e.target.value;
    setNewMessage(iNewMessage);
  };

  const sendMessage = async () => {
    if (room !== "") {
      socket.current.emit("chat-message", {
        from: currentUser._id,
        to: room,
        text: newMessage,
      });
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/addMessage`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: {
              from: currentUser._id,
              to: room,
              text: newMessage,
            },
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCurrentChat([...currentChat, data]);
        setNewMessage("");
      }
    } else {
      socket.current.emit("message", {
        from: currentUser._id,
        to: receiver,
        text: newMessage,
      });
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/addMessage`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: { from: currentUser._id, to: receiver, text: newMessage },
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentChat([...currentChat, data]);
        setNewMessage("");
      }
    }
  };
  const setBoxChat = (userId) => {
    setReceiverId(userId);
    setRoom("");
  };

  const logout = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/logout`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (response.ok) {
      socket.current.disconnect(currentUser._id);
      setCurrentUser("");
      navigate("/");
      window.location.reload();
    }
  };
  const onEmojiClick = (event, emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
    setShowPicker(false);
  };
  const showRoomChat = async (room) => {
    setRoom(room);
    setReceiverId("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <img src={logo} alt="Logo" />
        <div className="chat_headerInfo">
          <section>
            <h3>
              {currentUser.username}
              {allUsers.length}
            </h3>
            <button onClick={logout}>logout</button>
          </section>
          <Avatar
            className="avatar"
            src={`https://avatars.dicebear.com/api/bottts/${currentUser.avatar}.svg
          `}
          />
        </div>
      </div>
      <div className="menue">
        <div className="rooms_Dropdown">
          <button className="dropbtn">Rooms</button>
          <div className="dropdown-content">
            <ul>
              <li>
                {rooms.map((r, index) => {
                  return (
                    <div onClick={() => showRoomChat(r.room)} key={index}>
                      {r.room}
                      {r.newMessage && (
                        <BsFillChatFill className="icon-notification" />
                      )}
                    </div>
                  );
                })}
              </li>
            </ul>
          </div>
        </div>

        <div className="onlineUsers_Dropdown">
          <button className="dropbtn">
            Online Users
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            {onlineUsers.map((user, index) => {
              return (
                <li onClick={() => setBoxChat(user.id)} key={index}>
                  {user.username}
                  {user.countMessage > 0 && (
                    <span className="message-notification">
                      {user.countMessage}
                    </span>
                  )}
                </li>
              );
            })}
          </div>
        </div>
      </div>
      <fieldset className="container">
        <div className="sidebar">
          <div className="rooms">
            <h3>Rooms</h3>
            <ul>
                {rooms.map((r, index) => {
                  return (
                    <div onClick={() => showRoomChat(r.room)} key={index}>
                      {r.room}
                      {r.newMessage && (
                        <BsFillChatFill className="icon-notification" />
                      )}
                    </div>
                  );
                })}
            </ul>
          </div>
          <div>
            <div className="user-online-list">
              <ul>
                <h3>Online Users</h3>
              </ul>
              {onlineUsers.map((user, index) => {
                return (
                  <li onClick={() => setBoxChat(user.id)} key={index}>
                    {user.username}
                    {user.countMessage > 0 && (
                      <span className="message-notification">
                        {user.countMessage}
                      </span>
                    )}
                  </li>
                );
              })}
            </div>
          </div>
        </div>
        <legend>{receiver !== "" ? getUser(receiver) : room}</legend>
        <div className="chat-box">
          <div className="messages-box">
            {currentChat.map((message, index) => {
              return (
                <div
                  ref={scrollRef}
                  key={index}
                  className={
                    currentUser._id === message.from ? "myMessage" : "message"
                  }
                >
                  {/* <div className="messageTop"> */}
                  <div className="messages">
                    <img
                      className="messageImg"
                      src={`https://avatars.dicebear.com/api/bottts/${getAvatar(
                        message.from
                      )}.svg`}
                      alt="avatar"
                    />
                    <div className="msg_name">
                      <span>{getUser(message.from)}:</span>
                      <div className="messageText">
                        {message.text}
                        <div className="messageDetails">
                          {
                            //                       //format(message.createdAt)
                            dateFormat(
                              message.createdAt,
                              "dddd,h:MM:ss TT"
                              // "dddd, mmmm dS, yyyy, h:MM:ss TT"
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="messageBottom"> */}
                </div>
              );
            })}
          </div>
          <div className="footer-chat-box">
            <FaRegSmile
              onClick={() => setShowPicker((val) => !val)}
              className="emoji"
            />
            <input type="text" value={newMessage} onChange={handleNewMessage} />
            {showPicker && (
              <Picker
                className="test"
                pickerStyle={{ width: "25%" }}
                onEmojiClick={onEmojiClick}
              />
            )}
            <button onClick={sendMessage}>
              <FiSend />
            </button>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
export default Chat;
