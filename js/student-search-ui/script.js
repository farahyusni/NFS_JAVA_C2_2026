const students = [
  { studentId: "S001", studentName: "Ignacio de Paul", email: "ignacio@example.com", status: "Active" },
  { studentId: "S002", studentName: "Ben Tan", email: "ben@example.com", status: "Inactive" },
  { studentId: "S003", studentName: "Chong Mei", email: "mei@example.com", status: "Active" },
  { studentId: "S004", studentName: "Danish Nawaz", email: "danish@example.com", status: "Active" }
];

function renderStudents(studentArray) {
  const studentList = document.getElementById("student-list");
  studentList.innerHTML = "";

  if (studentArray.length === 0) {
    studentList.innerHTML = "<p>No students found.</p>";
    return;
  }

  studentArray.forEach((student) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <p>Student ID: ${student.studentId}</p>
      <p>Name: ${student.studentName}</p>
      <p>Email: ${student.email}</p>
      <p>Status: ${student.status}</p>
      <hr>
    `;
    studentList.appendChild(card);
  });
}

document.getElementById("search-button").addEventListener("click", () => {
  const input = document.getElementById("search-input").value.toLowerCase();
  const filtered = students.filter((student) =>
    student.studentName.toLowerCase().includes(input)
  );
  renderStudents(filtered);
});

document.getElementById("reset-button").addEventListener("click", () => {
  document.getElementById("search-input").value = "";
  renderStudents(students);
});

renderStudents(students);
