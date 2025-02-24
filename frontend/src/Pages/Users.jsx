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
  const id = localStorage.getItem("id");

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
      })
      .catch(() => setIserr(true));
  };

  const isAdmin = users.find((user) => user.role == "admin" && user.id == id);
  console.log(isAdmin);

  const filtredUsers = users.filter(
    (user) => user.id != localStorage.getItem("id")
  );

  const handleDelete = (id) => {
    console.log(id);
  };

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
                    ? "w-full flex items-center justify-center py-2 bg-[#283340] mt-3"
                    : "w-full flex items-center justify-center py-2 bg-[#eee] mt-3"
                }
              >
                <div
                  className={
                    isDark
                      ? "flex justify-between w-[90%] items-center py-2 bg-[#283340] text-white border-y border-black"
                      : "flex justify-between w-[90%] text-white py-2 items-center border-y border-gray-300"
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
                  <div className="mr-2 flex flex-col h-full justify-between">
                    <motion.div whileHover={{ scale: 1.1 }} className="py-1">
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
                    <motion.div whileHover={{ scale: 1.1 }} className="py-1">
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
                    {isAdmin && (
                      <motion.div whileHover={{ scale: 1.1 }} className="py-1">
                        <button onClick={() => handleDelete(user.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            color={isDark ? "#fff" : "#000"}
                            fill="none"
                          >
                            <path
                              d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                            <path
                              d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                            <path
                              d="M9.5 16.5L9.5 10.5"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                            <path
                              d="M14.5 16.5L14.5 10.5"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                          </svg>
                        </button>
                      </motion.div>
                    )}
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
