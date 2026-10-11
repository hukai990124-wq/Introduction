import { translate } from "../i18n/index.js";
export function initCertificates() {
    const gallery = document.querySelector(".certificate-gallery");
    const dialog = document.querySelector(".certificate-dialog");
    const image = dialog?.querySelector(".viewer-image");
    const heading = dialog?.querySelector(".viewer-title");
    const position = dialog?.querySelector(".viewer-position");
    const original = dialog?.querySelector(".viewer-original");
    const error = dialog?.querySelector(".viewer-error");
    if (!gallery || !dialog || !image || !heading || !position || !original || !error)
        return;
    createGallery({ gallery, dialog, image, heading, position, original, error });
}
function createGallery({ gallery, dialog, image, heading, position, original, error }) {
    const records = [];
    gallery.querySelectorAll(".certificate-record").forEach(element => {
        const scan = element.querySelector(".certificate-image-link img");
        const title = element.querySelector("h2");
        if (scan && title)
            records.push({ element, image: scan, heading: title });
    });
    let visible = records;
    let selected = 0;
    let trigger;
    const count = document.querySelector(".certificate-count");
    function display() {
        const record = visible[selected];
        if (!record)
            return;
        image.src = record.image.src;
        image.alt = record.image.alt;
        heading.textContent = record.heading.textContent;
        position.textContent = translate("viewer.position", { current: selected + 1, total: visible.length });
        original.href = record.image.src;
        error.hidden = true;
    }
    gallery.querySelectorAll(".certificate-image-link, .certificate-open").forEach(link => {
        link.addEventListener("click", event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof dialog.showModal !== "function")
                return;
            const index = visible.findIndex(record => record.element.contains(link));
            if (index < 0)
                return;
            event.preventDefault();
            selected = index;
            trigger = link;
            display();
            dialog.showModal();
            document.body.classList.add("viewer-open");
        });
    });
    const change = (offset) => {
        if (!visible.length)
            return;
        selected = (selected + offset + visible.length) % visible.length;
        display();
    };
    dialog.querySelector(".viewer-close")?.addEventListener("click", () => dialog.close());
    dialog.querySelector(".viewer-previous")?.addEventListener("click", () => change(-1));
    dialog.querySelector(".viewer-next")?.addEventListener("click", () => change(1));
    dialog.addEventListener("keydown", event => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            change(-1);
        }
        if (event.key === "ArrowRight") {
            event.preventDefault();
            change(1);
        }
    });
    dialog.addEventListener("click", event => { if (event.target === dialog)
        dialog.close(); });
    dialog.addEventListener("close", () => { document.body.classList.remove("viewer-open"); trigger?.focus({ preventScroll: true }); });
    image.addEventListener("error", () => { error.hidden = false; });
    const filters = document.querySelector(".certificate-filters");
    filters?.querySelectorAll("[data-filter]").forEach(button => {
        button.addEventListener("click", () => {
            const category = button.dataset.filter;
            visible = records.filter(record => category === "all" || record.element.dataset.category === category);
            records.forEach(record => { record.element.hidden = !visible.includes(record); });
            filters.querySelectorAll("[data-filter]").forEach(filter => filter.setAttribute("aria-pressed", String(filter === button)));
            if (count)
                count.textContent = translate("cert.count", { count: visible.length });
        });
    });
    if (filters)
        filters.hidden = false;
    document.addEventListener("site:language-change", () => {
        if (count)
            count.textContent = translate("cert.count", { count: visible.length });
        if (dialog.open)
            display();
    });
    if (count)
        count.textContent = translate("cert.count", { count: records.length });
}
