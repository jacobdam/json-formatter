var jsonFormatter = require('../lib/entry.js');
$(function() {
  $('#json_output').on('focus', function() {
    $(this).select();
  });
  $('#format_button').on('click', function() {
    var jsonSource = $('#json_input').val();
    var formattedJSON = jsonFormatter.formatJSON(jsonSource);
    $('#json_output').val(formattedJSON);
  });
});
