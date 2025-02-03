import "./SleighLoading.css";
import SleighIcon from "../img/santasleigh.png"; 

const SleighLoading = () => {
  return (
    <div className="loading-container">
      <img src={SleighIcon} alt="Santa's Sleigh" className="sleigh" />
      <p className="loading-text">Checking the list before takeoff...</p>
    </div>
  );
};

export default SleighLoading;
