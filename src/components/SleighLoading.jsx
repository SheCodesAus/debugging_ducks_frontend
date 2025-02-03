import "./SleighLoading.css";
import SleighIcon from "../img/sleigh.svg"; 

const SleighLoading = () => {
  return (
    <div className="loading-container">
      <img src={SleighIcon} alt="Santa's Sleigh" className="sleigh" />
      <p className="loading-text">Checking the list before takeoff ..."</p>
    </div>
  );
};

export default SleighLoading;
