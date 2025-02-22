import axios from "axios";
import { useEffect, useState } from "react";
import ProfilePic from "../images/profilee.webp";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const Details = ({ setIsConnected, isDark, id }) => {
  const [Users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userByForeign, setUserByForeign] = useState([]);
  const [postid, setPostid] = useState("");
  const [likedPosts, setLikedPosts] = useState([]);
  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const localId = localStorage.getItem("id");

  if (!token) {
    setIsConnected(false);
    navigate("/");
  }

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

  const getPostsByForeignKey = async () => {
    const res = await axios.get(
      `http://localhost:8000/api/getPostsByForeignKey/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUserByForeign(res.data);
  };

  const getDataById = () => {
    axios
      .get(`http://localhost:8000/api/getUserById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      });
  };

  const getUsersPosts = () => {
    axios
      .get(`http://localhost:8000/api/getPosts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPosts(res.data);
      });
  };

  useEffect(() => {
    getDataById();
    getUsersPosts();
    getPostsByForeignKey();
  }, []);

  return (
    <div className="w-[65%] h-auto flex flex-col">
      <div
        className={
          isDark
            ? "w-[100%] h-auto bg-[#1C2733] text-white border border-solid border-[#000]"
            : "w-[100%] h-auto border border-solid border-[#ebeef0]"
        }
      >
        <div
          className={
            isDark
              ? "w-[100%] h-[200px] bg-[#171715] relative"
              : "w-[100%] h-[200px] bg-[#ebeef0] relative"
          }
        >
          <img
            src={ProfilePic}
            alt={ProfilePic}
            className={
              isDark
                ? "w-[13%] invert h-[60%] bg-red-400 rounded-full absolute top-[60%] left-[10px]"
                : "w-[13%] h-[60%] bg-red-400 rounded-full absolute top-[60%] left-[10px]"
            }
          />
        </div>
        <div className="mt-10">
          <div className="flex justify-between">
            <div className="p-2 ml-2 text-[25px] font-bold">
              {Users.firstName + " " + Users.lastName}
            </div>
            {localId === Users.id && (
              <div className="flex mr-2">
                <button className="font-bold text-[#1DA1F2] border border-solid border-[#1DA1F2] rounded-[20px] px-4">
                  Edit Profile
                </button>
              </div>
            )}
          </div>
          <div className="flex">
            <div className="p-2 flex justify-start">
              <svg
                className="mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color={isDark ? "#fff" : "#000"}
                fill="none"
              >
                <path
                  d="M13.5 4.5C13.5 5.32843 12.8284 6 12 6C11.1716 6 10.5 5.32843 10.5 4.5C10.5 3.67157 12 2 12 2C12 2 13.5 3.67157 13.5 4.5Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 6V9"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.6667 14C19.2315 14 20.5 12.8807 20.5 11.5C20.5 10.1193 19.2315 9 17.6667 9H6.33333C4.76853 9 3.5 10.1193 3.5 11.5C3.5 12.8807 4.76853 14 6.33333 14C7.70408 14 8.90415 13.1411 9.16667 12C9.42919 13.1411 10.6293 14 12 14C13.3707 14 14.5708 13.1411 14.8333 12C15.0959 13.1411 16.2959 14 17.6667 14Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M5 14L5.52089 16.5796C6.04532 19.1768 6.30754 20.4754 7.19608 21.2377C8.08462 22 9.33608 22 11.839 22H12.161C14.6639 22 15.9154 22 16.8039 21.2377C17.6925 20.4754 17.9547 19.1768 18.4791 16.5796L19 14"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>{" "}
              {Users.dateOfBirth}
            </div>
            <div className="flex p-2 justify-start">
              <svg
                className="mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color={isDark ? "#fff" : "#000"}
                fill="none"
              >
                <path
                  d="M14.5 9C14.5 10.3807 13.3807 11.5 12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="M13.2574 17.4936C12.9201 17.8184 12.4693 18 12.0002 18C11.531 18 11.0802 17.8184 10.7429 17.4936C7.6543 14.5008 3.51519 11.1575 5.53371 6.30373C6.6251 3.67932 9.24494 2 12.0002 2C14.7554 2 17.3752 3.67933 18.4666 6.30373C20.4826 11.1514 16.3536 14.5111 13.2574 17.4936Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="M18 20C18 21.1046 15.3137 22 12 22C8.68629 22 6 21.1046 6 20"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
              Morooco
            </div>
            <div className="flex p-2 justify-start">
              <svg
                className="mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color={isDark ? "#fff" : "#000"}
                fill="none"
              >
                <path
                  d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
              </svg>
              {Users.email}
            </div>
          </div>
        </div>
      </div>
      <div className={isDark ? "w-full bg-[#1C2733] text-white" : "w-full"}>
        {posts.map((post, index) => (
          <div
            className={
              isDark
                ? "w-full flex flex-col py-4 border border-solid border-[#000]"
                : "w-full flex flex-col py-4 border border-solid border-[#ebeef0]"
            }
            key={index}
          >
            <div className="ml-2 flex items-center">
              <img
                src={ProfilePic}
                alt={ProfilePic}
                className={
                  isDark
                    ? "w-9 h-9 rounded-full invert"
                    : "w-9 h-9 rounded-full"
                }
              />
              <div className="ml-2">
                <div className="flex items-center">
                  <div className="font-bold text-[20px]">
                    {userByForeign[index] &&
                      userByForeign[index].firstName +
                        " " +
                        userByForeign[index].lastName}
                  </div>
                  <div className="ml-2">
                    {format(new Date(post.created_at), "MM/dd/yyyy HH:mm:ss")}
                  </div>
                </div>
                <div>{post.content}</div>
              </div>
            </div>
            <div className="ml-1 py-1">
              <button className="m-3">
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
              </button>
              <button>
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

export default Details;
