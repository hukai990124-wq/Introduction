// One date per certificate event, shared by the CV, gallery and all languages.
// Store YYYY-MM only. HTML uses data-qualification-date; translations use {date:key}.
export const qualificationMonths = {
    "degree.issued": "2026-03",
    "generativeAi.issued": "2026-07",
    "awsClf.issued": "2026-09",
    "awsAif.issued": "2026-10",
    "fp3.issued": "2022-10",
    "accounting3.issued": "2022-10",
    "toeicLr.test": "2025-03",
    "toeicSw.test": "2026-09",
    "jlptN1.test": "2021-12",
    "jlptN1.issued": "2022-04",
    "itPassport.test": "2026-06",
    "itPassport.issued": "2026-07",
    "driving.obtained": "2026-01",
    "tencent.obtained": "2026-10"
} as const;

export function qualificationMonth(key: string): string {
    if (!Object.hasOwn(qualificationMonths, key)) throw new Error(`Unknown qualification date: ${key}`);
    const month = qualificationMonths[key as keyof typeof qualificationMonths];
    if (!/^\d{4}-(?:0[1-9]|1[0-2])$/.test(month)) throw new Error(`Use YYYY-MM for qualification date: ${key}`);
    return month;
}

export function formatQualificationMonth(key: string, locale: string): string {
    return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", timeZone: "UTC" })
        .format(new Date(`${qualificationMonth(key)}-01T00:00:00Z`));
}

export function formatQualificationDates(text: string, locale: string): string {
    return text.replace(/\{date:([\w.]+)\}/g, (_match, key: string) => formatQualificationMonth(key, locale));
}
