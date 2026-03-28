export const designClasses = {
  container: "ds-container",
  section: "ds-section",
  sectionTight: "ds-section-sm",
  eyebrow: "text-eyebrow",
  headingXl: "text-heading-xl",
  headingLg: "text-heading-lg",
} as const;

export type DesignClassKey = keyof typeof designClasses;
