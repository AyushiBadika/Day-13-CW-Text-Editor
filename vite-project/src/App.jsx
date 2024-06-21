/* eslint-disable react/prop-types */
import { useReducer, useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import "./App.css";

function App() {
  const [stripValue, setStripValue] = useState("");
  const themeReducer = (state, action) => {
    setIsVisible(true);
    setStripValue(action.payload);
    setTimeout(() => setIsVisible(false), 1500);
    return action.type;
  };
  const [isVisible, setIsVisible] = useState(false);
  const [state, dispatch] = useReducer(themeReducer, "Light");
  return (
    <>
      <Navbar state={state} dispatch={dispatch} />
      {isVisible ? (
        <div
          className={`absolute w-full bg-green-100 border-y-[1px] border-green-200 py-5 px-8 text-green-700 `}
        >
          <strong className="text-green-900">Success </strong>: {stripValue}
        </div>
      ) : (
        ""
      )}

      <MainSection
        themeState={state}
        themeDispatch={dispatch}
        setStripValue={setStripValue}
      />
    </>
  );
}

export default App;

function Navbar({ state, dispatch }) {
  return (
    <div
      className={`flex justify-between p-4 px-8 items-center ${
        state === "Dark" ? "bg-[#212529]" : "bg-white"
      } " `}
    >
      <div className="flex gap-8 items-center ">
        <h1 className="text-3xl text-[#06b6d5] cursor-pointer">TextUtils</h1>
        <ul className="flex gap-4">
          <li
            className={`${
              state === "Dark" ? "text-gray-600" : "text-gray-600"
            } font-semibold hover:text-gray-600 cursor-pointer`}
          >
            Home
          </li>
          <li
            className={`${
              state === "Dark" ? "text-gray-400" : "text-gray-500"
            } font-semibold hover:text-gray-600 cursor-pointer`}
          >
            About Us
          </li>
          <li
            className={`${
              state === "Dark" ? "text-gray-400" : "text-gray-500"
            } font-semibold hover:text-gray-600 cursor-pointer`}
          >
            Contact
          </li>
        </ul>
      </div>
      <div className="flex gap-2 items-center">
        <p
          onClick={() =>
            dispatch(
              state === "Dark"
                ? { type: "Light", payload: "Light Mode has been Enabled." }
                : { type: "Dark", payload: "Dark Mode has been Enabled." }
            )
          }
        >
          {state === "Dark" ? (
            <LightModeIcon className="text-yellow-400" />
          ) : (
            <DarkModeIcon />
          )}
        </p>
        <p className={`${state === "Dark" ? "text-white" : "text-black"}`}>
          Enable {`${state === "Light" ? "Dark" : "Light"}`} Mode
        </p>
      </div>
    </div>
  );
}
function MainSection({ themeState, themeDispatch }) {
  const textReducer = (state, action) => {
    if (action.type === "CHANGETEXT") return action.payload;
    else if (action.type === "UPPERCASE") return state?.toUpperCase();
    else if (action.type === "LOWERCASE") return state?.toLowerCase();
    else if (action.type === "CLEARTEXT") return "";
    else if (action.type === "COPYTOCLIPBOARD") {
      navigator.clipboard.writeText(state);
      return state;
    } else if (action.type === "REMOVEEXTRASPACES") return state?.trim();
  };
  const [state, dispatch] = useReducer(textReducer, "");
  const [readingTime, setReadingTime] = useState(0);
  let initialTime = 0;
  console.log(state);

  return (
    <div
      className={`${
        themeState === "Dark"
          ? "bg-gradient-to-tr from-gray-400 from-50% to-black to-50%"
          : "bg-gradient-to-tr from-white from-50% to-cyan-300 to-50%"
      } p-12 py-24 `}
    >
      <div>
        <h1
          className={`text-4xl text-center mb-8  ${
            themeState === "Dark" ? "text-white" : "text-black"
          }`}
        >
          TextUtis - Word Counter, Charecter Counter, Remove Extra Space
        </h1>
        <h4
          className={`text-2xl mb-4 font-bold ${
            themeState === "Dark" ? "text-white" : "text-black"
          }`}
        >
          Enter Your Text Here :
        </h4>
        <textarea
          onFocus={() => (initialTime = Date.now())}
          className={`h-[200px]  focus:outline-blue-500 focus:border-0 p-4  shadow-blue-500 mb-8 ${
            themeState === "Dark"
              ? "bg-[#212529] text-white"
              : "bg-white text-black"
          } border-2 rounded-lg w-full`}
          name="userData"
          id="userData"
          value={state}
          onChange={(e) => {
            if (state.length < 1)
              setReadingTime(() => (Date.now() - initialTime) / 1000);
            dispatch({ type: "CHANGETEXT", payload: e.currentTarget.value });
          }}
        ></textarea>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          className={`px-8 py-2 font-bold ${
            state === "" ? "bg-blue-400" : "bg-blue-600"
          } text-white rounded-lg`}
          onClick={() => {
            dispatch({ type: "UPPERCASE" }),
              themeDispatch({ payload: "Converted to Upper-case" });
          }}
        >
          Convert Uppercase
        </button>
        <button
          className={`px-8 py-2 font-bold ${
            state === "" ? "bg-blue-400" : "bg-blue-600"
          } text-white rounded-lg`}
          onClick={() => {
            dispatch({ type: "LOWERCASE" });
            themeDispatch({ payload: "Converted to Lower-case" });
          }}
        >
          Convert Lowercase
        </button>
        <button
          className={`px-8 py-2 font-bold ${
            state === "" ? "bg-red-400" : "bg-red-600"
          } text-white rounded-lg`}
          onClick={() => {
            dispatch({ type: "CLEARTEXT" });
            themeDispatch({ payload: "Text Cleared" });
          }}
        >
          Clear Text
        </button>
        <button
          className={`px-8 py-2 font-bold ${
            state === "" ? "bg-green-400" : "bg-green-600"
          } text-white rounded-lg`}
          onClick={() => {
            dispatch({ type: "COPYTOCLIPBOARD" }),
              themeDispatch({ payload: "Text Copied to Clipboard" });
          }}
        >
          Copy To Clipboard
        </button>
        <button
          className={`px-8 py-2 font-bold ${
            state === "" ? "bg-blue-400" : "bg-blue-600"
          } text-white rounded-lg`}
          onClick={() => {
            dispatch({ type: "REMOVEEXTRASPACES" }),
              themeDispatch({ payload: "Removed Extra Spaces" });
          }}
        >
          Remove Extra Spaces
        </button>
      </div>
      <Summary
        themeState={themeState}
        state={state}
        readingTime={readingTime}
      />
      <div>
        <h3
          className={`text-2xl font-bold mt-8  mb-4 text-center ${
            themeState === "Dark" ? "text-white" : "text-black"
          }`}
        >
          Preview Document
        </h3>
        <textarea
          name="previewData"
          id="previewData"
          className={`h-[200px]  focus:outline-blue-500 focus:border-0 p-4 shadow-sm shadow-blue-500 mb-8 ${
            themeState === "Dark"
              ? "bg-[#212529] text-white"
              : "bg-white text-black"
          } border-2 rounded-lg w-full`}
          value={state}
        ></textarea>
      </div>
    </div>
  );
}

function Summary({ themeState, state, readingTime }) {
  return (
    <div>
      <h2
        className={`${
          themeState === "Dark" ? "text-white" : "text-black"
        } text-3xl mb-4 font-bold`}
      >
        Summery Of Your Text
      </h2>
      <div
        className={`mb-2 text-lg ${
          themeState === "Dark" ? "text-white" : "text-black"
        }`}
      >
        Nummber of words : {state !== "" ? state.split(" ").length : "0"}
      </div>
      <div
        className={`mb-2 text-lg ${
          themeState === "Dark" ? "text-white" : "text-black"
        }`}
      >
        Number of charecters : {state.length}
      </div>
      <div
        className={`mb-2 text-lg ${
          themeState === "Dark" ? "text-white" : "text-black"
        }`}
      >
        Reading Time: {readingTime}
      </div>
    </div>
  );
}
