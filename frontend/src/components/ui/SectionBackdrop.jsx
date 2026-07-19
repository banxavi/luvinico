import { SECTION_BACKGROUNDS } from '../../data/sectionBackgrounds';

export default function SectionBackdrop({ sectionKey, children, className = '' }) {
  const bg = SECTION_BACKGROUNDS[sectionKey];

  return (
    <div
      className={['section-backdrop', bg ? 'section-backdrop--has-image' : '', className].filter(Boolean).join(' ')}
      style={bg ? { '--section-bg-image': `url(${bg})` } : undefined}
    >
      {children}
    </div>
  );
}
