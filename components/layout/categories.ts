export const allCategories = [
  { slug: 'snidane', name: 'Snídaně' },
  { slug: 'hlavni-chody', name: 'Hlavní chody' },
  { slug: 'salaty', name: 'Saláty' },
  { slug: 'svaciny', name: 'Svačiny' },
  { slug: 'dezerty', name: 'Dezerty' },
  { slug: 'krabickova-dieta', name: 'Krabíčková dieta' },
];

export const getCategoryName = (category: string) => allCategories.find((c) => c.slug === category)?.name || '';

export enum Path {
  home = '/',
  about = '/o-mne',
  blog = '/blog',
  recipes = '/recepty',
  trainings = '/osobni-treninky-plzen',
  categories = '/kategorie',
}
