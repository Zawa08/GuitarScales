      const toggle = document.querySelector(".navbar__toggle");
      const menu = document.querySelector(".navbar__menu");

      toggle.addEventListener("click", function () {
        const isOpen = menu.classList.toggle("is-open");
        toggle.classList.toggle("is-active");
        toggle.setAttribute("aria-expanded", isOpen);
      });

      menu.querySelectorAll(".navbar__link").forEach(function (link) {
        link.addEventListener("click", function () {
          menu.classList.remove("is-open");
          toggle.classList.remove("is-active");
          toggle.setAttribute("aria-expanded", "false");
        });
      });

      // Seznam názvů tvých souborů ve složce
      const svgFiles = [
        "F-dur.svg",
        "G-dur.svg",
        "D-moll.svg",
        "D-dur.svg",
        "E-moll.svg",
      ];

      const folderPath = "images/";
      const wrapper = document.getElementById("svg-wrapper");
      let lastIndex = -1;

      function showRandomChord() {
        let randomIndex;

        // Zajistíme, aby se nevybral stejný akord dvakrát po sobě
        do {
          randomIndex = Math.floor(Math.random() * svgFiles.length);
        } while (randomIndex === lastIndex && svgFiles.length > 1);

        lastIndex = randomIndex;
        const fileName = svgFiles[randomIndex];

        // Odstraníme příponu .svg pro nadpis a nahradíme pomlčky mezerami
        const cleanName = fileName.replace(".svg", "").replace("-", " ");

        // Reset animace
        wrapper.classList.remove("slide-in");
        void wrapper.offsetWidth;

        // Změna obsahu - vložíme <img> tag s cestou k SVG
        wrapper.innerHTML = `<img src="${folderPath}${fileName}" alt="${cleanName}" fetchpriority="high" loading="eager">`;

        wrapper.classList.add("slide-in");
      }

      // Spustit hned po načtení
      showRandomChord();

      // Automaticky se mění každé 4 sekundy
      setInterval(showRandomChord, 5000);