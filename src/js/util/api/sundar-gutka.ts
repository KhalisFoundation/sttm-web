import { NITNEM_BANIS, POPULAR_BANIS } from '@/constants';

export const getBaniCategories = (baniList) => [
  {
    heading: "Nitnem",
    banis: baniList.filter((b) => NITNEM_BANIS.includes(b.ID))
  },
  {
    heading: "Popular Bani",
    banis: baniList.filter((b) => POPULAR_BANIS.includes(b.ID))
  },
  {
    heading: "Other",
    banis: baniList.filter((b) => !NITNEM_BANIS.includes(b.ID) &&
      !POPULAR_BANIS.includes(b.ID))
  },
];
