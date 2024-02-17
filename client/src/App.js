import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import Whether from "./components/Whether/Whether";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setSlideIn(false);
    }
  }, []);

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state);
    }
  };
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every 1000 milliseconds (1 second)

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const getBackgroundColor = () => {
    const currentHour = currentTime.getHours();

    // Adjust colors based on the time of day
    if (currentHour >= 5 && currentHour < 10) {
      return '#91a4ab'; // Morning light color
    } else if (currentHour >= 10 && currentHour < 16) {
      return '#b7a668'; // Afternoon color
    }else if(currentHour >= 10 && currentHour < 16){
      return '#c56a4c'
    } else {
      return '#8a8787'; // Night darker color
    }
  };

  return (
    <div className="App" style={{backgroundColor:getBackgroundColor()}}>
      <Router>
        <Navbar handleSlideIn={handleSlideIn} />
        <Whether/>
        <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </Router>
    </div>
  );
}

export default App;
