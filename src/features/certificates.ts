import { translate } from "../i18n/index.js";

interface CertificateRecord {
  element: HTMLElement;
  image: HTMLImageElement;
  heading: HTMLElement;
}
interface GalleryControls {
  gallery: HTMLElement;
  dialog: HTMLDialogElement;
  image: HTMLImageElement;
  heading: HTMLElement;
  position: HTMLElement;
  original: HTMLAnchorElement;
  error: HTMLElement;
}

export function initCertificates(): void {
  const gallery = document.querySelector<HTMLElement>(".certificate-gallery");
  const dialog = document.querySelector<HTMLDialogElement>(".certificate-dialog");
  const image = dialog?.querySelector<HTMLImageElement>(".viewer-image");
  const heading = dialog?.querySelector<HTMLElement>(".viewer-title");
  const position = dialog?.querySelector<HTMLElement>(".viewer-position");
  const original = dialog?.querySelector<HTMLAnchorElement>(".viewer-original");
  const error = dialog?.querySelector<HTMLElement>(".viewer-error");
  if (!gallery || !dialog || !image || !heading || !position || !original || !error) return;
  createGallery({ gallery, dialog, image, heading, position, original, error });
}

function createGallery({ gallery, dialog, image, heading, position, original, error }: GalleryControls): void {
  const records: CertificateRecord[] = [];
  gallery.querySelectorAll<HTMLElement>(".certificate-record").forEach(element => {
    const scan = element.querySelector<HTMLImageElement>(".certificate-image-link img");
    const title = element.querySelector<HTMLElement>("h2");
    if (scan && title) records.push({ element, image: scan, heading: title });
  });
  let visible = records;
  let selected = 0;
  let trigger: HTMLElement | undefined;
  const count = document.querySelector<HTMLElement>(".certificate-count");

  function display(): void {
    const record = visible[selected];
    if (!record) return;
    image.src = record.image.src;
    image.alt = record.image.alt;
    heading.textContent = record.heading.textContent;
    position.textContent = translate("viewer.position", { current: selected + 1, total: visible.length });
    original.href = record.image.src;
    error.hidden = true;
  }

  gallery.querySelectorAll<HTMLAnchorElement>(".certificate-image-link, .certificate-open").forEach(link => {
    link.addEventListener("click", event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof dialog.showModal !== "function") return;
      const index = visible.findIndex(record => record.element.contains(link));
      if (index < 0) return;
      event.preventDefault();
      selected = index;
      trigger = link;
      display();
      dialog.showModal();
      document.body.classList.add("viewer-open");
    });
  });
  const change = (offset: number): void => {
    if (!visible.length) return;
    selected = (selected + offset + visible.length) % visible.length;
    display();
  };
  dialog.querySelector(".viewer-close")?.addEventListener("click", () => dialog.close());
  dialog.querySelector(".viewer-previous")?.addEventListener("click", () => change(-1));
  dialog.querySelector(".viewer-next")?.addEventListener("click", () => change(1));
  dialog.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") { event.preventDefault(); change(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); change(1); }
  });
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("close", () => { document.body.classList.remove("viewer-open"); trigger?.focus({ preventScroll: true }); });
  image.addEventListener("error", () => { error.hidden = false; });

  const filters = document.querySelector<HTMLElement>(".certificate-filters");
  filters?.querySelectorAll<HTMLButtonElement>("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;
      visible = records.filter(record => category === "all" || record.element.dataset.category === category);
      records.forEach(record => { record.element.hidden = !visible.includes(record); });
      filters.querySelectorAll<HTMLButtonElement>("[data-filter]").forEach(filter => filter.setAttribute("aria-pressed", String(filter === button)));
      if (count) count.textContent = translate("cert.count", { count: visible.length });
    });
  });
  if (filters) filters.hidden = false;
  document.addEventListener("site:language-change", () => {
    if (count) count.textContent = translate("cert.count", { count: visible.length });
    if (dialog.open) display();
  });
  if (count) count.textContent = translate("cert.count", { count: records.length });
}
