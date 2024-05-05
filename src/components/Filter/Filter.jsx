/* eslint-disable react/prop-types */
import { useMemo } from "react";
import Dropdown from "./Dropdown";
import "./Filter.css";
import { useSelector } from "react-redux";
import SearchInput from "./SearchInput";

const getUniqueValuesByKey = (array, key) => {
  const uniqueValues = new Set();
  array.forEach((item) => uniqueValues.add(item[key]));
  return Array.from(uniqueValues);
};

const Filter = ({ onFilterChange, filterCriterias }) => {
  const ExperienceOptions = useMemo(() => {
    let exp = [];
    for (let i = 1; i <= 10; i++) {
      exp.push(i);
    }
    return exp;
  }, []);

  const jobsList = useSelector((state) => state?.jobs?.jobList);

  const roleList = useMemo(
    () => getUniqueValuesByKey(jobsList, "jobRole"),
    [jobsList]
  );

  const locationList = useMemo(
    () => getUniqueValuesByKey(jobsList, "location"),
    [jobsList]
  );

  const salaryList = useMemo(() => {
    let exp = [];
    for (let i = 0; i <= 70; i += 10) {
      exp.push(i);
    }
    return exp;
  }, []);

  const remoteList = ["Remote", "On-Site"];

  return (
    <div className="filter-container">
      <div className="filter-title">Filters</div>
      <div className="filter-fields">
        <Dropdown
          label="Role"
          value={filterCriterias?.role}
          onSelect={(value) => {
            onFilterChange({ ...filterCriterias, role: value });
          }}
          options={roleList}
        />
        <Dropdown
          label="Salary"
          value={filterCriterias.salary}
          onSelect={(value) => {
            onFilterChange({ ...filterCriterias, salary: value });
          }}
          options={salaryList}
        />
        <Dropdown
          label="Remote"
          value={filterCriterias.remote}
          onSelect={(value) => {
            onFilterChange({ ...filterCriterias, remote: value });
          }}
          options={remoteList}
        />
        <Dropdown
          label="Location"
          value={filterCriterias?.location}
          onSelect={(value) => {
            onFilterChange({ ...filterCriterias, location: value });
          }}
          options={locationList?.filter((location) => location !== "remote")}
        />
        <Dropdown
          label="Min. Exp"
          value={filterCriterias?.experience}
          onSelect={(value) => {
            onFilterChange({ ...filterCriterias, experience: value });
          }}
          options={ExperienceOptions}
        />
        <SearchInput
          label="Company Name"
          value={filterCriterias?.companyName}
          onChange={(value) => {
            onFilterChange({ ...filterCriterias, companyName: value });
          }}
        />
      </div>
    </div>
  );
};

export default Filter;
