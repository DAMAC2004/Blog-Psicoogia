// Datos generales del sitio en un solo lugar, para editarlos sin tocar componentes.
export const SITE = {
  name: 'Mente Abierta',
  blogName: 'Psicoblog',
  tagline: 'Un espacio de confianza y libre de juicios.',
  email: 'psicologia@regionsierra.tecnm.mx',
  phones: [
    { display: '932 406 0164', tel: '+529324060164' },
    { display: '932 406 0169', tel: '+529324060169' },
  ],
  social: [
    // PENDIENTE: enlaces reales. Si la lista está vacía, no se muestra la sección.
    // { label: 'Instagram', url: 'https://instagram.com/...' },
  ],
  postsPerPage: 10,
  // Etiquetas oficiales. Para crear una nueva, agrégala aquí y documéntala en docs/02.
  tags: [
    'Aprendizaje',
    'Bienestar',
    'Comunicación',
    'Estigma',
    'Estrés y Ansiedad',
    'Hábitos',
    'Relaciones de pareja',
    'Salud mental',
  ],
  crisisLine: { name: 'Línea de la Vida', phone: '800 911 2000', hours: 'las 24 horas' },
};
