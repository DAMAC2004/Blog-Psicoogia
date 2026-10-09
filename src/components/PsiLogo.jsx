// Símbolo psique (Ψ), logo del sitio. Hereda el color con currentColor.
export default function PsiLogo({ size = 26, title = 'Símbolo psique', className = '', ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={title}
      className={className}
      {...rest}
    >
      <path d="M6 7.5v4.5a10 10 0 0 0 20 0V7.5" />
      <path d="M16 4v24" />
      <path d="M11.5 28h9" />
    </svg>
  );
}
