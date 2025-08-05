// DOM elements
const vehicleGrid = document.getElementById("vehicleGrid");
const tabButtons = document.querySelectorAll(".tab-btn");

// Render vehicles
function renderVehicles(filteredVehicles) {
  if (!vehicleGrid) return;
  vehicleGrid.innerHTML = "";

  filteredVehicles.forEach(async (vehicle) => {
    const response = await fetch("components/vehicle-card.html");
    const template = await response.text();
    const vehicleCard = document.createElement("div");
    vehicleCard.className = "vehicle-card";
    vehicleCard.innerHTML = template
      .replace(/\${vehicle.id}/g, vehicle.id)
      .replace(/\${vehicle.image}/g, vehicle.image)
      .replace(/\${vehicle.name}/g, vehicle.name)
      .replace(/\${vehicle.price}/g, vehicle.price)
      .replace(/\${vehicle.period}/g, vehicle.period)
      .replace(/\${vehicle.passengers}/g, vehicle.passengers)
      .replace(/\${vehicle.bags}/g, vehicle.bags)
      .replace(/\${vehicle.transmission}/g, vehicle.transmission);
    vehicleGrid.appendChild(vehicleCard);
  });
}

// Filter vehicles by category
function filterVehicles(category) {
  if (category === "all") {
    return vehicles;
  }
  return vehicles.filter((vehicle) => vehicle.category === category);
}

// Handle tab clicks
if (tabButtons) {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      // Filter and render vehicles
      const category = button.dataset.category;
      const filteredVehicles = filterVehicles(category);
      renderVehicles(filteredVehicles);
    });
  });
}

// Vehicle actions
function viewDetails(vehicleId) {
  const vehicle = vehicles.find((v) => v.id === vehicleId);
  alert(
    `Viewing details for ${vehicle.name} - $${vehicle.price}/${vehicle.period}`
  );
}

function bookNow(vehicleId) {
  const vehicle = vehicles.find((v) => v.id === vehicleId);
  alert(
    `Booking ${vehicle.name} for $${vehicle.price}/${vehicle.period}`
  );
}

// Highlight active navigation link
function highlightActiveLink() {
  const navLinks = document.querySelectorAll(".nav a");
  const currentPath = window.location.pathname.split("/").pop();

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href").split("/").pop();
    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Initialize page
if (typeof vehicles !== "undefined") {
  renderVehicles(vehicles);
}
// highlightActiveLink(); // This is now called from the HTML files after the header loads

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Add loading animation effect
window.addEventListener("load", () => {
  const cards = document.querySelectorAll(".vehicle-card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    setTimeout(() => {
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
});
