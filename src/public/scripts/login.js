$(document).ready(function () {
  $(() => {
    /**
     * Attaches to the form and sends the data to our REST endpoint
     */
    $('#login-form').submit(e => {
      // Prevent the default submit form event
      e.preventDefault();

      // XHR POST request
      $.post(
        '/api/auth/login',
        // Gather all data from the form and create a JSON object from it
        {
          email: $('#login-form-name').val(),
          password: $('#login-form-password').val(),
          // rememberMe: $('#login-form-rememberme').val(),
        },
        // Callback to be called with the data
        response => {
          console.log(response);

          if (response.data) {
            localStorage.setItem('UserInfo', JSON.stringify(response.data._id));
            location.replace('/');
          }
        },
      );
    });
  });
});
