/*
 * Ajax pop-up dialog
 *   By Ildar Sagdejev ( http://twitter.com/tknomad )
 */

var infoWindowIsOpen = false;

function infoWindowOpen( width ) {
  var win = $('#info-window');

  //
  // Create the info window if it doesn't exist yet
  //
  if( win.length === 0 ) {
    win = $('<div id="info-window"><div class="content"></div><a class="close" title="Close">ⓧ</a></div>').appendTo('body');
    win.find('.close').click( infoWindowClose );
  }

  var closeButton = win.find( '.close' ).css( 'display', 'none' );

  //
  // Appear the info window in a fancy fashion
  //
  var content = win.find( '.content' );
  content.children('div').hide();
  content.css( 'bottom', win.css( 'padding-bottom' ) );
  win.css( {
    'position': 'fixed',
    'width': '0',
    'height': '0',
    'top': '29%',
    'left': '50%',
    'margin-left': '0',
    'opacity': '1',
    'display': 'block',
    'z-index': '5'
  } );
  win.stop( true ).animate(
    { width: width + 'px', 'margin-left': '-' + (width*0.5) + 'px' }, 600,
    function() {
      infoWindowIsOpen = true;
      win.animate( {
        height: content.height()
          + parseInt( win.css('padding-bottom') ) + 'px'
      }, 600, function() {
        closeButton.fadeIn( 200 );
      } );
  } );
}

function infoWindowClose() {
  if( infoWindowIsOpen ) {
    arrowKeysEnabled = true;
    $('#info-window').stop().fadeOut( 400 );
    infoWindowIsOpen = false;
  }
}

function infoShow( file, contentId, width, onDone ) {
  if( infoWindowIsOpen ) {
    infoWindowClose();
    return;
  }

  infoWindowOpen( width );

  var content = $(contentId);

  function showContent() {
    content.stop( true ).fadeIn( 1200 );

    if( typeof onDone === 'function' )
      onDone( content );
  }

  if( content.length !== 0 ) {
    showContent();
  } else {
    //
    // Load the content, stat!
    //
    $.get( file, function( data ) {
      content = $('#info-window .content').append( data ).find( contentId );
      content.css('display', 'none');
      showContent();
    } );
  }
}

$(function() {
  // Close dialog when ESC key is pressed
  $(document).keydown( function( e ) {
    if( e.keyCode == 27 )
      infoWindowClose();
  } );

  // Close dialog when clicked outside
  $('body').click( function( e ) {
    if( infoWindowIsOpen && !($(e.target).is('#info-window') || $(e.target).closest('#info-window').length) )
      infoWindowClose();
  } );
})