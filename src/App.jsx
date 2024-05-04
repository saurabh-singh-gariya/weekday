import React, { useEffect } from "react";
import { fetchJobList } from "./store/slice/JobListSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobList(0));
  }, []);
  return (
    <div>
      <button onClick={() => dispatch(fetchJobList(10))}>Click </button>
    </div>
  );
};

export default App;
