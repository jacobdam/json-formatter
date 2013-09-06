var jsonFormatter = require('../lib/main.js');

$(function() {
  $('#format_button').on('click', function() {
    var jsonSource = $('#json_input').val();

    try {
      var formattedJSON = jsonFormatter.formatJSON(jsonSource);
      $('#json_output').val(formattedJSON);
      $('#json_output_error').text('');
    } catch (e) {
      console.log(e)
      $('#json_output').val('');
      $('#json_output_error').text(e.toString());
    }
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
  