import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState, lazy } from "react";
import "../Styles/Gemi.css";
import ProfilePic from "../images/profilee.webp";
const Skeleton = lazy(() => import("../Components/Skeleton"));
const Posts = lazy(() => import("../Components/Posts"));
const Profile = lazy(() => import("./Profile"));
const Details = lazy(() => import("./Details"));

const Home = ({ setIsConnected }) => {
  const [users, setUsers] = useState([]);
  const [isDark, setIsDark] = useState();
  const [iserr, setIserr] = useState(false);
  const [news, setNews] = useState([]);
  const [component, setComponent] = useState(1);
  const [isLoadingUsers, setIsLoadingUsers] = useState("pending");
  const [isLoadingNews, setIsLoadingNews] = useState("pending");

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  //console.log(isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");

  const navigate = useNavigate();
  //console.log(tweet);
  //console.log(userByForeign);
  const LogOut = () => {
    axios
      .post("http://localhost:8000/api/logOut", {
        id: id,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    localStorage.removeItem("token");
    setIsConnected(false);
    navigate("/");
  };

  if (!token || iserr) {
    setIsConnected(false);
    navigate("/");
  }
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

  const idsOnly = users.map((user) => user.id);

  const filtredUsers = users.filter(
    (user) => user.id != localStorage.getItem("id")
  );

  useEffect(() => {
    if (filtredUsers) {
      setIsLoadingUsers("completed");
    }
  }, [filtredUsers]);

  console.log(isLoadingUsers);

  console.log(filtredUsers);

  const handleDarkMode = () => {
    setIsDark((p) => !p);
    //console.log(isDark);
  };
  //console.log(filtredUsers);

  const newsApiKey = process.env.REACT_APP_API_KEY2;
  const apiSliced = newsApiKey.slice(1, -1);

  const getNews = () => {
    setIsLoadingNews("pending");
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiSliced}`
      )
      .then((res) => {
        setNews([
          res.data.articles[3],
          res.data.articles[1],
          res.data.articles[2],
        ]);
        setIsLoadingNews("completed");
      });
  };

  useEffect(() => {
    console.log(component);
  }, [component]);

  //console.log(userByForeign);

  useEffect(() => {
    getUsers();
    getNews();
  }, []);

  return (
    <div
      className={
        isDark ? "w-full flex relative bg-[#1C2733]" : "w-full flex relative"
      }
    >
      <div
        className={
          isDark
            ? "w-[15%] flex flex-col h-screen align-center justify-between bg-[#1C2733] sticky top-0 left-0"
            : "w-[15%] flex flex-col h-screen align-center justify-between sticky top-0"
        }
      >
        <div className="w-full flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="30"
            height="30"
            color="#000000"
            fill={isDark ? "#fff" : "#000000"}
            className="mt-2"
          >
            <path
              d="M2 18.5C3.76504 19.521 5.81428 20 8 20C14.4808 20 19.7617 14.8625 19.9922 8.43797L22 4.5L18.6458 5C17.9407 4.37764 17.0144 4 16 4C13.4276 4 11.5007 6.51734 12.1209 8.98003C8.56784 9.20927 5.34867 7.0213 3.48693 4.10523C2.25147 8.30185 3.39629 13.3561 6.5 16.4705C6.5 17.647 3.5 18.3488 2 18.5Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="flex flex-col h-36 items-center">
          <ul className="flex flex-col items-center justify-between h-full">
            <motion.li
              onClick={() => setComponent(1)}
              whileHover={{ scale: 1.1, x: 10, y: -5 }}
            >
              <button className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  fill={isDark ? "#fff" : "#000000"}
                >
                  <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                </svg>{" "}
                <p className={isDark ? "text-white" : "text-black"}>Home</p>
              </button>
            </motion.li>
            <motion.li
              onClick={() => setComponent(2)}
              className="cursor-pointer"
              whileHover={{ scale: 1.1, x: 10, y: -5 }}
            >
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill={isDark ? "#fff" : "#000000"}
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                </svg>{" "}
                <p className={isDark ? "mr-1 text-white" : "mr-1"}>profile</p>
              </div>
            </motion.li>
            <motion.li
              onClick={() => setComponent(3)}
              className="cursor-pointer"
              whileHover={{ scale: 1.1, x: 10, y: -5 }}
            >
              <button className="flex items-center justify-center h-10 px-10 text-sm font-semibold text-white bg-[#1D9BF0] rounded-full cursor-pointer">
                Tweet
              </button>
            </motion.li>
          </ul>
        </div>
        <div className="w-full flex justify-evenly items-center mb-2">
          <img
            src={ProfilePic}
            alt="image"
            className={
              isDark ? "w-9 h-9 rounded-full invert" : "w-9 h-9 rounded-full"
            }
          />
          <div className="flex align-center">
            <div className={isDark && "text-white flex items-center"}>
              {localStorage.getItem("firstName") +
                " " +
                localStorage.getItem("lastName")}{" "}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, x: 5, y: -5 }}
            className="flex items-center"
            onClick={LogOut}
            name="logOut"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              color={isDark ? "#fff" : "#000000"}
              fill={isDark ? "#fff" : "#000000"}
            >
              <path
                d="M11 3L10.3374 3.23384C7.75867 4.144 6.46928 4.59908 5.73464 5.63742C5 6.67576 5 8.0431 5 10.7778V13.2222C5 15.9569 5 17.3242 5.73464 18.3626C6.46928 19.4009 7.75867 19.856 10.3374 20.7662L11 21"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M21 12L11 12M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </motion.button>
        </div>
      </div>
      {component === 1 ? (
        <Posts setIsConnected={setIsConnected} isDark={isDark} />
      ) : component === 2 ? (
        <Profile setIsConnected={setIsConnected} isDark={isDark} />
      ) : component === 3 ? (
        <Posts setIsConnected={setIsConnected} isDark={isDark} />
      ) : (
        idsOnly.map(
          (id) =>
            id == component && (
              <Details
                setIsConnected={setIsConnected}
                isDark={isDark}
                id={component}
              />
            )
        )
      )}
      <div
        className={
          isDark
            ? "w-[20%] flex flex-col items-center h-screen justify-between bg-[#1C2733] sticky top-0"
            : "w-[20%] flex flex-col items-center h-screen justify-between bg-white sticky top-0"
        }
      >
        <div className="mt-2 flex items-center w-[90%] justify-between">
          <input
            type="text"
            placeholder="Search Twitter"
            className={
              isDark
                ? "w-[85%] text-wrap rounded-md hover:border-none hover:outline-none focus:outline-none bg-transparent text-white"
                : "w-[85%] text-wrap rounded-md hover:border-none hover:outline-none focus:outline-none "
            }
          />
          <div className="flex items-center w-[100%] justify-between">
            <div className="day">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill={isDark ? "yellow" : "yellow"}
              >
                <path
                  d="M19.0398 10.3679C17.9251 9.7936 17.7602 9.33788 18.1319 8.17618C18.3274 7.56515 18.9174 6.39175 18.4745 5.76736C17.8935 4.94821 16.5388 5.63909 15.8237 5.86792C14.6294 6.25004 14.1906 6.04435 13.6319 4.96008C13.3117 4.33848 12.8801 3.00008 11.9998 3.00008C11.1194 3.00008 10.6878 4.33848 10.3676 4.96008C9.80895 6.04435 9.37015 6.25004 8.17585 5.86792C7.46067 5.63909 6.10601 4.94821 5.52499 5.76736C5.08211 6.39175 5.67208 7.56515 5.86759 8.17618C6.23928 9.33788 6.07445 9.7936 4.95975 10.3679C4.33819 10.6881 2.99986 11.1197 2.99976 12C2.99965 12.8804 4.33812 13.312 4.95975 13.6323C6.07445 14.2066 6.23928 14.6623 5.86759 15.824C5.65428 16.4906 5.0124 17.7434 5.63737 18.3656C6.26014 18.9857 7.51055 18.3451 8.17585 18.1322C9.37015 17.7501 9.80895 17.9558 10.3676 19.0401C10.6878 19.6617 11.1194 21.0001 11.9998 21.0001C12.8801 21.0001 13.3117 19.6617 13.6319 19.0401C14.1906 17.9558 14.6294 17.7501 15.8237 18.1322C16.489 18.3451 17.7394 18.9857 18.3621 18.3656C18.9871 17.7434 18.3452 16.4906 18.1319 15.824C17.7602 14.6623 17.9251 14.2066 19.0398 13.6323C19.6614 13.312 20.9999 12.8804 20.9998 12C20.9997 11.1197 19.6613 10.6881 19.0398 10.3679Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
            </div>
            <div
              className={
                isDark
                  ? "bg-[#000] w-1/2 h-7 rounded-full flex items-center justify-end"
                  : "bg-[#eee] w-1/2 h-7 rounded-full flex items-center justify-start"
              }
              onClick={handleDarkMode}
            >
              <span
                className={
                  isDark
                    ? "bg-[#fff] w-1/3 h-6 rounded-full flex align-center justify-center"
                    : "bg-[#1C2733] w-1/3 h-6 rounded-full flex align-center justify-center"
                }
              ></span>
            </div>
            <div className="dark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill={isDark ? "#fff" : "#000"}
              >
                <path
                  d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div
          className={
            isDark
              ? "w-[90%] h-auto rounded-2xl bg-[#eee] flex flex-col  items-center justify-center bg-[#283340]"
              : "w-[90%] h-auto rounded-2xl bg-[#eee] flex flex-col items-center justify-center"
          }
        >
          <h1
            className={
              isDark
                ? "flex h-full justify-start rounded-t-2xl py-3 w-[100%] text-[#eee] font-bold text-[20px] items-center bg-[#283340]"
                : "flex h-full justify-start rounded-t-2xl py-3 w-[100%] font-bold text-[20px] items-center"
            }
          >
            <p className={isDark ? "ml-3" : "ml-3"}>What's Happening</p>
          </h1>
          {isLoadingNews !== "pending" && news ? (
            news.map((item) => (
              <div
                className={
                  isDark
                    ? "w-full flex items-center justify-between bg-[#283340] text-[#fff]"
                    : "w-full flex items-center justify-between"
                }
              >
                <div className="w-[80%] ml-1 flex justify-center">
                  <span className="text-[12px] text-wrap py-3 ml-1">
                    {item.title}
                  </span>
                </div>
                <div className="mr-1">
                  <img
                    src={item.urlToImage}
                    className="w-10 h-10 rounded-2xl"
                    alt="img"
                  />
                </div>
              </div>
            ))
          ) : (
            <>
              <Skeleton />
            </>
          )}
        </div>
        <div
          className={
            isDark
              ? "bg-[#283340] w-[90%] h-auto flex flex-col items-center bg-[#283340] justify-center rounded-2xl"
              : "bg-[#1C2733] w-[90%] h-auto flex flex-col items-center bg-white justify-between rounded-b-2xl"
          }
        >
          <div
            className={
              isDark
                ? "bg-[#283340] w-[100%] h-full flex flex-col items-center bg-[#283340] justify-center rounded-2xl"
                : "bg-[#1C2733] w-[100%] h-full flex flex-col items-center bg-white justify-between rounded-b-2xl"
            }
          >
            <h2
              className={
                isDark
                  ? "text-white bg-[#283340] w-full py-2 rounded-t-2xl"
                  : "text-black w-full  py-2 bg-[#eee] rounded-t-2xl"
              }
            >
              <p className="ml-3 font-bold text-[20px]">Who To Follows</p>
            </h2>
            {isLoadingUsers !== "pending" && filtredUsers ? (
              filtredUsers.map((user, index) => (
                <>
                  <div
                    key={index}
                    className={
                      isDark
                        ? "w-full flex items-center justify-center bg-[#283340] "
                        : "w-full flex items-center justify-center bg-[#eee]"
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
                              ? "bg-[#283340] rounded-full flex w-4 h-4 justify-center items-center translate-y-5 translate-x-[-9px]"
                              : "bg-[#eee] rounded-full flex w-4 h-4 justify-center items-center translate-y-5 translate-x-[-9px]"
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
                        className={
                          isDark ? "mr-2 text-white" : "mr-2 text-black"
                        }
                      >
                        {user.firstName + " " + user.lastName}
                      </div>
                      <div className="mr-2">
                        <motion.div whileHover={{ scale: 1.1 }}>
                          <button
                            onClick={() => setComponent(user.id)}
                            name={user.id}
                            className="linkk"
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
                <Skeleton />
              </>
            )}
          </div>
        </div>
        <div className="w-[90%] text-center mb-2">
          <p className={isDark ? "text-white" : "text-[#000]"}>
            Terms of Service Privacy Policy Cookie Policy Ads info More &copy;
            2021 Twitter, Inc.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
