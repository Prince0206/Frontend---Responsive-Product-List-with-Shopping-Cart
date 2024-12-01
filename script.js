const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

//header container
ScrollReveal().reveal(".filter-grid .head h3", {
  ...scrollRevealOption,
});

// Product List
ScrollReveal().reveal("#course .courses", {
  ...scrollRevealOption,
  interval: 500,
});

/* keyboard navigation */
document.addEventListener("DOMContentLoaded", function () {
  // Handle keyboard navigation for interactive elements
  document.addEventListener("keydown", function (event) {
    const activeElement = document.activeElement;
    const courseItems = Array.from(document.querySelectorAll(".courses"));

    if (event.key === "Enter" || event.key === " ") {
      if (
        activeElement.tagName === "BUTTON" ||
        activeElement.getAttribute("role") === "button"
      ) {
        activeElement.click();
      }
    }

    let currentIndex = courseItems.indexOf(activeElement);

    switch (event.key) {
      case "ArrowRight":
        if (currentIndex < courseItems.length - 1) {
          courseItems[currentIndex + 1].focus();
        }
        break;
      case "ArrowLeft":
        if (currentIndex > 0) {
          courseItems[currentIndex - 1].focus();
        }
        break;
      case "ArrowDown":
        if (currentIndex + 3 < courseItems.length) {
          courseItems[currentIndex + 3].focus();
        }
        break;
      case "ArrowUp":
        if (currentIndex - 3 >= 0) {
          courseItems[currentIndex - 3].focus();
        }
        break;
    }
  });

  // Ensure focus is managed appropriately
  const courseItems = document.querySelectorAll(".courses .form-control");
  courseItems.forEach((item) => {
    item.addEventListener("focus", function () {
      item.classList.add("focused");
    });
    item.addEventListener("blur", function () {
      item.classList.remove("focused");
    });
  });
});

/* search bar to filter products by name or category */
document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("search-bar");
  const categoryFilter = document.getElementById("category-filter");
  const productTypeFilter = document.getElementById("product-type-filter");
  const courses = document.querySelectorAll(".courses");

  const filterProducts = () => {
    const searchText = searchBar.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedType = productTypeFilter.value;

    courses.forEach((course) => {
      const name = course.getAttribute("data-name").toLowerCase();
      const category = course.getAttribute("data-category");
      const type = course.getAttribute("data-type");

      const matchesSearch = name.includes(searchText);
      const matchesCategory =
        selectedCategory === "*" || category === selectedCategory;
      const matchesType = selectedType === "*" || type === selectedType;

      if (matchesSearch && matchesCategory && matchesType) {
        course.style.display = "block";
      } else {
        course.style.display = "none";
      }
    });
  };

  searchBar.addEventListener("input", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);
  productTypeFilter.addEventListener("change", filterProducts);
});
