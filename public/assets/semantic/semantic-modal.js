$(function(){
	$("#semantic-create-modal-button").click(function(){
		$(".semantic-modal").modal('show');
	});
	$(".semantic-modal").modal({
		closable: true
	});
});