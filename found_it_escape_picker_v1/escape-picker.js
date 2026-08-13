/* FOUND IT! — Escape Picker V1
   Interactive recommendation engine.
   No external libraries required.
*/

(() => {
  const data = {
    silence: {
      title: "Tirthan Valley",
      text: "Forest air · river mornings · 3–5 days",
      image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=900&q=85",
      alt: "Mountain valley landscape",
      tags: ["Nature", "Slow travel", "Himalayas"],
      link: "found_it_journeys_v1/tirthan-valley-journey.html",
      map: "https://www.google.com/maps/search/?api=1&query=Tirthan%20Valley%2C%20Himachal%20Pradesh"
    },

    mountains: {
      title: "Coorg",
      text: "Misty hills · coffee estates · quiet mornings",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=85",
      alt: "Green forest landscape",
      tags: ["Hills", "Coffee", "Nature"],
      link: "found_it_journeys_v1/coorg-journey.html",
      map: "https://www.google.com/maps/search/?api=1&query=Coorg%2C%20Karnataka"
    },

    water: {
      title: "Alleppey",
      text: "Backwaters · houseboats · slow afternoons",
      image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=85",
      alt: "Kerala backwaters and houseboat",
      tags: ["Backwaters", "Kerala", "Water"],
      link: "found_it_journeys_v1/alleppey-journey.html",
      map: "https://www.google.com/maps/search/?api=1&query=Alappuzha%2C%20Kerala"
    },

    spiritual: {
      title: "Udaipur",
      text: "Lakeside evenings · old stone · reflective moments",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85",
      alt: "Historic Indian architecture",
      tags: ["Heritage", "Lakes", "Slow evenings"],
      link: "found_it_journeys_v1/udaipur-journey.html",
      map: "https://www.google.com/maps/search/?api=1&query=Udaipur%2C%20Rajasthan"
    },

    adventure: {
      title: "Tirthan Valley",
      text: "Mountain roads · trails · a story worth bringing home",
      image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=900&q=85",
      alt: "Mountain adventure landscape",
      tags: ["Adventure", "Trails", "Himalayas"],
      link: "found_it_journeys_v1/tirthan-valley-journey.html",
      map: "https://www.google.com/maps/search/?api=1&query=Tirthan%20Valley%2C%20Himachal%20Pradesh"
    }
  };

  const buttons = document.querySelectorAll(".escape-picker .choice");
  const image = document.getElementById("resultImg");
  const title = document.getElementById("resultTitle");
  const text = document.getElementById("resultText");
  const link = document.getElementById("resultLink");
  const map = document.getElementById("resultMap");
  const tags = document.getElementById("resultTags");
  const status = document.getElementById("escapeStatus");
  const result = document.getElementById("escapeResult");

  if (!buttons.length || !image || !title || !text || !link) return;

  function update(choice) {
    const item = data[choice];
    if (!item) return;

    buttons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.choice === choice);
      btn.setAttribute("aria-pressed", btn.dataset.choice === choice ? "true" : "false");
    });

    result.classList.add("is-changing");
    status.textContent = "Finding your escape…";

    window.setTimeout(() => {
      image.src = item.image;
      image.alt = item.alt;
      title.textContent = item.title;
      text.textContent = item.text;
      link.href = item.link;
      map.href = item.map;

      tags.innerHTML = item.tags
        .map(tag => `<span>${tag}</span>`)
        .join("");

      result.classList.remove("is-changing");
      status.textContent = `Recommended for you · ${item.title}`;
    }, 220);
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => update(button.dataset.choice));
  });

  // Keyboard support
  buttons.forEach((button, index) => {
    button.addEventListener("keydown", event => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

      event.preventDefault();

      const nextIndex =
        event.key === "ArrowRight"
          ? (index + 1) % buttons.length
          : (index - 1 + buttons.length) % buttons.length;

      buttons[nextIndex].focus();
      update(buttons[nextIndex].dataset.choice);
    });
  });

  // Initial state
  buttons[0].setAttribute("aria-pressed", "true");
})();