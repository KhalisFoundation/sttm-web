export const VISRAAM = {
  CLASS_NAME: 'display-visraams',
  SOURCES: {
    sttm: 'Default',
    igurbani: 'iGurbani',
    sttm2: 'STTM (Legacy)',
  },
  TYPES: {
    'colored-words': 'colored-words',
    'gradient-bg': 'gradient-bg',
  },
  getSourceClass: (source: string) => `vishraam-vishraam-source-${source}`,
  getTypeClass: (type: string) => `vishraam-vishraam-options-${type}`
}
