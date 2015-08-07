'use strict'

$('#search').submit(function() {
    var term = $('#song').val();
    var url = 'https://api.spotify.com/v1/search?type=track&query=' + term;
    $.get(url, function(result) {
        console.log(result);
        var artistName = result.tracks.items[0].artists[0].name;
        var songTitle = result.tracks.items[0].name;
        var imageUrl;
        var audioPreview = result.tracks.items[0].preview_url;
        if (result.tracks.items[0].album.images.length) {
            var imageUrl = result.tracks.items[0].album.images[0].url;
        }
        console.log(imageUrl);
        console.log(artistName);
        console.log(songTitle);
        $('p.title').text(songTitle);
        $('p.author').text(artistName);
        $('img').prop('src', imageUrl);
        $('.js-player').prop('src', audioPreview);

        var artistInfo = result.tracks.items[0].artists[0].href;
        $.get(artistInfo, function(result2) {
            console.log(result2)
            var artistImage = result2.images[0].url;
            $('.modal-header > h2').text(artistName);
            $('.modal-body').html('<img src="' + artistImage + '">');
        });

    });
});

$('.btn-play').click(function(){
    if  ($('.btn-play').hasClass('playing')){
        $('.btn-play').removeClass('playing');
        $('.js-player').trigger('pause');
    }
    else{
        $('.js-player').trigger('play')
        $('.btn-play').addClass('playing');
    }
});

function printTime () {
  var current = $('.js-player').prop('currentTime');
  console.debug('Current time: ' + current);
  $('progress').prop('value', current);
};
$('.js-player').on('timeupdate', printTime);


$('a').click(function(event){
    event.preventDefault();
    $('.js-modal').modal();
});

