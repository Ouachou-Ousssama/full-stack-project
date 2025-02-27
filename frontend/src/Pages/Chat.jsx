import { useEffect, useState } from "react";
import "../Styles/Gemi.css";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ProfilePic from "../images/profilee.webp";

function Chat() {
  const [usersByForeign, setUserByForeign] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setmessages] = useState([]);

  const { id } = useParams();
  const token = localStorage.getItem("token");
  const sender_id = localStorage.getItem("id");

  const getPostsByForeignKey = async () => {
    const res = await axios.get(
      `http://localhost:8000/api/getPostsByForeignKey/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUserByForeign({
      ...usersByForeign,
      firstName: res.data[0].firstName,
      lastName: res.data[0].lastName,
      email: res.data[0].email,
    });
  };

  const handleMessageSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      axios
        .post(
          "http://localhost:8000/api/createMessage",
          {
            sender_id: sender_id,
            receiver_id: id,
            message: message,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          getMessages();
        });
    }
  };

  const getMessages = () => {
    axios
      .get("http://localhost:8000/api/getMessages", {
        params: { user_ids: [sender_id, id] },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setmessages(res.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    getPostsByForeignKey();
    getMessages();
  }, []);

  return (
    <div className="flex flex-col justify-between h-screen mx-auto p-4">
      <div className="flex flex-col flex-shrink-0 bg-white h-[10%]">
        <div className="flex flex-col border-b overflow-y-auto">
          <div className="flex items-center  py-2 hover:bg-gray-100 cursor-pointer">
            <Link to="/home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
              >
                <path
                  d="M4.80823 9.44118L6.77353 7.46899C8.18956 6.04799 8.74462 5.28357 9.51139 5.55381C10.4675 5.89077 10.1528 8.01692 10.1528 8.73471C11.6393 8.73471 13.1848 8.60259 14.6502 8.87787C19.4874 9.78664 21 13.7153 21 18C19.6309 17.0302 18.2632 15.997 16.6177 15.5476C14.5636 14.9865 12.2696 15.2542 10.1528 15.2542C10.1528 15.972 10.4675 18.0982 9.51139 18.4351C8.64251 18.7413 8.18956 17.9409 6.77353 16.5199L4.80823 14.5477C3.60275 13.338 3 12.7332 3 11.9945C3 11.2558 3.60275 10.6509 4.80823 9.44118Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Link>
            <img
              className="w-10 h-10 rounded-full mr-2 ml-2"
              src={ProfilePic}
              alt="Profile"
            />
            <div>
              <p className="text-sm font-semibold">
                {usersByForeign.firstName + " " + usersByForeign.lastName}
              </p>
              <p className="text-xs text-gray-500">{usersByForeign.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-[85%] w-full overflow-y-auto">
        {messages.map((message) => (
          <div
            className={
              sender_id == message.sender_id
                ? "self-end w-auto bg-blue-500 text-white p-2 rounded-lg my-2"
                : "self-start w-auto flex items-start p-2 rounded-lg my-2"
            }
            key={message.id}
          >
            {message.sender_id != sender_id && (
              <img
                className="w-9 h-9 rounded-full mr-2"
                src={ProfilePic}
                alt="Profile"
              />
            )}
            <div
              className={
                message.sender_id != sender_id && "bg-gray-100 p-2 rounded "
              }
            >
              <p className="font-bold">
                {message.sender_id != sender_id &&
                  usersByForeign.firstName + " " + usersByForeign.lastName}
              </p>
              <p className="text-sm">{message.message}</p>
            </div>
          </div>
        ))}
      </div>
      <form className="mt-4 h-[5%]">
        <input
          className="form-input w-full p-2 border rounded"
          placeholder="Write a message"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleMessageSubmit}
        />
      </form>
    </div>
  );
}

export default Chat;
