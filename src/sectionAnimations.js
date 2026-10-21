
export function initSectionAnimations() {
  const selectors = [
    '.features-section',
    '.appIntroduction',
    '.howit-section',
    '.faqs-section',
    '.contact-section',
    '.download-section',
  ];

  const sections = document.querySelectorAll(selectors.join(', '));

  if (!sections.length) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -30px 0px',
    }
  );

  sections.forEach((section) => observer.observe(section));

  return () => observer.disconnect();
}
