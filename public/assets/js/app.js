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

$("#modal-btn-save").on("click", function (e) {
  e.preventDefault();

  let form = $("#modal-body form");
  let url = form.attr("action");
  let method = $('input[name="_method"').val() == undefined ? "POST" : "PUT";
  console.log(method);

  form.find('.help-block').remove();
  form.find('.form-group').removeClass('has-error');

  $.ajax({
    url,
    method,
    data: form.serialize(),
    success: function (response) {
      form.trigger('reset');
      $('#modal').modal('hide');
      $('#datatables').DataTable().ajax.reload();

      swal({
        type: 'success',
        title: 'Success',
        text: 'Data has been saved'
      });
    },
    error: function (err) {
      let response = err.responseJSON;

      console.log(response);
      if ($.isEmptyObject(response) == false) {
        $.each(response.errors, function (key, value) {
          $(`#${key}`)
            .closest(".form-group")
            .addClass("has-error")
            .append(
              `<span class="help-block"><strong>${value}</strong></span>`
            );
        });
      }
    },
  });
});
