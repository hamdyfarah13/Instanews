$(function() {
  var previousSelected;
  $('#select-categories-dropdown').selectric(); 
  $('#select-categories-dropdown').on('selectric-open',function(){ 
    previousSelected = $(this).val();
  })
  .change(function() { 
    if ($(this).val()!==''){ 
      $('.top-stories-list-item').remove();
      if(previousSelected === ''){ 
        $('.ina-header .header-logo-select-section').append('<img class="ina-loading-gif" src="img/ajax-loader.gif" alt="loading gif">');
      }else{
        $('.ina-top-stories-section').prepend('<img class="ina-loading-gif" src="img/ajax-loader.gif" alt="loading gif">');
      }
      previousSelected = $(this).val();
      $('.ina-top-stories-section').addClass('min-height-section');

      var url = 'https://api.nytimes.com/svc/topstories/v2/';
      url += $(this).val()+'.json';
      url += '?' + $.param({
        'api-key': '9df5679a7cba4aa1b0c2e91351a6521c'
      });
      // Do a GET AJAX call
      $.ajax({
        url: url,
        method: 'GET',
      }).done(function(data) {
        $('.ina-header').addClass('ina-header-small');
        $('.ina-footer').addClass('ina-footer-small');
        
        var topStories='';
        var numberOfStories = 1;

        $.each(data.results,function(index, items){
          if(numberOfStories<=12){ 
            if(items.multimedia.length>0){ 

              topStories += '<li class="top-stories-list-item flex-item-mobile-100 flex-item-tablet-50 flex-item-desktop-25">';
              topStories += '<a href="'+items.url+'" target="_blank">';
              topStories += '<div class="top-stories-item" style="background-image:url(\''+items.multimedia[4].url+'\')">';
              topStories += '<p>'+items.abstract+'</p>';
              topStories += '</div>';
              topStories += '</li>';
              numberOfStories++;
            }
          }
        });
        $('#top-stories-list').append(topStories);
      }).fail(function(err) { 
        throw err;
      }).always(function(){
        $('.ina-loading-gif').remove();
      });
    }
    else{ 
      $('.ina-header').removeClass('ina-header-small');
      $('.ina-footer').removeClass('ina-footer-small');
      $('.top-stories-list-item').remove();
      $('.ina-loading-gif').remove();
      $('.ina-top-stories-section').removeClass('min-height-section');
      previousSelected = $(this).val();
    }
  });
});