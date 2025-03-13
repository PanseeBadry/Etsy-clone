// Load Header Component
async function loadHeaderFooter() {
  const header = await fetch("/components/header.html");
  const footer = await fetch("/components/footer.html");
  const headerText = await header.text();
  const footerText = await footer.text();
  document.body.insertAdjacentHTML("afterbegin", headerText);
  document.body.insertAdjacentHTML("beforeend", footerText);
  
  loadScripts([
    "/scripts/components/header.js",
    "/scripts/components/footer.js",
    "/scripts/components/categories.js"
  ]);
  loadStyles([
    "/styles/header.css",
    "/styles/footer.css",
    "/styles/categories.css"
  ]);
  // () {
  //   try {
  //     const response = await fetch("/components/header.html");
  //     const data = await response.text();
  //     document.body.insertAdjacentHTML("afterbegin", data);
  //     loadScripts([
  //       "/scripts/components/header.js",
  //       "/scripts/components/categories.js"
  //     ]);
  //     loadStyles([
  //       "/styles/header.css",
  //       "/styles/categories.css"
  //     ]);
  //   } catch (error) {
  //     console.error("Error loading header:", error);
  //   }
  // }
}

// Load External Scripts
function loadScripts(scripts) {
  const head = document.head;
  scripts.forEach((src) => {
    const script = document.createElement("script");
    script.src = src;
    script.type = "module";
    script.defer = true;
    head.appendChild(script);
  });
}

// Load styles
function loadStyles(styles) {
  const head = document.head;
  styles.forEach((href) => {
    const link = document.createElement("link");
    link.href = href;
    link.rel = "stylesheet";
    head.appendChild(link);
  });
}


// export default loadHeader;

export default loadHeaderFooter; 