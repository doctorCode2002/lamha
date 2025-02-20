barba.init({
  transitions: [
    {
      name: "default-transition",
      async leave(data) {
        const transitionEl = document.querySelector(".transition");

        // Animate transition overlay in (ensure it covers everything)
        await gsap.to(transitionEl, {
          bottom: "0",
          duration: 1.2,
          ease: "power2.inOut",
        });

        // Hide old page AFTER transition is fully in place
        gsap.set(data.current.container, { opacity: 0 });
      },

      async enter(data) {
        lenis.scrollTo(0);
        const transitionEl = document.querySelector(".transition");

        // Ensure the new page is hidden initially to prevent flicker
        gsap.set(data.next.container, { opacity: 0 });

        // Animate transition overlay out
        await gsap.to(transitionEl, {
          bottom: "-120vh",
          duration: 1.2,
          ease: "power2.inOut",
        });

        // Fade in the new page smoothly
        gsap.to(data.next.container, { opacity: 1, duration: 0.5 });
      },
    },
  ],
});

// After the transition ends, trigger page-specific animations
barba.hooks.after((data) => {
  const links = document.querySelectorAll("header nav ul li a"); // Select all <a> elements inside <li>

  links.forEach((link) => {
    const linkPath = new URL(link.href, window.location.origin).pathname; // Get clean path
    const currentPath = window.location.pathname; // Get current URL path

    const parentLi = link.parentElement; // Get the parent <li>

    // Remove "active" from all <li> elements first
    parentLi.classList.remove("active");

    // Add "active" to the correct <li> element
    if (linkPath === currentPath) {
      parentLi.classList.add("active");
    }
  });

  initAccordions();

  const namespace = data.next.namespace;

  // Call the appropriate animation function based on the namespace
  switch (namespace) {
    case "home":
      mainPageAnimation();
      break;
    case "about":
      aboutPageAnimation();
      break;
    case "portfolio":
      portfolioPageAnimation();
      break;
    case "qas":
      QAsPageAnimation();
      break;
    case "contact":
      contactPageAnimation();
      break;
  }
});

gsap.registerPlugin(ScrollTrigger);
//*---------------------------------------------------------------------
// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on("scroll", ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);
//*---------------------------------------------------------------------

//* Start index page ---------------------------------------------------------------------
let sideBarAnimation = function () {
  let tl = gsap.timeline({ paused: true });
  tl.to(".side-bar", {
    left: 0,
    opacity: 1,
    duration: 0.7,
    ease: "power2.out",
  })
    .from(".side-bar ul li", {
      y: -10,
      opacity: 0,
      stagger: 0.1,
      ease: "power2.out",
    })
    .from(".close-icon", {
      opacity: 0,
    });
  document.querySelector(".burger-icon").addEventListener("click", function () {
    tl.play();
  });
  document.querySelectorAll(".side-bar a").forEach((a) => {
    a.addEventListener("click", function () {
      tl.reverse();
    });
  });
  document.querySelector(".close-icon").addEventListener("click", function () {
    tl.reverse();
  });
};
sideBarAnimation();

// nav animation
const navAnimation = function () {
  let tl = gsap.timeline();
  tl.from("header", {
    opacity: 0,
    y: 30,
  })
    .from("header .logo", {
      opacity: 0,
      y: -10,
    })
    .from("header nav ul li", {
      opacity: 0,
      y: -10,
      stagger: 0.1,
    });
};

const mainPageAnimation = function () {
  navAnimation();
  let tl1 = gsap.timeline();
  tl1
    .to(
      ".hero",
      {
        delay: 1,
        "--before-opacity": 1,
        "--before-translate": "-90%",
        duration: 1,
      },
      "-=0.5"
    )
    .from(".hero h1", {
      opacity: 0,
      scale: 0,
      duration: 0.7,
    })
    .from(".hero li", {
      opacity: 0,
      scale: 0,
      stagger: 0.3,
    })
    .from(".hero a", {
      opacity: 0,
      scale: 0,
    });

  // next animation
  gsap.from(".content-block", {
    x: -100,
    opacity: 0,
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".next .container",
      start: "top 80%",
      end: "top 10%",
      scrub: 1,
    },
  });

  // problems animation
  gsap.from(".problems .card", {
    y: 150,
    opacity: 0,
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".problems .cards",
      start: "top 80%",
      end: "top 30%",
      scrub: 1,
    },
  });

  // Steps animation
  gsap.from(".process-step", {
    opacity: 0,
    y: 30,
    scale: 0.8,
    stagger: 0.3,
    duration: 0.5,
    ease: "none",
    scrollTrigger: {
      trigger: ".timeline",
      start: "top 80%",
      end: "top 10%",
      scrub: 1,
    },
  });

  // QAs animation
  gsap.from(".accordion-header", {
    opacity: 0,
    stagger: 0.2,
    ease: "none",
    scrollTrigger: {
      trigger: ".QAs .container",
      start: "top 80%",
      end: "top 20%",
      scrub: 1,
    },
  });

  // testimonials animation
  gsap.from(".testimonials", {
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".testimonials",
      start: "top 80%",
      end: "top 50%",
      scrub: 1,
    },
  });

  // cause animation
  gsap.from(".cause", {
    opacity: 0,
    stagger: 0.2,
    ease: "none",
    scrollTrigger: {
      trigger: ".cause",
      start: "top 80%",
      end: "top 50%",
      scrub: 1,
    },
  });

  // contact animation
  gsap.from(".contact", {
    scale: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".contact",
      start: "top 90%",
      end: "+=20",
      scrub: 1,
    },
  });

  const heroSection = document.getElementById("hero-section");

  heroSection.addEventListener("mouseenter", function () {
    gsap.to("#hero-section .cursor", {
      scale: 1,
      opacity: 1,
    });
  });

  heroSection.addEventListener("mousemove", function (dets) {
    gsap.to("#hero-section .cursor", {
      x: dets.x,
      y: dets.y,
    });
  });

  heroSection.addEventListener("mouseleave", function () {
    gsap.to("#hero-section .cursor", {
      scale: 0,
      opacity: 0,
    });
  });
};
mainPageAnimation();

function initAccordions() {
  document.querySelectorAll(".accordion-header").forEach((header) => {
    // Remove existing event listeners to prevent duplicates
    header.removeEventListener("click", accordionHandler);
    // Add new event listener
    header.addEventListener("click", accordionHandler);
  });
}

function accordionHandler() {
  const item = this.parentElement;
  const content = this.nextElementSibling;
  const isActive = item.classList.contains("active");

  // Close all items
  document.querySelectorAll(".accordion-item").forEach((otherItem) => {
    if (otherItem !== item) {
      otherItem.classList.remove("active");
      gsap.to(otherItem.querySelector(".accordion-content"), {
        maxHeight: 0,
        padding: 0,
        duration: 0.1,
        ease: "none",
      });
    }
  });

  // Toggle the clicked item
  if (!isActive) {
    item.classList.add("active");
    gsap.to(content, {
      maxHeight: content.scrollHeight + 30,
      padding: "15px",
      duration: 0.1,
      ease: "none",
    });
  } else {
    item.classList.remove("active");
    gsap.to(content, {
      maxHeight: 0,
      padding: 0,
      duration: 0.1,
      ease: "none",
    });
  }
}

initAccordions();
//* End index page ---------------------------------------------------------------------

//* Start about page ---------------------------------------------------------------------
let aboutPageAnimation = function () {
  const tl = gsap.timeline();
  tl.from(".about-hero h1", {
    y: -80,
    opacity: 0,
    duration: 1,
  })
    .from(
      ".about-hero p",
      {
        y: 80,
        opacity: 0,
      },
      "-=1"
    )
    .to(
      ".about-hero",
      {
        "--before-opacity": 1,
        "--before-translate": "50%",
        duration: 1,
      },
      "-=0.5"
    );

  const member = document.querySelectorAll(".member");

  function rotateMembers() {
    const leftMember = document.querySelector(".member.left");
    const centerMember = document.querySelector(".member.center");
    const rightMember = document.querySelector(".member.right");

    leftMember.classList.remove("left");
    leftMember.classList.add("center", "active");

    centerMember.classList.remove("center" ,"active");
    centerMember.classList.add("right");

    rightMember.classList.remove("right");
    rightMember.classList.add("left");
  }

  setInterval(rotateMembers, 7000);

  const swiper = new Swiper(".swiper", {
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    grabCursor: true,
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
  });

  gsap.from(".team .container", {
    opacity: 0,
    y: 50,
    ease: "none",
    scrollTrigger: {
      trigger: ".team .container",
      start: "top 90%",
      end: "top 70%",
      scrub: 1,
    },
  });

  gsap.from(".vision", {
    opacity: 0,
    x: 50,
    ease: "none",
    scrollTrigger: {
      trigger: ".vision-values",
      start: "top 90%",
      end: "top 70%",
      scrub: 1,
    },
  });

  gsap.from(".values", {
    opacity: 0,
    x: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".vision-values",
      start: "top 85%",
      end: "top 50%",
      scrub: 1,
    },
  });

  gsap.from(".why", {
    opacity: 0,
    y: 50,
    scrollTrigger: {
      trigger: ".why",
      start: "top 85%",
      end: "top 50%",
      scrub: 1,
    },
  });
};
aboutPageAnimation();
//* End about page ---------------------------------------------------------------------

//* Start QAs page ---------------------------------------------------------------------
let QAsPageAnimation = function () {
  const tl = gsap.timeline();
  tl.from(".QAs-hero .accordion-item", {
    opacity: 0,
    y: 50,
    stagger: 0.3,
  })
    .from(".QAs-hero .container > p", {
      opacity: 0,
      y: 50,
    })
    .from(".QAs-hero .cta", {
      opacity: 0,
      y: 50,
    })
    .to(
      ".QAs-hero",
      {
        "--before-opacity": 1,
        "--before-translate": "-50%",
        duration: 1,
      },
      "-=0.5"
    )
    .to(
      ".QAs-hero",
      {
        "--after-opacity": 1,
        "--after-translate": "-50%",
        duration: 1,
      },
      "-=1"
    );
};
QAsPageAnimation();
//* End QAs page ---------------------------------------------------------------------

//* Start contact page ---------------------------------------------------------------------
const contactPageAnimation = function () {
  const tl = gsap.timeline();
  tl.from(".contact-hero h1", {
    opacity: 0,
    y: 50,
  })
    .from(".contact-hero .container > p", {
      opacity: 0,
      y: 50,
    })
    .from(".contact-contact", {
      opacity: 0,
      scale: 0,
      ease: "none",
    })
    .to(
      ".contact-hero",
      {
        "--before-opacity": 1,
        "--before-translate": "-50%",
        duration: 1,
      },
      "-=0.5"
    );
};
contactPageAnimation();
//* End contact page ---------------------------------------------------------------------
