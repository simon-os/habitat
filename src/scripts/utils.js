export function imagesLazyLoad() {
  let lazyloadImages;

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    let imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {
    let lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");

    function lazyload() {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(function() {
        let scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
          if(img.offsetTop < (window.innerHeight + scrollTop)) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
          }
        });
        if(lazyloadImages.length == 0) {
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
}

export function getRandomNumbersArray(length, min, max, unique) {
  let array = [];
  let i = 0;

  while (i < length) {
    let num = randomRange(min, max);

    if (unique && array.includes(num)) continue;

    array.push(num);
    i++;
  }

  return array;
}

export function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function wrapWordsInTag(tagName, containerTag, sel) {
  const el = document.querySelector(sel);
  if (!el) return;

  const words = el.innerText.split(' ');
  el.innerText = '';

  words.forEach(word => {
    if (containerTag) {
      const container = document.createElement(containerTag);
      const tag = document.createElement(tagName);
      tag.innerText = `${word} `;

      container.appendChild(tag);
      el.appendChild(container);
      return;
    }

    const tag = document.createElement(tagName);
    tag.innerText = `${word} `;

    el.appendChild(tag);
  })
}

export function setIncreasingZIndex(sel) {
  const elems = document.querySelectorAll(sel);
  if (!elems) return;

  let val = 0;
  elems.forEach(el => {
    el.style.zIndex = ++val;
  })
}
