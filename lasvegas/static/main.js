
$(document).on('click', 'button[message]', (event) => {
  let message = $(event.target).attr('message');
  alert(message);
})