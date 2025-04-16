// Google Sheet CSV URL
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSw1hhJh82F5-My06wgU7rkabJOJ_JvnKuJpnrUy7hXguNqBgNlWF3WAL-YbBhNLBQX1Mw4QMMeYdn-/pub?output=csv';

fetch(csvUrl)
  .then(response => response.text())
  .then(data => {
    // Split data by new line and then by comma
    const rows = data.trim().split("\n").map(row => row.split(","));
    const tableHead = document.querySelector("#sheet-table thead");
    const tableBody = document.querySelector("#sheet-table tbody");

    // Add table header row
    const headerRow = document.createElement("tr");
    rows[0].forEach(cell => {
      const th = document.createElement("th");
      th.textContent = cell;
      headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);

    // Add table data rows
    for (let i = 1; i < rows.length; i++) {
      const tr = document.createElement("tr");
      rows[i].forEach(cell => {
        const td = document.createElement("td");
        td.textContent = cell;
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    }
  })
  .catch(error => {
    console.error('Error loading CSV:', error);
  });
