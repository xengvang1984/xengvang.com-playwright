export const NavigationHeaderLinkText = {
  ABOUT_ME: 'About Me',
  PROFESSIONAL_EXPERIENCE: 'Professional Experience',
  EDUCATION: 'Education',
  INTERESTS: 'Interests',
} as const;
export type NavigationHeaderLinkText = typeof NavigationHeaderLinkText[keyof typeof NavigationHeaderLinkText];