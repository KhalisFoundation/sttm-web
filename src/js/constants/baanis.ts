export const NITNEM_BANIS = [2, 4, 6, 9, 10, 20, 21, 23];
export const POPULAR_BANIS = [90, 30, 31, 22];
export const SG_MULTIPLE_VERSION_BAANIS = [9, 21, 22, 23]
export const SG_BAANI_SGPC = 's';
export const SG_BAANI_MEDIUM = 'm';
export const SG_BAANI_TAKSAL = 'l';
export const SG_BAANI_BUDHADAL = 'xl';
export const SG_BAANIS = [
  {
    name: 'Short', length: SG_BAANI_SGPC, value: 0, tooltip: 'This is the minimum SGPC/Akaal Takht standard.',
  },
  {
    name: 'Medium', length: SG_BAANI_MEDIUM, value: 1, tooltip: 'Typically read by followers of the Akhand Keertani Jatha and others.',
  },
  {
    name: 'Long', length: SG_BAANI_TAKSAL, value: 2, tooltip: 'Typically read by followers of Damdami Taksaal and others.',
  },
  {
    name: 'Extra Long', length: SG_BAANI_BUDHADAL, value: 3, tooltip: 'Most popular amongst followers of Buddha Dal.',
  }
]
export const SG_BAANIS_LENGTH_TO_EXISTS_MAP = {
  [SG_BAANI_SGPC]: 'existsSGPC',
  [SG_BAANI_MEDIUM]: 'existsMedium',
  [SG_BAANI_TAKSAL]: 'existsTaksal',
  [SG_BAANI_BUDHADAL]: 'existsBuddhaDal'
}