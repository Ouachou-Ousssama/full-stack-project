// import Pusher from "pusher-js";
// import Echo from "laravel-echo";

// window.pusher = require("pusher-js");

// window.Echo = new Echo({
//   broadcaster: "reverb",
//   key: "6kllhgrgsma4ij7tw46d",
//   wsHost: "localhost",
//   wsPort: 8080,
//   forceTLS: false,
//   encrypted: false,
//   enabledTransports: ["ws", "wss"],
//   authEndpoint: "http://localhost:8000/broadcasting/auth",
//   auth: {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   },
// });

const Chat = () => {

  const handleSubmitMsg = (e) => {
    e.preventDefault();
    // window.Echo.channel("my-private-channel.user." + id).whisper("PrivateChannelEvent", { message: msg });
    // console.log(msg);
  };

  return (
    <form onSubmit={handleSubmitMsg}>
      <div>Chat</div>
      <input type="text"/>
    </form>
  );
};

export default Chat;
