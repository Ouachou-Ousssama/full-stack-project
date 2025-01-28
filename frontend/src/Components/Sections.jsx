import blur from "../images/Group 2.svg";

const Section = ({ resp, sub }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-[70%]">
      {sub ? (
        <div className="w-full h-full flex flex-col items-center overflow-auto">
          <div className="flex flex-col w-[90%] justify-center items-center gap-2">
            {resp.map((r, index) => (
              <>
                <p className="self-end bg-[#eee] p-2 rounded-[16px]">{r.req}</p>
                <p className="self-start bg-[#eee] p-2 rounded-[16px] max-w-[35%]">
                  {r.res}
                </p>
              </>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center w-[90%]">
          <h1>
            How can we{" "}
            <span className="text-transparent bg-gradient-to-r from-black via-[#9747ff] to-red-500 bg-clip-text">
              assist
            </span>{" "}
            you today?
          </h1>
          <p className="text-center text-[#767676] opacity-50 w-[30%]">
            Get expert guidance powered by AI agents specializing in Sales,
            Marketing, and Negotiation. Choose the agent that suits your needs
            and start your conversation with ease.
          </p>
          <img
            className="absolute bottom-[-160%] z-[-1] w-auto h-auto"
            src={blur}
            alt="blur"
          />
        </div>
      )}
    </div>
  );
};

export default Section;
