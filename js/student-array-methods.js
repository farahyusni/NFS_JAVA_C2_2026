const students = [
  { studentId: "S001", studentName: "Ignacio de Paul", email: "ignacio@example.com", status: "Active" },
  { studentId: "S002", studentName: "Ben Tan", email: "ben@example.com", status: "Inactive" },
  { studentId: "S003", studentName: "Chong Mei", email: "mei@example.com", status: "Active" }
];

console.log("=== Original Students ===");
console.log(students);

// Part A - Methods That Read or Create a New Array
// 1. Use `forEach` to print all student names.
console.log("\n=== All Student Names ===");
students.forEach((student) => {
    console.log(student.studentName);
});

// 2. Use `filter` to create a new array containing only students whose status is `"Active"`.
const activeStudents = students.filter((student) => student.status === "Active");
console.log("\n=== Active Students ===");
console.log(activeStudents);

// 3. Use `find` to find the student with ID:
const foundStudent = students.find((student) => student.studentId === "S002");
console.log("\n=== Find Student S002 ===");
console.log(foundStudent);

// 4. Use `map` to create a new array containing only student email addresses.
const studentEmails = students.map((student) => student.email);
console.log("\n=== Student Emails ===");
console.log(studentEmails);

// Part B - Methods That Modify the Original Array
// 5. Use `push` to add one new student to the **end** of the array.
const newLengthAfterPush = students.push({
  studentId: "S004",
  studentName: "Danish Nawaz",
  email: "danish@example.com",
  status: "Active"
});
console.log("\n=== After Push ===");
console.log(students);
console.log("New length after push:", newLengthAfterPush);

// 6. Use `pop` to remove the **last student** from the array.
const removedLastStudent = students.pop();
console.log("\n=== After Pop ===");
console.log(students);
console.log("Removed last student: ");
console.log(removedLastStudent);

// 7. Use `unshift` to add one new student to the **beginning** of the array.
const newLengthAfterUnshift = students.unshift({
  studentId: "S000",
  studentName: "Ignacio de Paul",
  email: "ignacio@example.com",
  status: "Active"
});
console.log("\n=== After Unshift ===");
console.log(students);
console.log("New length after unshift:", newLengthAfterUnshift);

// 8. Use `shift` to remove the **first student** from the array.
const removedFirstStudent = students.shift();
console.log("\n=== After Shift ===");
console.log(students);
console.log("Removed first student: ");
console.log(removedFirstStudent);

console.log("\n=== Final Students Array ===");
console.log(students);