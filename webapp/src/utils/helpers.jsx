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

  calcIMC: (height, weight) => {
    return Math.round((weight / ((height / 100) * (height / 100))) * 100) / 100;
  },
};

export default helpers;
