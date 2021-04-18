$(document).ready(function () {
  $(() => {
    console.log('Called Index.Js File');

    function CheckIsLogin() {
      var isLogin = localStorage.getItem('UserInfo');

      if (!isLogin) {
        location.replace('/login');
      }
    }

    CheckIsLogin();
  });
});
