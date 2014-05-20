/*
 * Contact form validation
 *
 * By Ildar Sagdejev ( http://twitter.com/tknomad )
 *
 * Based on:
 *   http://net.tutsplus.com/tutorials/html-css-techniques/build-a-neat-html5-powered-contact-form/
 */

var isEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var isBusy = false;

function flashInput( element ) {
  $(element).stop( true ).fadeTo( 160, 0.6 ).fadeTo( 200, 1 );
}

function contactFormEnable( container ) {
  var form = container.find('form'),
      fields = form.find('input[type!="submit"],textarea'),
      btnSubmit = form.find('[type="submit"]');

  //
  // An invalid HTML5 form element will not trigger a form submit event,
  // so we intercept the submit button click.
  //
  btnSubmit.bind( 'click', function() {
    if( isBusy )
      return false;

    var valid = true;

    fields.each( function() {
      var name = this.name,
          value = this.value;

      // If built-in HTML5 validity checking is supported, all is easy
      if( this.validity && !this.validity.valid )
        valid = false;

      if( valid && this.hasAttribute('required') )
        if( value == '' )
          valid = false;

      if( valid && this.getAttribute('type') == 'email' )
        if( !isEmail.test(value) )
          valid = false;

      if( !valid ) {
        this.focus();
        flashInput( this );
        return false;
      }
    } );

    if( valid ) {
      var success = container.find('#success');
      btnSubmit.attr( 'value', 'Submitting' );
      isBusy = true;

      $.ajax( {
        url: form.attr('action'),
        type: form.attr('method'),
        data: form.serialize(),
        success: function() {
          var header = container.children('h1');
          header.hide();
          form.hide();
          success.show();
          isBusy = false;
        },
        error: function( request, status, httpError ) {
          btnSubmit.addClass( 'error' );
          btnSubmit.attr( 'value', 'Error' );

          setTimeout( function() {
            btnSubmit.removeClass( 'error' );
            btnSubmit.attr( 'value', 'Send' );
            isBusy = false;
          }, 1300 );
        }
      } );
    }

    // Prevent automatic submission and default error messages
    return false;
  } );
}