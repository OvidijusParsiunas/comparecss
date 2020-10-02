$(document).delegate('.modal-toggle', 'click', function(e) {
    var modal = $(this).attr('data-modal');
    $(modal).addClass('active');
    e.preventDefault();
});
$(document).delegate('.spectre-modal-close', 'click', function(e) {
    $(this).closest('.modal').removeClass('active');
    e.preventDefault();
});
$(document).delegate('.modal-overlay', 'click', function(e) {
    $(this).closest('.modal').removeClass('active');
    e.preventDefault();
});