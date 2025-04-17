$('#sheet-table').DataTable({
  dom: 'Bfrtip',
  buttons: [
    'copyHtml5',
    'excelHtml5',
    'csvHtml5',
    {
      extend: 'pdfHtml5',
      orientation: 'landscape', // 👉(landscape) মোড
      pageSize: 'A3',            // 👉 বড় পেজ সাইজ
      exportOptions: {
        columns: ':visible'      // 👉 সব কলাম থাকবে
      },
      customize: function(doc) {
        doc.styles.tableHeader.fontSize = 10;
        doc.defaultStyle.fontSize = 9;
        doc.content[1].table.widths = 
          Array(doc.content[1].table.body[0].length + 1).join('*').split('');
      }
    },
    {
      extend: 'print',
      title: 'Live Google Sheet Data',
      customize: function (win) {
        $(win.document.body).css('font-size', '10pt').prepend(
          '<h3>Live Data Report</h3>'
        );
        $(win.document.body).find('table')
          .addClass('compact')
          .css('font-size', 'inherit')
          .css('width', '100%');
      }
    }
  ]
});
