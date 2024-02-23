document.addEventListener("DOMContentLoaded", function () {
  const footerContainer = document.getElementById("footerContainer");

  // Fetch the footer content
  fetch("assets/footer.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.text();
    })
    .then((html) => {
      footerContainer.innerHTML = html;
    })
    .catch((error) => {
      console.error("Error loading footer:", error);
    });
});
