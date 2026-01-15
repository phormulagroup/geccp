import axios from "axios";
import config from "./config";

const helpers = {
  generateYears: (startYear, endYear) => {
    const years = [];
    let currentYear = startYear;
    while (currentYear <= endYear) {
      years.push(currentYear);
      currentYear++;
    }
    return years;
  },
};

export default helpers;
