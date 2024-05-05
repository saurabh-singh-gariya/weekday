/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import JobCard from "../components/JobCard/JobCard";
import { fetchJobList } from "../store/slice/JobListSlice";
import "./Jobs.css";
import Loading from "../components/Loading/Loading";
import Filter from "../components/Filter/Filter";
import { getFilteredList } from "../Utils/FilterUtils";

const Jobs = () => {
  const PAGE_LIMIT = 10;
  const dispatch = useDispatch();

  const [currentLoaded, setCurrentLoaded] = useState(0);
  const [filteredList, setFilteredList] = useState([]);
  const [filterCriterias, setFilterCriterias] = useState({
    role: "",
    salary: "",
    remote: "",
    location: "",
    experience: "",
    companyName: "",
  });

  const jobsList = useSelector((state) => state?.jobs?.jobList);
  const listLoading = useSelector((state) => state?.jobs?.loading);
  const totalCount = useSelector((state) => state?.jobs?.totalCount);

  useEffect(() => {
    dispatch(fetchJobList({ offset: currentLoaded, limit: PAGE_LIMIT }));
  }, [currentLoaded]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (filterNotApplied) {
      setFilteredList(jobsList);
    } else {
      setFilteredList(getFilteredList(jobsList, filterCriterias));
      handleScroll();
    }
  }, [jobsList, filterCriterias]);

  const handleFilterChange = useCallback((filterCriterias) => {
    setFilterCriterias(filterCriterias);
  }, []);

  const handleScroll = () => {
    if (currentLoaded > totalCount) {
      return;
    }
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const bottom = documentHeight - (scrollTop + windowHeight);
    const threshold = 100;

    if (bottom < threshold) {
      setCurrentLoaded((prev) => prev + PAGE_LIMIT);
    }
  };

  const filterNotApplied = useMemo(() => {
    return Object.values(filterCriterias).every((value) => value === "");
  }, [filterCriterias]);

  return (
    <div className="container">
      <Filter
        onFilterChange={handleFilterChange}
        filterCriterias={filterCriterias}
      />
      {listLoading && filteredList?.length === 0 ? (
        <Loading />
      ) : (
        <div className="card-container">
          {filteredList?.map((job, index) => (
            <JobCard key={job?.jdUid ?? index} jobDetails={job} />
          ))}
          {listLoading && <Loading />}
        </div>
      )}
    </div>
  );
};

export default Jobs;
