fetch("../../components/header.html")
  .then((response) => response.text())
  .then((data) => {
    const body = document.body;
    body.insertAdjacentHTML("afterbegin", data);
    const head = document.getElementsByTagName("head")[0];
    let headerScript = document.createElement("script");
    headerScript.src = "../scripts/components/header.js";
    head.appendChild(headerScript);
  });
