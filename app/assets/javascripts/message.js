$(function() {


  function buildMessage(message){
    var image = ""
    message.image ? image = `<img src="${message.image}">` : image = ""

    var html = `<div class="message">
                  <div class="message__upper-info">
                  <div class="message__upper-info__talker">
                    ${message.user.name}
                  </div>
                  <div class="message__upper-info__date">
                    ${message.created_at}
                  </div>
                  </div>
                  <div class="message__text">
                  <p class="message__text__content">
                    ${message.content}
                  </p>
                    ${image}
                  </div>
                </div>`
    return html;
  }


  $('.form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(document.getElementById("new_message"));
    var url = $(document.getElementById("new_message")).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html);
      $('.messages').animate({scrollTop : $('.messages')[0].scrollHeight});
      scroll();
      $('form')[0].reset();
      $('.submit-btn').removeAttr('disabled')
    })
    .fail(function(){
      alert('メッセージを入力してください');
      $('.submit-btn').removeAttr('disabled')
    })
  });
});