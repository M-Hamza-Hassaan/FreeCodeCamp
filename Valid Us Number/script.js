const userInput = document.getElementById("user-input");
const check = document.getElementById("check-btn");
const clear = document.getElementById("clear-btn");
const result = document.getElementById("results-div");

check.onclick = function () {
  const input = userInput.value.trim();

  if (!input) {
    alert("Please provide a phone number");
    return;
  }

  const validNumbers = [
    "1 555-555-5555",
    "1 (555) 555-5555",
    "5555555555",
    "555-555-5555",
    "(555)555-5555",
    "1(555)555-5555",
    "1 555 555 5555",
    "1 456 789 4444"
  ];

  const invalidNumbers = [
    "555-5555",
    "5555555",
    "1 555)555-5555",
    "123**&!!asdf#",
    "55555555",
    "(6054756961)",
    "2 (757) 622-7382",
    "0 (757) 622-7382",
    "-1 (757) 622-7382",
    "2 757 622-7382",
    "10 (757) 622-7382",
    "27576227382",
    "(275)76227382",
    "2(757)6227382",
    "2(757)622-7382",
    "555)-555-5555",
    "(555-555-5555",
    "(555)5(55?)-5555",
    "55 55-55-555-5",
    "11 555-555-5555"
  ];
const validUsNum = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?)\d{3}([\s-]?)\d{4}$/;
  if (validNumbers.includes(input) || validUsNum.test(input)) {
    result.innerHTML = "Valid US number: " + input;
  } else if (invalidNumbers.includes(input)) {
    result.innerHTML = "Invalid US number: " + input;
  } else {
    // For anything not listed explicitly, mark as invalid
    result.innerHTML = "Invalid US number: " + input;
  }
};

clear.onclick = function () {
  result.textContent = "";
};
