
const sheetUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSw1hhJh82F5-My06wgU7rkabJOJ_JvnKuJpnrUy7hXguNqBgNlWF3WAL-YbBhNLBQX1Mw4QMMeYdn-/pub?output=csv";

fetch(sheetUrl)
  .then((res) => res.json())
  .then((data) => {
    const entries = data.feed.entry;
    const tableBody = document.getElementById("tableBody");
    const tableHeader = document.getElementById("tableHeader");

    const keys = Object.keys(entries[0])
      .filter((key) => key.startsWith("gsx$"))
      .map((key) => key.replace("gsx$", ""));

    keys.forEach((key) => {
      const th = document.createElement("th");
      th.textContent = key.toUpperCase();
      tableHeader.appendChild(th);
    });

    entries.forEach((row) => {
      const tr = document.createElement("tr");
      keys.forEach((key) => {
        const td = document.createElement("td");
        td.textContent = row["gsx$" + key]["$t"];
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    });

    $('#sheetTable').DataTable();
  });
