function lazyLoadImages(selector, options = { threshold: 0.5 }) {
  const images = document.querySelectorAll(`${selector}[data-src]`);

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  }, options);

  images.forEach(image => {
    observer.observe(image);
  });
}
