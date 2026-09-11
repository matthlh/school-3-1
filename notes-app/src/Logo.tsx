/** Same mark as public/favicon.svg, inline so it can sit next to text. */
export function Logo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" style={{ flex: 'none' }}>
      <rect width="64" height="64" rx="14" fill="#2f5fb3" />
      <rect x="16" y="12" width="32" height="40" rx="5" fill="#fff" />
      <rect x="22" y="22" width="20" height="3.5" rx="1.75" fill="#2f5fb3" opacity=".85" />
      <rect x="22" y="30" width="20" height="3.5" rx="1.75" fill="#2f5fb3" opacity=".6" />
      <rect x="22" y="38" width="13" height="3.5" rx="1.75" fill="#2f5fb3" opacity=".4" />
    </svg>
  )
}
