const studentGrid = document.getElementById('studentGrid');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const totalStudents = document.getElementById('totalStudents');
const avgGpa = document.getElementById('avgGpa');
const topCourse = document.getElementById('topCourse');

const students = [
  { id: 1001, name: 'Ariana Cruz', course: 'Computer Science', year: 2, gpa: 3.9 },
  { id: 1002, name: 'Ben Santos', course: 'Information Technology', year: 1, gpa: 3.5 },
  { id: 1003, name: 'Carla Reyes', course: 'Computer Science', year: 3, gpa: 3.8 },
  { id: 1004, name: 'Daniel Lim', course: 'Business Analytics', year: 4, gpa: 3.6 },
  { id: 1005, name: 'Ella Ramos', course: 'Psychology', year: 2, gpa: 3.7 },
  { id: 1006, name: 'Frank Dela Cruz', course: 'Information Technology', year: 3, gpa: 3.4 },
  { id: 1007, name: 'Grace Navarro', course: 'Computer Science', year: 1, gpa: 3.9 },
  { id: 1008, name: 'Harold Tan', course: 'Engineering', year: 4, gpa: 3.2 }
];

function getSortedStudents(list, sortValue) {
  const sorted = [...list];
  switch (sortValue) {
    case 'gpa':
      return sorted.sort((a, b) => b.gpa - a.gpa);
    case 'year':
      return sorted.sort((a, b) => b.year - a.year);
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
}

function renderDashboard(list) {
  totalStudents.textContent = list.length;
  const average = list.length
    ? list.reduce((sum, student) => sum + student.gpa, 0) / list.length
    : 0;
  avgGpa.textContent = average.toFixed(2);

  const courseCount = {};
  list.forEach((student) => {
    courseCount[student.course] = (courseCount[student.course] || 0) + 1;
  });

  const top = Object.entries(courseCount).sort((a, b) => b[1] - a[1])[0];
  topCourse.textContent = top ? top[0] : '-';
}

function renderStudents() {
  const query = searchInput.value.trim().toLowerCase();
  const sortValue = sortSelect.value;
  const filtered = students.filter((student) => {
    const haystack = `${student.name} ${student.course}`.toLowerCase();
    return haystack.includes(query);
  });

  const sorted = getSortedStudents(filtered, sortValue);
  renderDashboard(sorted);

  if (!sorted.length) {
    studentGrid.innerHTML = '<div class="empty-state">No student records match your search.</div>';
    return;
  }

  studentGrid.innerHTML = sorted
    .map(
      (student) => `
        <article class="student-card">
          <h3>${student.name}</h3>
          <div class="student-meta">
            <div><strong>ID:</strong> ${student.id}</div>
            <div><strong>Course:</strong> ${student.course}</div>
            <div><strong>Year:</strong> ${student.year}</div>
          </div>
          <span class="gpa-tag">GPA: ${student.gpa.toFixed(2)}</span>
        </article>
      `
    )
    .join('');
}

searchInput.addEventListener('input', renderStudents);
sortSelect.addEventListener('change', renderStudents);

renderStudents();
