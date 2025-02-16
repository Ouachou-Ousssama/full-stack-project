import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import logo from "../images/Group 18.svg";
import "../Styles/Gemi.css";
const Gemi = ({ sendDataToParent, apiKey }) => {
  const [reqs, setreqs] = useState([]);
  const [ress, setress] = useState([]);
  const [data, setdata] = useState([]);
  const [reqq, setreqq] = useState();
  const [key, setkey] = useState(apiKey);
  const [sub, setsub] = useState(false);

  const handleINp = (e) => {
    setreqq(e.target.value);
  };

  const handleRes = (e) => {
    if (e.key === "Enter") {
      setkey(apiKey);
      setreqs([...reqs, reqq]);
      setsub(true);

      const genAI = new GoogleGenerativeAI(key);

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 900,
        responseMimeType: "text/plain",
      };

      async function run(useInput) {
        const chatSession = model.startChat({
          generationConfig,
          history: [],
        });

        const result = await chatSession.sendMessage(useInput);
        setress([...ress, result.response.text()]);
        setdata([...data, { req: reqq, res: result.response.text() }]);
      }
      run(reqq);
    }
  };

  sendDataToParent({ data: data, sub: sub });

  return (
    <div className="w-full h-[20%] flex justify-center items-center relative">
      <div className="w-[90%] flex justify-center items-center">
        <input
          type="text"
          name="inp"
          className="w-[90%] rounded-[18px] bg-[#8c8c8c1a] color-[#424242] p-[15px]"
          onChange={handleINp}
          onKeyDown={handleRes}
          placeholder="type your prompt here"
        />
      </div>
      <img className="absolute bottom-0 left-[-20%] w-[700px] h-[700px] z-[-1]" src={logo} alt="img2" />
    </div>
  );
};

export default Gemi;
