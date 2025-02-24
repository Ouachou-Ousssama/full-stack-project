import ProfilePic from "../images/profilee.webp";
import { format } from "date-fns";

const Search = ({ setIsConnected, isDark, searchedPosts }) => {
  return (
    <div
      className={
        isDark
          ? "border-[#000] border flex items-center w-[65%] flex flex-col"
          : "border-[#ebeef0] border flex items-center w-[65%] flex flex-col"
      }
    >
      <>
        {searchedPosts?.map((searchedPost, index) => (
          <div
            className={
              isDark
                ? "w-full flex flex-col py-6 border border-solid border-x-0 border-[#000]"
                : "w-full flex flex-col py-6 border border-solid border-[#ebeef0]"
            }
            key={index}
          >
            <div className="ml-2 flex items-center w-full py-4 px-2">
              <img
                src={ProfilePic}
                alt={ProfilePic}
                className={
                  isDark
                    ? "w-9 h-9 rounded-full invert"
                    : "w-9 h-9 rounded-full"
                }
              />
              <div className={isDark ? "text-white ml-2" : "text-black ml-2"}>
                <div className="flex items-center">
                  <div className="font-bold text-[20px]">
                    {searchedPost.firstName + " " + searchedPost.lastName}
                  </div>
                  <div className="ml-2">
                    {format(
                      new Date(searchedPost.created_at),
                      "MM/dd/yyyy HH:mm:ss"
                    )}
                  </div>
                </div>
                <div>{searchedPost.content}</div>
              </div>
            </div>
          </div>
        ))}
        {searchedPosts.length === 0 && (
          <div className="w-[65%] flex justify-center items-center items-center h-screen">
            <h1 className={isDark ? "text-white text-[40px]" : "text-black text-[40px]"}>
              No results found
            </h1>
          </div>
        )}
      </>
    </div>
  );
};

export default Search;
