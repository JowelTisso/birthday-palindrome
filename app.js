const inputDate = document.querySelector(".input-doB");
const btnCheck = document.querySelector(".btn-check");
const outputDiv = document.querySelector(".outputDiv");
const spinner = document.querySelector(".spinner");

const clickHandler = () => {
  if (inputDate.value) {
    arrangeDate(inputDate.value);
  } else {
    showMsg("Please input complete date!");
  }
};

const arrangeDate = (rawDate) => {
  showSpinner();
  const dateArr = rawDate.split("-");
  const year = dateArr[0];
  const month = dateArr[1];
  const date = dateArr[2];
  const isPalindrome = checkAllFormat(date, month, year);
  setTimeout(() => {
    if (isPalindrome) {
      hideSpinner();
      showMsg("Your birth date is a palindrome!");
    } else {
      hideSpinner();
      const [nearestDate, counter] = checkNearestDate(date, month, year);
      showMsg(
        `Your birth date is not a palindrome! Next palindrome date is ${nearestDate}. You missed it by ${counter} days!`
      );
    }
  }, 2000);
};

const showSpinner = () => {
  spinner.style.display = "flex";
  showMsg("Calculating your date please wait!");
};

const hideSpinner = () => {
  spinner.style.display = "none";
};

const checkAllFormat = (date, month, year) => {
  const formatOne = date + month + year;
  const formatTwo = month + date + year;
  const formatThree = year + month + date;
  const formatFour = year + date + month;
  const formatFive = date + month + year.slice(-2);
  const formatSix = month + date + year.slice(-2);
  const formatSeven = year.slice(-2) + month + date;
  const formatEight = year.slice(-2) + date + month;

  const formatArr = [
    formatOne,
    formatTwo,
    formatThree,
    formatFour,
    formatFive,
    formatSix,
    formatSeven,
    formatEight,
  ];
  for (var i = 0; i < formatArr.length; i++) {
    const isPalindrome = checkPalindrome(formatArr[i]);
    if (isPalindrome) {
      return formatArr[i];
    }
  }
  return null;
};

const checkPalindrome = (num) => {
  const loopCount = Math.floor(num.length / 2);

  for (var i = 0; i < loopCount; i++) {
    if (num[i] != num[num.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

const checkLeapYear = (year) => {
  if (year % 4 === 0 && year % 100 != 0) {
    return true;
  }
  if (year % 4 === 0 && year % 100 === 0 && year === 0) {
    return true;
  }
  return false;
};

const checkNearestDate = (date, month, year) => {
  var dateFor = Number(date);
  var monthFor = Number(month);
  var yearFor = Number(year);
  var dateBack = Number(date);
  var monthBack = Number(month);
  var yearBack = Number(year);

  const dateInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var counter = 0;

  while (true) {
    counter++;
    //For checking forward
    dateFor = dateFor + 1;
    if (monthFor === 2) {
      if (checkLeapYear(yearFor)) {
        if (dateFor > 29) {
          dateFor = 1;
          monthFor = monthFor + 1;
          if (monthFor > 12) {
            monthFor = 1;
            yearFor = yearFor + 1;
          }
        }
      } else {
        if (dateFor > 28) {
          dateFor = 1;
          monthFor = monthFor + 1;
          if (monthFor > 12) {
            monthFor = 1;
            yearFor = yearFor + 1;
          }
        }
      }
    } else {
      if (dateFor > dateInMonths[monthFor - 1]) {
        dateFor = 1;
        monthFor = monthFor + 1;
        if (monthFor > 12) {
          monthFor = 1;
          yearFor = yearFor + 1;
        }
      }
    }
    const status = arrangeDateForNearest(dateFor, monthFor, yearFor);
    if (status) {
      const nearestDate = `${dateFor}/${monthFor}/${yearFor}`;
      return [nearestDate, counter];
    }

    //For checking backward
    if (yearBack > 0) {
      dateBack = dateBack - 1;
      if (monthBack === 2) {
        if (checkLeapYear(yearBack)) {
          if (dateBack < 1) {
            dateBack = 29;
            monthBack = monthBack - 1;
            if (monthBack < 1) {
              monthBack = 12;
              yearBack = yearBack - 1;
            }
          }
        } else {
          if (dateBack < 1) {
            dateBack = 28;
            monthBack = monthBack - 1;
            if (monthBack < 1) {
              monthBack = 12;
              yearBack = yearBack - 1;
            }
          }
        }
      } else {
        if (dateBack < 1) {
          dateBack = dateInMonths[monthBack - 1];
          monthBack = monthBack - 1;
          if (monthBack < 1) {
            monthBack = 12;
            yearBack = yearBack - 1;
          }
        }
      }
      const status = arrangeDateForNearest(dateBack, monthBack, yearBack);
      if (status) {
        const nearestDate = `${dateBack}/${monthBack}/${yearBack}`;
        return [nearestDate, counter];
      }
    }
  }
};

const arrangeDateForNearest = (date, month, year) => {
  var dateStr = date.toString();
  var monthStr = month.toString();
  var yearStr = year.toString();

  if (dateStr.length == 1) {
    dateStr = "0" + dateStr;
  }
  if (monthStr.length == 1) {
    monthStr = "0" + monthStr;
  }

  const status = checkAllFormat(dateStr, monthStr, yearStr);
  if (status) {
    return status;
  }
};

const showMsg = (msg) => {
  outputDiv.innerHTML = "";
  const para = document.createElement("p");
  const nodeText = document.createTextNode(msg);
  para.append(nodeText);
  outputDiv.appendChild(para);
};

btnCheck.addEventListener("click", clickHandler);
