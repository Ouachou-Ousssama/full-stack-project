import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useState } from "react";
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
      console.log("eeeeeeeeeeeee");

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

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="gemi-container">
      <div className="gemi">
        <input
          type="text"
          name="inp"
          onChange={handleINp}
          onKeyDown={handleRes}
          placeholder="type your prompt here"
        />
      </div>
      <img className="footer-img" src={logo} alt="img2" />
    </div>
  );
};

export default Gemi;
