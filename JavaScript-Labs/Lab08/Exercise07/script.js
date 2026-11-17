const weekdays = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu"];
weekdays.push("Thứ Bảy");
weekdays.unshift("Chủ nhật");

const weekOutput = document.querySelector("#week-output");
const weekList = document.createElement("ol");
weekList.setAttribute("aria-label", "Bảy ngày trong tuần");

for (let index = 0; index < weekdays.length; index += 1) {
  const item = document.createElement("li");
  item.textContent = weekdays[index];
  if (weekdays[index] === "Thứ Ba" || weekdays[index] === "Thứ Năm") {
    const markedDay = document.createElement("mark");
    markedDay.textContent = item.textContent;
    item.replaceChildren(markedDay);
  }
  weekList.append(item);
}
weekOutput.append(weekList);

const calendarOutput = document.querySelector("#calendar-output");
const dayNames = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
const table = document.createElement("table");
const caption = document.createElement("caption");
caption.textContent = "Tháng minh họa · 30 ngày · ngày đầu là Chủ nhật";
table.append(caption);

const head = table.createTHead().insertRow();
dayNames.forEach(function (dayName) {
  const cell = document.createElement("th");
  cell.scope = "col";
  if (dayName === "Thứ Ba" || dayName === "Thứ Năm") {
    const mark = document.createElement("mark");
    mark.textContent = dayName;
    cell.append(mark);
  } else {
    cell.textContent = dayName;
  }
  head.append(cell);
});

const body = table.createTBody();
let dayNumber = 1;
for (let week = 0; week < 5; week += 1) {
  const row = body.insertRow();
  for (let column = 0; column < 7; column += 1) {
    const cell = row.insertCell();
    if (dayNumber <= 30) {
      cell.setAttribute("aria-label", dayNames[column] + ", ngày " + dayNumber);
      if (column === 2 || column === 4) {
        const markedDay = document.createElement("mark");
        markedDay.textContent = String(dayNumber);
        cell.append(markedDay);
      } else {
        cell.textContent = String(dayNumber);
      }
      dayNumber += 1;
    }
  }
}
calendarOutput.append(table);
