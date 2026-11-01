import type { BrainColor } from '../../types/brain';
import type { HatColor } from '../../data/presentationData';

export function BrainVisual({ fill, size = 'md' }: { color: BrainColor; fill: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'concept-brain--lg' : size === 'sm' ? 'concept-brain--sm' : '';
  return (
    <svg className={`concept-brain ${sizeClass}`} viewBox="0 0 180 135" aria-hidden="true">
      <path
        d="M87 117c-15 7-33 2-40-11-15 0-28-12-28-27 0-10 5-19 13-24-2-5-2-10-1-15 3-15 18-25 33-22C71 8 85 5 97 10c11-7 27-4 35 6 14-1 27 9 29 23 12 7 17 22 11 35-4 9-12 15-21 17-3 15-16 26-31 26-7 10-21 13-33 0Z"
        fill={fill}
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M89 18v98M62 25c10 6 14 16 10 29M40 53c12-2 23 4 27 15M35 84c11-5 23-2 30 7M118 24c-9 6-12 17-8 27M140 51c-13-1-23 6-26 17M146 82c-11-4-22 0-28 8M66 103c7-7 16-9 25-5M112 101c-7-6-15-8-23-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".5" />
      <circle cx="53" cy="68" r="5" fill="currentColor" opacity=".72" />
      <circle cx="126" cy="66" r="5" fill="currentColor" opacity=".72" />
    </svg>
  );
}

export function HatVisual({ fill, size = 'md' }: { color: HatColor; fill: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'concept-hat--lg' : size === 'sm' ? 'concept-hat--sm' : '';
  return (
    <svg className={`concept-hat ${sizeClass}`} viewBox="0 0 180 130" aria-hidden="true">
      <path d="M52 82c4-17 8-36 14-55 3-11 12-17 24-17s21 6 24 17c6 19 10 38 14 55-20 9-56 9-76 0Z" fill={fill} stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M70 29c5 6 12 9 20 6 8 3 15 0 20-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".42" />
      <path d="M51 72c21 7 57 7 78 0l3 14c-24 8-60 8-84 0l3-14Z" fill="currentColor" opacity=".3" />
      <path d="M27 92c17-10 40-15 63-15s46 5 63 15c6 4 5 12-2 15-34 14-88 14-122 0-7-3-8-11-2-15Z" fill={fill} stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M48 84c24 7 60 7 84 0" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M41 101c29 8 69 8 98 0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity=".25" />
    </svg>
  );
}
