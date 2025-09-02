import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://dummyjson.com/users/search?q=${user}`;

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log(data);
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-centre item-centre bg- w-full">
      <div className="border-black-400 bg-pink p-2">
        (user.map((usInfo)=
        {
          <div id="usInfo.id">
            `${usInfo.firstName} ${usInfo.lastName}`
          </div>
        }
        ))
      </div>
    </div>
  );
}

export default App;
