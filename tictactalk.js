$( document ).ready(function() {
  // Configuration
  // ==========================================================================
  // Defines the minutes of the hour where the work_it phase ends.
  // Cannot be greater than 59.
  var work_it_end = 41;
  // Defines the minutes of the hour where the talk_it phase ends.
  // Cannot be greater than 59.
  var talk_it_end = 42;
  var img_root_path = '';


  // Check configuration variables
  // ==========================================================================
  if (!(work_it_end >= 1 && work_it_end <= 59)) {
    throw "work_it_end has to be between 1 and 59";
  }

  if (!(talk_it_end >= 1 && talk_it_end <= 59)) {
    throw "work_it_end has to be between 1 and 59";
  }

  if (work_it_end >= talk_it_end) {
    throw "talk_it_end has to be greater than work_it_end";
  }

  // Make code specific if 45min id is present
  // ==========================================================================
  if ($('#tic_tac_talk').length === 0) {
    return false;
  }

  // Create html structure
  // ==========================================================================
  $('#tic_tac_talk').empty().html(
    "<div id='work_it'><img src='" + img_root_path + "work_it.png'" + "alt='Work It'></div>" +
    "<div id='talk_it'><img src='" + img_root_path + "talk_it.png'" + "alt='Talk It'></div>" +
    "<div id='relax_it'><img src='" + img_root_path + "relax_it.png'" + "alt='Relax It'></div>"
    );

  // Functions
  // ==========================================================================
  function show_work_it() {
    $('#work_it').show();
    $('#talk_it').hide();
    $('#relax_it').hide();
  }

  function show_talk_it() {
    $('#work_it').hide();
    $('#talk_it').show();
    $('#relax_it').hide();
  }

  function show_relax_it() {
    $('#work_it').hide();
    $('#talk_it').hide();
    $('#relax_it').show();
  }

  function toggle_it () {
    var time = new Date();
    var min = time.getMinutes();
    var sec = time.getSeconds();

    console.log(min);
    console.log(sec);
    console.log(work_it_end);
    console.log(talk_it_end);

    if (min < work_it_end) {
      var time_to_work_it_end = 1000 * ( 60*(work_it_end - min) - sec );
      show_work_it();
      setTimeout(toggle_it, time_to_work_it_end);
    } else if (min >= work_it_end && min < talk_it_end) {
      var time_to_talk_it_end = 1000 * ( 60*(talk_it_end - min) - sec );
      show_talk_it();
      setTimeout(toggle_it, time_to_talk_it_end);
    } else {
      var time_to_60 = 1000 * ( 60*(60 - min) - sec );
      show_relax_it();
      setTimeout(toggle_it, time_to_60);
    }
  }

  // On load
  toggle_it();

});
