export const getFilteredList = (joblist, filterCriterias) => {
  let list = joblist?.filter((job) => {
    let flag = true;
    if (filterCriterias?.role) {
      flag = job?.jobRole === filterCriterias?.role;
    }
    if (filterCriterias?.salary) {
      flag = job?.minJdSalary >= filterCriterias?.salary;
    }
    if (filterCriterias?.remote) {
      flag = job?.location === filterCriterias?.remote;
    }
    if (filterCriterias?.location) {
      flag = job?.location === filterCriterias?.location;
    }
    if (filterCriterias?.experience) {
      flag = job?.minExp <= filterCriterias?.role;
    }
    if (filterCriterias?.companyName) {
      flag = job?.companyName
        ?.toLowerCase()
        ?.includes(filterCriterias?.companyName?.toLowerCase());
    }
    return flag;
  });
  return list;
};
