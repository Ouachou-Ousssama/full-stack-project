import axios from "axios";
import { useEffect, useState } from "react";

import ProfilePic from "../images/profilee.webp";
import { useNavigate, useParams } from "react-router-dom";

const Details = ({ setIsConnected }) => {
  const [Users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userByForeign, setUserByForeign] = useState([]);
  const [postid, setPostid] = useState("");
  const [likedPosts, setLikedPosts] = useState([]);
  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem("token");

  if (!token) {
    setIsConnected(false);
    navigate("/");
  }

  let className = "#000";

  if (!clicked) {
    className = "#000";
  } else if (clicked) {
    className = "#000";
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
        return [...prevLikedPosts, { post: id, isClicked:  true  }];
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
        console.log(res.data);
      });
  };

  useEffect(() => {
    getDataById();
    getUsersPosts();
    getPostsByForeignKey();
    console.log(Users);
  }, []);

  return (
    <div>
      <h1>Details</h1>
      <h1>firstNamen : {Users.firstName}</h1>
      <h1>lastName :{Users.lastName}</h1>
      <h1> id : {Users.id}</h1>
      <h1>email : {Users.email}</h1>
      <h1>dateBirth : {Users.dateOfBirth}</h1>
      <div className={"w-full"}>
        {posts.map((post, index) => (
          <div
            className={
              "w-full flex flex-col py-4 border border-solid border-[#ebeef0]"
            }
            key={index}
          >
            <div className="ml-2 flex items-center">
              <img
                src={ProfilePic}
                alt="image cl"
                className={"w-9 h-9 rounded-full"}
              />
              <div className="ml-2">
                <div className="font-bold text-[20px]">
                  {userByForeign[index] &&
                    userByForeign[index].firstName +
                      " " +
                      userByForeign[index].lastName}
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
