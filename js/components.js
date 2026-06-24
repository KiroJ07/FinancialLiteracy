function renderNav() {
  var nav = document.querySelector("nav");
  if (!nav) return;
  nav.innerHTML =
    '<a href="index.html">Home</a>' +
    '<a href="about.html">About</a>' +
    '<a href="resources.html">Resources</a>' +
    '<a href="contact.html">Contact</a>';
}

function renderFooter() {
  var footer = document.querySelector("footer");
  if (!footer) return;
  var year = new Date().getFullYear();
  footer.innerHTML = "&copy; " + year + " Youth Financial Literacy";
}

document.addEventListener("DOMContentLoaded", function () {
  renderNav();
  renderFooter();
});
