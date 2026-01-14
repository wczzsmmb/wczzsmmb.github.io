$('body').bind('DOMNodeInserted DOMNodeRemoved', function() {
	// console.log('changed');
});

/* this is a separate script for odins crow form as the other one is already compiled and can't be untangled from compilation */
$(window).on("DOMContentLoaded DOMNodeInserted popstate pushstate resize locationchange hashchange", (e) => {
	return;
	console.log(e, 'happened')
  let dialog = document.getElementById('success-dialog')
  let submit_button = document.querySelector('.join__form-submit-btn')
  let join_form = document.querySelector('#join-form')
  let agreement = document.getElementById('agreement')
  let invalid = false
  let tel_regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  let email_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	
  // console.log(dialog, submit_button, join_form, agreement, invalid, tel_regex, email_regex);
			  
  if(submit_button !== undefined && submit_button != null ) {
	submit_button.disabled = true;
  }

  // dialog.style.display = 'none!important;'
  // dialog.style.visibility = 'hidden!important;'
  $(document).on('focusin', (e) => {
	  // setTimeout(() => {
		  dialog = document.getElementById('success-dialog')
		  submit_button = document.querySelector('.join__form-submit-btn')
		  join_form = document.querySelector('#join-form')
		  agreement = document.getElementById('agreement')
		  invalid = false;
		  tel_regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
		  email_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		  console.log(dialog, submit_button, join_form, agreement, invalid, tel_regex, email_regex);
	  //}, 1000)
   })
  
  $(document.body).on('submit', '#join-form', (e) => {	
	if(agreement.checked == false) {
		agreement.classList.add('error');
	}
	if (!join_form.classList.contains('invalid')) {
	  dialog.style.display = 'block !important;'
	} else {
      dialog.style.display = 'none !important;'
	}
  })

  $('#join-form input').each((_, el) => {
    el.addEventListener('focusout', (e) => {
      if ((el.type === 'email' && !el.value.match(email_regex))) {
        el.classList.add('error');
        submit_button.disabled = true;
      }

      if ((el.type === 'tel' && !el.value.match(tel_regex))) {
        el.classList.add('error');
        submit_button.disabled = true;
		console.log(agreement.checked);
      }
		
	  if ((el.type === 'checkbox' && !agreement.checked)) {
        el.classList.add('error');
        submit_button.disabled = true;
      }
    })

    el.addEventListener('input', (e) => {
      // on new inputs, check if email or tel input is correct and remove error class
      if (el.type === 'email' && el.value.match(email_regex)) {
        el.classList.remove('error');
	  }

      if (el.type === 'tel' && el.value.match(tel_regex)) {
        el.classList.remove('error');
      }
		
      // check if aggreement + both regex conditions are valid to enable submit button back again
      if (agreement.checked && $('input[type=tel]').val().match(tel_regex) && $('input[type=email]').val().match(email_regex)) {
      	submit_button.disabled = false;
      } else {
		submit_button.disabled = true;
	  }
    })
  })
});
