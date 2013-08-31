var jsonFormatter = require('../lib/main.js');
$(function() {
  $('#json_output').on('focus', function() {
    $(this).select();
  });
  $('#format_button').on('click', function() {
    var jsonSource = $('#json_input').val();
    var formattedJSON = jsonFormatter.formatJSON(jsonSource);
    $('#json_output').val(formattedJSON);
  });
  $('#load_sample_json').on('click', function() {
    var url = $(this).attr('href');
    $.ajax({ url: url, dataType: 'text' })
    .done(function(data) {
      $('#json_input').val(data);
    });
    return false;
  });

});
  