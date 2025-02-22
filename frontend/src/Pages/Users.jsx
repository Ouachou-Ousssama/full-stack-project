import { lazy, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ProfilePic from "../images/profilee.webp";
import { Link } from "react-router-dom";
const Skeleton = lazy(() => import("../Components/Skeleton"));
const Details = lazy(() => import("./Details"));

const Users = ({ isDark, setComponent, component, setIsConnected }) => {
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState("pending");
  const [iserr, setIserr] = useState(false);

  const token = localStorage.getItem("token");

  const getUsers = () => {
    setIsLoadingUsers("pending");
    axios
      .get("http://localhost:8000/api/getGuests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch(() => setIserr(true));
  };

  const filtredUsers = users.filter(
    (user) => user.id != localStorage.getItem("id")
  );

  const idsOnly = users.map((user) => user.id);

  useEffect(() => {
    if (filtredUsers) {
      setIsLoadingUsers("completed");
    }
  }, [filtredUsers]);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div
        className={
          isDark
            ? "w-[65%] flex flex-col h-auto items-center mt-1 border border-solid border-[#000] p-3"
            : "w-[65%] flex flex-col h-auto items-center mt-1 border border-solid border-[#ebeef0] p-3"
        }
      >
        {isLoadingUsers !== "pending" && filtredUsers ? (
          filtredUsers.map((user, index) => (
            <>
              <div
                key={index}
                className={
                  isDark
                    ? "w-full flex items-center justify-center bg-[#283340] mt-3 py-2"
                    : "w-full flex items-center justify-center bg-[#eee] mt-3 py-2"
                }
              >
                <div
                  className={
                    isDark
                      ? "flex justify-between w-[90%] items-center bg-[#283340] py-2 text-white border-y border-black"
                      : "flex justify-between w-[90%] py-2 text-white items-center border-y border-gray-300"
                  }
                >
                  <div className="flex">
                    <img
                      src={ProfilePic}
                      alt="image"
                      className={
                        isDark
                          ? "w-9 h-9 rounded-full invert"
                          : "w-9 h-9 rounded-full"
                      }
                    />
                    <div
                      className={
                        isDark
                          ? "rounded-full flex w-4 h-4 justify-center items-center translate-y-5 translate-x-[-9px]"
                          : "rounded-full flex w-4 h-4 justify-center items-center translate-y-5 translate-x-[-9px]"
                      }
                    >
                      <div
                        className={
                          user.is_online
                            ? "bg-green-500 w-2  h-2  rounded-full"
                            : "bg-red-500 w-2  h-2  rounded-full"
                        }
                      ></div>
                    </div>
                  </div>
                  <div
                    className={isDark ? "mr-2 text-white" : "mr-2 text-black"}
                  >
                    {user.firstName + " " + user.lastName}
                  </div>
                  <div className="mr-2">
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <button
                        name={user.id}
                        className="linkk"
                        onClick={() => setComponent(user.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          color={isDark ? "#fff" : "#000"}
                          fill="none"
                        >
                          <path
                            d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                          />
                          <path
                            d="M11 7L17 7"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                          <path
                            d="M7 7L8 7"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                          <path
                            d="M7 12L8 12"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                          <path
                            d="M7 17L8 17"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                          <path
                            d="M11 12L17 12"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                          <path
                            d="M11 17L17 17"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                        </svg>
                      </button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Link to={`/home/chat/${user.id}`} name={user.id}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          color={isDark ? "#fff" : "#000"}
                          fill="none"
                        >
                          <path
                            d="M20 9C19.2048 5.01455 15.5128 2 11.0793 2C6.06549 2 2 5.85521 2 10.61C2 12.8946 2.93819 14.9704 4.46855 16.5108C4.80549 16.85 5.03045 17.3134 4.93966 17.7903C4.78982 18.5701 4.45026 19.2975 3.95305 19.9037C5.26123 20.1449 6.62147 19.9277 7.78801 19.3127C8.20039 19.0954 8.40657 18.9867 8.55207 18.9646C8.65392 18.9492 8.78659 18.9636 9 19.0002"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M11 16.2617C11 19.1674 13.4628 21.5234 16.5 21.5234C16.8571 21.5238 17.2132 21.4908 17.564 21.425C17.8165 21.3775 17.9428 21.3538 18.0309 21.3673C18.119 21.3807 18.244 21.4472 18.4938 21.58C19.2004 21.9558 20.0244 22.0885 20.8169 21.9411C20.5157 21.5707 20.31 21.1262 20.2192 20.6496C20.1642 20.3582 20.3005 20.075 20.5046 19.8677C21.4317 18.9263 22 17.6578 22 16.2617C22 13.356 19.5372 11 16.5 11C13.4628 11 11 13.356 11 16.2617Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <>
            <Skeleton isDark={isDark} />
            <Skeleton isDark={isDark} />
            <Skeleton isDark={isDark} />
            <Skeleton isDark={isDark} />
            <Skeleton isDark={isDark} />
            <Skeleton isDark={isDark} />
            <Skeleton isDark={isDark} />
            <Skeleton isDark={isDark} />
            <Skeleton isDark={isDark} />
            <Skeleton isDark={isDark} />
            <Skeleton isDark={isDark} />
          </>
        )}
      </div>
      {
        <div>
          {idsOnly.map(
            (id) =>
              id == component && (
                <Details
                  setIsConnected={setIsConnected}
                  isDark={isDark}
                  id={component}
                  setComponent={setComponent}
                />
              )
          )}
        </div>
      }
    </>
  );
};

export default Users;
