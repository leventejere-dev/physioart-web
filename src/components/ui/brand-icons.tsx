import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.55V4.47A20.7 20.7 0 0 0 14.29 4.3c-2.22 0-3.74 1.36-3.74 3.85v2.35H8v3h2.55V21h2.95Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GooglePlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.2 2.6a1.3 1.3 0 0 0-.45 1.03v16.74c0 .42.17.79.45 1.03l9.33-9.4L4.2 2.6Zm10.6 10.67 2.62 2.64-11.3 6.42 8.68-9.06Zm0-2.54L6.12 1.67l11.3 6.42-2.62 2.64Zm3.95.6 2.43 1.38c.97.55.97 1.83 0 2.38l-2.43 1.38-2.85-2.57 2.85-2.57Z" />
    </svg>
  );
}
