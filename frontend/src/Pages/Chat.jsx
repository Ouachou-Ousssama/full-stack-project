import { useEffect, useState } from "react";
import '../Styles/Gemi.css';
import { useParams } from "react-router-dom";
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
      axios.post(
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
      ).then(() => {
        getMessages();
      });
    }
  };

  const getMessages = () => {
    axios
      .get('http://localhost:8000/api/getMessages', {
        params: { user_ids : [
          sender_id , id
        ] },
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
          <div className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer">
            <img
              className="w-10 h-10 rounded-full mr-2"
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
                : "self-start w-auto bg-gray-200 p-2 rounded-lg my-2"
            }
            key={message.id}
          >
            {message.message}
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
