<<<<<<< HEAD
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
=======
document.addEventListener('DOMContentLoaded', function () {
    const footerContainer = document.getElementById('footerContainer');

    // Fetch the footer content
    fetch('assets/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => {
            
            footerContainer.innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
>>>>>>> 5e9b4609cd7cf3b18db53b13a7df9666f287b1b8
});
