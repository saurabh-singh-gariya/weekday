import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import JobCard from "../components/JobCard/JobCard";
import { fetchJobList } from "../store/slice/JobListSlice";
import "./Jobs.css";
import Loading from "../components/Loading/Loading";

const Jobs = () => {
  const PAGE_LIMIT = 10;
  const dispatch = useDispatch();
  const [currentLoaded, setCurrentLoaded] = useState(0);
  useEffect(() => {
    dispatch(fetchJobList({ offset: currentLoaded, limit: PAGE_LIMIT }));
  }, [currentLoaded]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (currentLoaded > totalCount) {
      return;
    }
    const height = document.documentElement.scrollHeight;
    const top = document.documentElement.scrollTop;
    const innerHeight = window.innerHeight;
    if (innerHeight + top + 1 >= height) {
      setCurrentLoaded((prev) => prev + PAGE_LIMIT);
    }
  };

  const jobsList = useSelector((state) => state?.jobs?.jobList);
  const listLoading = useSelector((state) => state?.jobs?.loading);
  const totalCount = useSelector((state) => state?.jobs?.totalCount);

  return (
    <div className="container">
      <div className="filter-container"></div>
      {listLoading && jobsList?.length === 0 ? (
        <Loading />
      ) : (
        <div className="card-container">
          {jobsList?.map((job, index) => (
            <JobCard key={job?.jdUid ?? index} jobDetails={job} />
          ))}
          {listLoading && <Loading />}
        </div>
      )}
    </div>
  );
};

export default Jobs;
