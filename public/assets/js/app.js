// show form
$("body").on("click", ".modal-show", function (e) {
  e.preventDefault();

  let url = $(this).attr("href");
  let title = $(this).attr("title");

  $("#modal-title").text(title);
  $("#modal-btn-save").text($(this).hasClass("edit") ? "Update" : "Create");

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

// store data
$("#modal-btn-save").on("click", function (e) {
  e.preventDefault();

  let form = $("#modal-body form");
  let url = form.attr("action");
  let method = $('input[name="_method"').val() == undefined ? "POST" : "PUT";

  form.find(".help-block").remove();
  form.find(".form-group").removeClass("has-error");

  $.ajax({
    url,
    method,
    data: form.serialize(), // ambil data dengan url encode di dalam form
    success: function (response) {
      form.trigger("reset");
      $("#modal").modal("hide");
      $("#datatable").DataTable().ajax.reload();

      swal({
        type: "success",
        title: "Success",
        text: "Data has been saved",
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


// delete data
$('body').on('click', '.btn-delete', function (e) {
  e.preventDefault();

  let url = $(this).attr('href');
  let title = $(this).attr('title');
  let token = $('meta[name="csrf-token"]').attr('content');
  console.log(token);

  swal({
    type: 'warning',
    title: `Are you sure want to delete ${title}?`,
    text: 'You won\'t be able to revert this!',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it',
  }).then(result => { // .. 85
    // console.log(result.value)

    if (result.value) {

      $.ajax({
        url,
        type: "POST",
        data: {
          '_method': 'DELETE',
          '_token': token
        },
        success: function (response) {
          $('#datatable').DataTable().ajax.reload();
          swal({
            type: 'success',
            title: 'Success!',
            text: 'Data has been deleted'
          });
        },
        error: function (err) {
          swal({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong'
          })
        }
      })

    }
  });


});


// p: hasil dari result
// jika kita tekan cancel, maka akan bernilai {dismiss: cancel}
// jika kita tekan yes, maka akan bernilai {value: true}
