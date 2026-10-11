export function initMotion(): void {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const progress = document.querySelector<HTMLElement>(".reading-progress");
  let frame = 0;
  const updateProgress = (): void => {
    frame = 0;
    const distance = document.documentElement.scrollHeight - innerHeight;
    const fraction = distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0;
    if (progress) progress.style.transform = `scaleX(${fraction})`;
  };
  const scheduleProgress = (): void => {
    if (!frame) frame = requestAnimationFrame(updateProgress);
  };
  addEventListener("scroll", scheduleProgress, { passive: true });
  addEventListener("resize", scheduleProgress, { passive: true });
  updateProgress();

  const panels = document.querySelectorAll<HTMLElement>("[data-reveal]");
  let observer: IntersectionObserver | undefined;
  const showAll = (): void => {
    observer?.disconnect();
    panels.forEach(panel => panel.classList.add("is-visible"));
  };
  if (reduced.matches || !("IntersectionObserver" in window)) {
    showAll();
  } else {
    document.body.classList.add("motion-enabled");
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08 });
    panels.forEach(panel => observer?.observe(panel));
  }
  reduced.addEventListener("change", event => { if (event.matches) showAll(); });

  document.querySelectorAll<HTMLElement>(".tilt-surface").forEach(surface => {
    let tiltFrame = 0;
    surface.addEventListener("pointermove", event => {
      if (reduced.matches || event.pointerType !== "mouse") return;
      cancelAnimationFrame(tiltFrame);
      const bounds = surface.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      tiltFrame = requestAnimationFrame(() => {
        surface.style.setProperty("--tilt-x", `${-y * 7}deg`);
        surface.style.setProperty("--tilt-y", `${x * 7}deg`);
      });
    });
    const resetTilt = (): void => {
      cancelAnimationFrame(tiltFrame);
      surface.style.setProperty("--tilt-x", "0deg");
      surface.style.setProperty("--tilt-y", "0deg");
    };
    surface.addEventListener("pointerleave", resetTilt);
    reduced.addEventListener("change", event => { if (event.matches) resetTilt(); });
    addEventListener("pagehide", resetTilt);
  });
  addEventListener("pagehide", () => { cancelAnimationFrame(frame); showAll(); });
  addEventListener("pageshow", scheduleProgress);
}
