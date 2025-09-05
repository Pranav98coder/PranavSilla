import { useState, useEffect, useRef } from "react";
import "./index.css";
function App() {
  const [user, setUser] = useState([]);
  const [input, setInput] = useState("");
  const [load, setLoad] = useState(true);
  const [disp, setDisp] = useState([]);
  const inp = useRef(null);
  useEffect(() => {
    setLoad(false);
    const fetchData = async () => {
      try {
        const url = `https://dummyjson.com/users/search?q=${input}`;

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log(data);
        setUser(data.users);

        console.log(data.users);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
      setLoad(true);
    };
    fetchData();
  }, [input, disp]);
  useEffect(() => {
    console.log("Updated user:", user);
  }, [input]);

  return (
    <div className="bg-white w-screen h-screen p-5 flex justify-center items-center">
      <div className="bg-white border-blue-400 border-5 rounded-2xl w-[50%] h-[50%] ">
        <input
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="Enter user"
        />
        {disp ? (
          <div>
            {disp.map((store, id) => {
              return (
                <div
                  id={id}
                  onClick={() => {
                    const update = disp.filter((_, ind) => ind != id);
                    setDisp(update);
                  }}
                >
                  {store}
                </div>
              );
            })}
          </div>
        ) : (
          <div>no elements</div>
        )}
        {load ? (
          <div className="bg-amber-600">
            {user.map((info, idx) => {
              return (
                <div id={info.id} className="bg-pink-50">
                  <p
                    onClick={() => setDisp((prev) => [...prev, info.firstName])}
                  >
                    {info.firstName}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div>is loading</div>
        )}
      </div>
    </div>
  );
}

export default App;
