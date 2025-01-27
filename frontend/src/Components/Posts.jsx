import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ProfilePic from "../images/profilee.webp";
const Posts = ({ isDark }) => {
  const [userByForeign, setUserByForeign] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [tweet, setTweet] = useState("");
  const [opId, setOpId] = useState(null);
  const [operations, setOperations] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [postid, setPostid] = useState("");
  const [likedPosts, setLikedPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postById, setPostById] = useState([]);
  const [formUpdate, setFormUpdate] = useState({
    content: "",
  });
  const [showUpdateModel, setShowUpdateModel] = useState(false);

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleTweet = (e) => {
    setTweet(e.target.value);
  };

  const handleComment = (id) => {
    navigate(`/comment/${id}`);
  };

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

  let className = "#000";

  if (!isDark && !clicked) {
    className = "#000";
  } else if (!isDark && clicked) {
    className = "#000";
  } else if (isDark && !clicked) {
    className = "#fff";
  } else if (isDark && clicked) {
    className = "#fff";
  }

  const handleOperations = (id) => {
    setOpId(id);
    setOperations((p) => !p);
  };

  const handleEdit = (id) => {
    setShowUpdateModel(true);
    axios
      .get(`http://localhost:8000/api/getPostById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPostById(res.data.content);
      });
  };

  const handleUpdate = (id) => {
    axios
      .put(
        `http://localhost:8000/api/updatePost/${id}`,
        {
          content: formUpdate.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        getPosts();
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/deletePost/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getPosts();
      });
  };

  //console.log(operations);

  const getUserByForeignKey = async () => {
    const res = await axios.get("http://localhost:8000/api/getByForeignKey", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res2 = res.data.reverse();
    setUserByForeign(res2);
  };

  const handleLike = (id) => {
    setPostid(id);
    setClicked((prev) => !prev);

    setLikedPosts((prevLikedPosts) => {
      const existingPostIndex = prevLikedPosts.findIndex(
        (post) => post.post === id
      );

      if (existingPostIndex !== -1) {
        const updatedPosts = [...prevLikedPosts];
        updatedPosts[existingPostIndex].isClicked =
          !updatedPosts[existingPostIndex].isClicked;
        return updatedPosts;
      } else {
        return [...prevLikedPosts, { post: id, isClicked: true }];
      }
    });
  };

  const getPosts = () => {
    axios
      .get("http://localhost:8000/api/getPosts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    getPosts();
    getUserByForeignKey();
  }, []);

  return (
    <div className="w-[65%] flex flex-col h-auto items-center">
      <div
        className={
          isDark
            ? "w-[100%] flex justify-between items-center border border-solid border-[#000] py-2 bg-[#1C2733]"
            : "w-[100%] flex justify-between items-center border border-solid border-[#ebeef0] py-2"
        }
      >
        <div className="w-[100%] flex justify-between">
          <h2 className={isDark ? "text-white ml-3" : "text-black ml-3"}>
            Home
          </h2>
          <motion.div whileHover={{ scale: 1.2, rotate: 360 }} className="mr-3">
            <Link to="/home/AskAi">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color={isDark ? "white" : "black"}
                fill="none"
              >
                <path
                  d="M11.7453 14.85L6.90436 12V7C6.90436 4.79086 8.72949 3 10.9809 3C12.3782 3 13.6113 3.6898 14.3458 4.74128"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.59961 19.1791C10.3266 20.2757 11.5866 21.0008 13.0192 21.0008C15.2707 21.0008 17.0958 19.21 17.0958 17.0008V12.0008L12.1612 9.0957"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.45166 13.5L9.45123 7.66938L13.8642 5.16938C15.814 4.06481 18.3072 4.72031 19.4329 6.63348C20.1593 7.86806 20.1388 9.32466 19.5089 10.4995"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.48963 13.4993C3.8595 14.6742 3.83887 16.131 4.56539 17.3657C5.6911 19.2789 8.18428 19.9344 10.1341 18.8298L14.5471 16.3298L14.643 10.7344"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.0959 17.6309C18.4415 17.5734 19.7295 16.8634 20.4529 15.634C21.5786 13.7209 20.9106 11.2745 18.9608 10.1699L14.5478 7.66992L9.48907 10.4255"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.90454 6.36938C5.55865 6.42662 4.27032 7.13672 3.54684 8.3663C2.42113 10.2795 3.08917 12.7258 5.03896 13.8304L9.45196 16.3304L14.5 13.5807"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
      <div
        className={
          isDark
            ? "w-full border border-solid border-[#000] py-2 bg-[#1C2733]"
            : "w-full border border-solid border-[#ebeef0] py-2"
        }
      >
        <form onSubmit={handleFormSubmit} className="postForm">
          <div className="flex ml-2 mt-2 items-center">
            <img
              src={ProfilePic}
              alt="image c"
              className={
                isDark ? "w-9 h-9 rounded-full invert" : "w-9 h-9 rounded-full"
              }
            />
            <input
              type="text"
              className={
                isDark
                  ? "w-full p-2 ml-2 text-wrap rounded-md hover:border-none hover:outline-none focus:outline-none bg-transparent text-white"
                  : "w-full p-2 ml-2 text-wrap rounded-md hover:border-none hover:outline-none focus:outline-none "
              }
              placeholder="what's happening"
              onChange={handleTweet}
            />
          </div>
          <div className="flex justify-end mr-2">
            <button className="flex items-center justify-center h-10 px-4 text-sm font-semibold text-white bg-[#1D9BF0] rounded-full">
              Tweet
            </button>
          </div>
        </form>
      </div>
      <div
        className={
          isDark
            ? "w-full h-10 bg-[#3A444C] pt-2"
            : "w-full h-10 bg-[#eee] pt-2"
        }
      ></div>
      <div className={isDark ? "w-full bg-[#1C2733] text-white" : "w-full"}>
        {posts.map((post, index) => (
          <div
            className={
              isDark
                ? "w-full flex flex-col py-2 border border-solid border-[#000]"
                : "w-full flex flex-col py-2 border border-solid border-[#ebeef0]"
            }
            key={index}
          >
            <div className="ml-2 flex items-center w-[98%] justify-between">
              <div className="ml-2 flex items-center ">
                <img
                  src={ProfilePic}
                  alt="image cl"
                  className={
                    isDark
                      ? "w-9 h-9 rounded-full invert"
                      : "w-9 h-9 rounded-full"
                  }
                />
                <div className="ml-2">
                  <div className="font-bold text-[20px]">
                    {userByForeign[index] &&
                      userByForeign[index].firstName +
                        " " +
                        userByForeign[index].lastName}
                  </div>
                  <div>
                    {
                      <p
                        className={
                          showUpdateModel && post.id === opId
                            ? "hidden"
                            : "block"
                        }
                      >
                        {post.content}
                      </p>
                    }
                    {showUpdateModel && post.id === opId && (
                      <div className="flex translate-y-2">
                        <input
                          type="text"
                          defaultValue={postById}
                          onChange={(e) =>
                            setFormUpdate({
                              ...formUpdate,
                              content: e.target.value,
                            })
                          }
                          className={
                            isDark
                              ? "focus:outline-none w-1/2 bg-transparent"
                              : "focus:outline-none w-1/2"
                          }
                        />
                        <button
                          className="text-center mr-2 bg-green-400 rounded-lg text-[#fff] px-2"
                          onClick={() => handleUpdate(post.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            color="#000000"
                            fill="none"
                          >
                            <path
                              d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                        <button
                          className="text-center bg-red-400 rounded-lg text-[#fff] px-2"
                          onClick={() => {
                            setShowUpdateModel(false);
                            setOperations(false);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            color="#000000"
                            fill="none"
                          >
                            <path
                              d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {post.user_id == id && (
                <div className="flex flex-col items-end w-1/6 h-full">
                  <div
                    className="flex flex-col text-[25px] font-bold cursor-pointer"
                    onClick={() => handleOperations(post.id)}
                  >
                    ...
                  </div>
                  <div className="flex flex-col w-full h-full">
                    {operations && opId == post.id ? (
                      <div className="w-full flex justify-end h-full">
                        <ul className="text-end flex flex-col justify-between w-1/2 h-full">
                          <li className="w-full h-full">
                            <button
                              className="text-center bg-red-400 w-full text-[#fff] h- rounded-lg mt-1 hover:bg-red-500"
                              onClick={() => handleDelete(post.id)}
                            >
                              Delete
                            </button>
                          </li>
                          <li className="w-full h-full">
                            <button
                              className="text-center bg-green-400 w-full text-[#fff]  rounded-lg mt-1 hover:bg-green-500"
                              onClick={() => handleEdit(post.id)}
                            >
                              Edit
                            </button>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="ml-1 py-1 flex">
              <button className="m-3 flex justify-between w-[38px]">
                <svg
                  onClick={() => handleLike(post.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  color={
                    likedPosts.some(
                      (likedPost) =>
                        likedPost.post === post.id && likedPost.isClicked
                    )
                      ? "red"
                      : "none"
                  }
                  fill={
                    likedPosts.some(
                      (likedPost) =>
                        likedPost.post === post.id && likedPost.isClicked
                    )
                      ? "red"
                      : "none"
                  }
                  className={clicked && postid === post.id ? "border-0" : ""}
                >
                  <path
                    d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
                <p>
                  {post.id === postid && !clicked ? likeCount + 1 : likeCount}
                </p>
              </button>
              <button onClick={() => handleComment(post.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  color={clicked && postid === post.id ? className : className}
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
  );
};

export default Posts;
