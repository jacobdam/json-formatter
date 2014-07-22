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
    $('#load_sample_json_message').text('Loading...');
    $('#load_sample_json_message').removeClass('error-message')
    $.ajax({ url: url, dataType: 'text' })
      .done(function(data) {
        $('#load_sample_json_message').text('');
        $('#json_input').val(data);
      })
      .fail(function() {
        $('#load_sample_json_message').text('Loading Failed');
        $('#load_sample_json_message').addClass('error-message')
      });
    return false;
  });

});
