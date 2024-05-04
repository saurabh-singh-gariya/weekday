import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import JobCard from "../components/JobCard";
import { fetchJobList } from "../store/slice/JobListSlice";
import "./Jobs.css";
import { CircularProgress } from "@mui/material";

const Jobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobList(0));
  }, []);
  const jobsList = useSelector((state) => state?.jobs?.jobList);
  const listLoading = useSelector((state) => state?.jobs?.loading);
  return (
    <div className="container">
      <div className="filter-container"></div>
      {listLoading && jobsList?.length === 0 ? (
        <div className="progress-container">
          <CircularProgress />
        </div>
      ) : (
        <div className="card-container">
          {jobsList?.map((job, index) => (
            <JobCard key={job?.jdUid ?? index} jobDetails={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
