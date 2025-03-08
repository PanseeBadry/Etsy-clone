function setCookie(key, value, expiryDate) {
  if (expiryDate) {
    document.cookie =
      key + "=" + value + ";expires=" + expiryDate.toUTCString();
  } else {
    document.cookie = key + "=" + value;
  }
}

function getAllcookies() {
  var cookieArray = [];
  var data = document.cookie.split(";");
  for (var i = 0; i < data.length; i++) {
    var value = data[i].split("=");
    cookieArray[value[0].trim()] = value[1].trim();
  }
  return cookieArray;
}

function deleteCookie(key) {
  var date = new Date();
  date.setMonth(date.getMonth() - 1);
  document.cookie = key + "=;expires=" + date.toUTCString();
}

function hasCookie(key) {
  var cookieArray = getAllcookies();
  var exist;
  if (cookieArray[key]) {
    exist = 1;
  } else {
    exist = 0;
  }
  return exist;
}

function clearCookie() {
  var cookieArray = getAllcookies();
  for (var key in cookieArray) {
    deleteCookie(key);
  }
}
