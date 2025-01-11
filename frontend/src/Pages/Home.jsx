import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import image from "../images/Gemini.jpeg";
import "../Styles/Home.css";

const Home = ({ setIsConnected }) => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tweet, setTweet] = useState("");
  const [userByForeign, setUserByForeign] = useState([]);
  const [iserr, setIserr] = useState(false);

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  //console.log(id);

  const navigate = useNavigate();

  
  const handleTweet = (e) => {
    setTweet(e.target.value);
  };

  //console.log(tweet);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/createPost",
        {
          user_id: id,
          content: tweet,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        window.location.reload();
      });
  };

  const getUserByForeignKey = async () => {
    const res = await axios.get("http://localhost:8000/api/getByForeignKey", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUserByForeign(res.data);
  };

  const handleInsertTweet = (e) => {
    e.preventDefault();
  };

  const LogOut = () => {
    localStorage.removeItem("token");
    setIsConnected(false);
  };

  if (!token || iserr) {
    setIsConnected(false);
    navigate("/");
  }
  const getUsers = () => {
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

  const filtredUsers = users.filter(
    (user) => user.id != localStorage.getItem("id")
  );
  //console.log(filtredUsers);

  const getPosts = () => {
    axios
      .get("http://localhost:8000/api/getPosts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPosts(res.data);
        console.log(res.data[0].created_at);
        
      });
  };

  //console.log(userByForeign);

  useEffect(() => {
    getUsers();
    getPosts();
    getUserByForeignKey();
  }, []);

  return (
    <div className="container">
      <div className="leftSide">
        <div className="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="30"
            height="30"
            color="#000000"
            fill="blue"
            opacity={"0.4"}
          >
            <path
              d="M2 18.5C3.76504 19.521 5.81428 20 8 20C14.4808 20 19.7617 14.8625 19.9922 8.43797L22 4.5L18.6458 5C17.9407 4.37764 17.0144 4 16 4C13.4276 4 11.5007 6.51734 12.1209 8.98003C8.56784 9.20927 5.34867 7.0213 3.48693 4.10523C2.25147 8.30185 3.39629 13.3561 6.5 16.4705C6.5 17.647 3.5 18.3488 2 18.5Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="navv">
          <ul>
            <li>
              <button className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1" 
                  
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                </svg>{" "}
                Home
              </button>
            </li>
            <li className="flex justify-between w-full">
              <Link to={`/home/profile/${localStorage.getItem("id")}`} className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1" 
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                </svg>{" "}
                <p className="mr-1">profile</p>
              </Link>
            </li>
            <li>
              <button className="Tweet" onClick={handleInsertTweet}>
                Tweet
              </button>
            </li>
          </ul>
        </div>
        <div className="left-bottom">
          <div className="logooo"></div>
          <div className="user-logout">
            <div>
              {localStorage.getItem("firstName") +
                " " +
                localStorage.getItem("lastName")}{" "}
            </div>
          </div>
          <button className="button-logout" onClick={LogOut}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              color="#000000"
              fill="none"
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
          </button>
        </div>
      </div>
      <div className="middle">
        <div className="home-top">
          <h2>Home</h2>
        </div>
        <div className="insertPost">
          <form onSubmit={handleFormSubmit} className="postForm">
            <div className="post-up">
              <div className="logooo"></div>
              <input
                type="text"
                placeholder="what's happening"
                onChange={handleTweet}
              />
            </div>
            <div className="post-down">
              <button className="flex items-center justify-center h-10 px-4 py-2 text-sm font-semibold text-white bg-[#1D9BF0] rounded-full">Tweet</button>
            </div>
          </form>
        </div>
        <div className="divider"></div>
        <div className="thread">
          {posts.map((post, index) => (
            <div className="postContainer" key={index}>
              <div className="thread-up">
                <div className="logooo"></div>
                <div className="firsttlast">
                  <div className="firstandlastname">
                    {userByForeign[index] &&
                      userByForeign[index].firstName +
                        " " +
                        userByForeign[index].lastName}
                  </div>
                  <div>{post.content}</div>
                </div>
              </div>
              <div className="thread-down">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    color="#000000"
                    fill="none"
                  >
                    <path
                      d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    color="#000000"
                    fill="none"
                  >
                    <path
                      d="M8 13.5H16M8 8.5H12"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.09881 19C4.7987 18.8721 3.82475 18.4816 3.17157 17.8284C2 16.6569 2 14.7712 2 11V10.5C2 6.72876 2 4.84315 3.17157 3.67157C4.34315 2.5 6.22876 2.5 10 2.5H14C17.7712 2.5 19.6569 2.5 20.8284 3.67157C22 4.84315 22 6.72876 22 10.5V11C22 14.7712 22 16.6569 20.8284 17.8284C19.6569 19 17.7712 19 14 19C13.4395 19.0125 12.9931 19.0551 12.5546 19.155C11.3562 19.4309 10.2465 20.0441 9.14987 20.5789C7.58729 21.3408 6.806 21.7218 6.31569 21.3651C5.37769 20.6665 6.29454 18.5019 6.5 17.5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rightSide">
        <div>
          <Link to="/home/AskAi">
            <img style={{ width: "70px", height: "50px" }} src={image} alt="" />
          </Link>
        </div>
        <div className="users">
          <h3>Who To Follows</h3>
          {filtredUsers.map((user, index) => (
            <>
              <div key={index} className="user-container">
                <div className="userr">
                  <div className="logooo"></div>
                  <div>{user.firstName + " " + user.lastName}</div>
                  <div className="details">
                    <Link className="linkk" to={`/home/${user.id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#000000"
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
                    </Link>
                    <Link to={`/home/chat/${user.id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#000000"
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
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="copyRight">
          <p>
            Terms of Service Privacy Policy Cookie Policy Ads info More © 2021
            Twitter, Inc.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
