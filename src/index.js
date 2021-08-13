function reverseString(str) {
  var letters = str.split("");
  var reverse = [];

  for (var index in str) {
    reverse = reverse + letters[letters.length - index - 1];
  }

  return reverse;
}

function isPalindrome(str) {
  if (str === reverseString(str)) return true;
  else return false;
}

function dateAsString(date) {
  var dateString = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateString.day = "0" + date.day;
  } else {
    dateString.day = date.day.toString();
  }

  if (date.month < 10) {
    dateString.month = "0" + date.month;
  } else {
    dateString.month = date.month.toString();
  }

  dateString.year = date.year.toString();

  return dateString;
}

function dateFormats(date) {
  date = dateAsString(date);
  var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd = date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.slice(-2);
  var mmddyy = date.month + date.day + date.year.slice(-2);
  var yymmdd = date.year.slice(-2) + date.month + date.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindrome(date) {
  var formats = dateFormats(date);
  var formatsList = [];
  for (var index = 0; index < formats.length; index++) {
    formatsList[index] = isPalindrome(formats[index]);
  }
  return formatsList;
}

function checkLeapYear(year) {
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
}

function returnNextDate(date) {
  var nextDate = {
    day: date.day + 1,
    month: date.month,
    year: date.year
  };

  var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (checkLeapYear(date.year)) {
    days[1] = 29;
  }

  if (nextDate.day > days[nextDate.month - 1]) {
    nextDate.day = 1;
    nextDate.month = nextDate.month + 1;
  }

  if (nextDate.month > 12) {
    nextDate.day = 1;
    nextDate.month = 1;
    nextDate.year = nextDate.year + 1;
  }
  return nextDate;
}

function nextPalindromeDate(date) {
  var count = 0;
  var nextDate = returnNextDate(date);

  while (1) {
    count++;
    if (checkPalindrome(nextDate).includes(true)) {
      return [count, nextDate];
    }
    nextDate = returnNextDate(nextDate);
  }
}

var dateInput = document.querySelector("#dateInput");
var submitBtn = document.querySelector("#button");
var data = document.querySelector("#para");

function buttonHandler() {
  var input = dateInput.value;
  var dict = input.split("-");
  var day = dict[2];
  var month = dict[1];
  var year = dict[0];
  var date = {
    day: Number(day),
    month: Number(month),
    year: Number(year)
  };

  var dateList = dateFormats(date);
  var isPalindrome = false;

  for (var i = 0; i < dateList.length; i++) {
    if (checkPalindrome(date).includes(true)) {
      data.innerHTML = "Yay! Your birthday is a palindrome!!";
      isPalindrome = true;
    }
  }

  if (!isPalindrome) {
    var [count, nextDate] = nextPalindromeDate(date);
    var index = checkPalindrome(nextDate).indexOf(true);
    data.innerHTML =
      "Oh no!! <br />Next palindrome date is " +
      nextDate.day +
      "/" +
      nextDate.month +
      "/" +
      nextDate.year +
      "." +
      "<br />It would be of the form " +
      dateFormats(nextDate)[index] +
      ". <br />You missed it by " +
      count +
      (count > 1 ? " days :(" : " day :(");
  }
}

submitBtn.addEventListener("click", buttonHandler);
