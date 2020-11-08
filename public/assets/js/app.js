$("body").on("click", ".modal-show", function (e) {
  e.preventDefault();

  let url = $(this).attr("href");
  let title = $(this).attr("title");

  $("#modal-title").text(title);
  $("#modal-btn-save").text("Create");

  $.ajax({
    type: "GET",
    url,
    dataType: "html",
    success: function (response) {
      $("#modal-body").html(response);
    },
  });

  $("#modal").modal("show");
});
