// Google Sheet CSV URL (আপনার CSV লিংক)
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSw1hhJh82F5-My06wgU7rkabJOJ_JvnKuJpnrUy7hXguNqBgNlWF3WAL-YbBhNLBQX1Mw4QMMeYdn-/pub?output=csv';

fetch(csvUrl)
  .then(response => response.text())
  .then(data => {
    // CSV ডেটাকে লাইনে ভাঙ্গা
    const rows = data.trim().split('\n').map(row => row.split(','));
    const tableHead = document.querySelector("#sheet-table thead");
    const tableBody = document.querySelector("#sheet-table tbody");

    // প্রথম লাইনে হেডার রো হিসেবে যোগ করা হবে
    const headerRow = document.createElement('tr');
    rows[0].forEach(cell => {
      const th = document.createElement('th');
      th.textContent = cell;
      headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);

    // বাকি লাইনগুলো ডেটা হিসেবে যোগ করা হবে
    for (let i = 1; i < rows.length; i++) {
      const tr = document.createElement('tr');
      rows[i].forEach(cell => {
        const td = document.createElement('td');
        td.textContent = cell;
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    }

    // DataTable initialize করা হচ্ছে, যাতে সার্চ, প্রিন্ট, ডাউনলোডের বাটন থাকে
    $('#sheet-table').DataTable({
      dom: 'Bfrtip',   // Button, filter, table, pagination
      buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5',
        'print'
      ]
    });
  })
  .catch(error => {
    console.error('CSV লোড করতে সমস্যা:', error);
  });
