// =========================================================================
// PART 1: IDENTIFIED ERRORS
// Error 1 (grade.html, Line 9): Missing 'return' in onsubmit="return checkMark()", causing the page to reload and clear the result.
// Error 2 (grade.html, Line 17): Function call onclick="showtable()" does not match the camelCase function name showTable().
// Error 3 (grade.html, Line 19): Script src="grades.js" does not match the filename "grade.js".
// Error 4 (grade.js, Line 5): Single '=' in if (name = "") assigns an empty string instead of comparing with '==='.
// Error 5 (grade.js, Line 9): Function name isNan() is misspelled; it must be isNaN().
// Error 6 (grade.js, Line 14): Condition (mark < 0 && mark > 100) is impossible; it must use OR (||) instead of AND (&&).
// Error 7 (grade.js, Line 28): Method getElementByID() has wrong capitalization; it must be getElementById().
// Error 8 (grade.js, Line 30): Property .style.colour uses British spelling; CSS in JS requires .style.color.
// Error 9 (grade.js, Line 31): Returning true submits the form and refreshes the page; it must return false.
// Error 10 (grade.js, Line 38): Loop starts at i = 1, skipping index 0 (Grade A); it must start at i = 0.
// Error 11 (grade.js, Line 42): Property .innerHtml has wrong capitalization; it must be .innerHTML.
// =========================================================================

// Validate inputs, calculate grade, and display coloured result + timestamp
function checkMark() {
  let name = document.forms["gradeForm"]["name"].value.trim();
  let mark = document.forms["gradeForm"]["mark"].value.trim();

  // Check for empty name
  if (name === "") {
    alert("Name must be filled out.");
    return false;
  }

  // Check for empty mark (Part 2 requirement)
  if (mark === "") {
    alert("Mark field cannot be empty.");
    return false;
  }

  // Check if mark is numeric
  if (isNaN(mark)) {
    alert("Please enter a valid numeric value.");
    return false;
  }

  mark = Number(mark);

  // Check if mark is within 0 to 100
  if (mark < 0 || mark > 100) {
    alert("Mark must be between 0 and 100.");
    return false;
  }

  // Determine grade and result text colour
  let grade;
  let resultColor;

  if (mark >= 80) {
    grade = "A";
    resultColor = "green";
  } else if (mark >= 65) {
    grade = "B";
    resultColor = "green";
  } else if (mark >= 50) {
    grade = "C";
    resultColor = "orange";
  } else {
    grade = "F";
    resultColor = "red";
  }

  // Display result with grade-based colour
  let resultElement = document.getElementById("result");
  resultElement.innerHTML = name + " got grade " + grade;
  resultElement.style.color = resultColor;

  // Display date and time the grade was checked
  document.getElementById("checkedTime").innerHTML = "Checked on: " + new Date();

  // Prevent form submission from reloading the page
  return false;
}

// Generate a random whole number from 0 to 100 and insert into mark input
function randomMark() {
  let randomNum = Math.floor(Math.random() * 101);
  document.getElementById("mark").value = randomNum;
}

// Dynamically build and display the grade table
function showTable() {
  let grades = ["A", "B", "C", "F"];
  let ranges = ["80-100", "65-79", "50-64", "0-49"];

  let tableHTML = "<table><tr><th>Grade</th><th>Mark Range</th></tr>";
  for (let i = 0; i < grades.length; i++) {
    tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
  }
  tableHTML += "</table>";

  document.getElementById("tableContainer").innerHTML = tableHTML;
}
