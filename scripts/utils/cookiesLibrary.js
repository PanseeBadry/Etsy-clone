export function setCookie(key, value, expiryDate) {
  let cookie = `${key}=${value}; path=/`;

  if (expiryDate) {
    cookie += `; expires=${expiryDate.toUTCString()}`;
  }
  document.cookie = cookie;
}

export function getAllcookies() {
  var cookieArray = [];
  if (document.cookie) {
    var data = document.cookie.split(";");
    for (var i = 0; i < data.length; i++) {
      var value = data[i].split("=");
      cookieArray[value[0].trim()] = value[1].trim();
    }
  }
  return cookieArray;
}

export function getCookie(key) {
  return getAllcookies()[key];
}

export function deleteCookie(key) {
  var date = new Date();
  date.setMonth(date.getMonth() - 1);
  document.cookie = key + "=;expires=" + date.toUTCString();
}

export function hasCookie(key) {
  var cookieArray = getAllcookies();
  var exist;
  if (cookieArray[key]) {
    exist = 1;
  } else {
    exist = 0;
  }
  return exist;
}

export function clearCookies() {
  var cookieArray = getAllcookies();
  for (var key in cookieArray) {
    deleteCookie(key);
  }
}

export function cookiesLength() {
  if (document.cookie) {
    return document.cookie.split(";").length;
  } else {
    return 0;
  }
}
