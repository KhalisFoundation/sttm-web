export const VISRAAM = {
  CLASS_NAME: 'display-visraams',
  SOURCES: {
    sttm: 'Default',
    igurbani: 'iGurbani',
    sttm2: 'STTM (Legacy)',
  },
  TYPES: {
    'colored-words': 'Colored Words',
    'gradient-bg': 'Gradient Background',
  },
  SOURCE_CLASS: (source: string) => `vishraam-vishraam-source-${source}`,
  TYPE_CLASS: (type: string) => `vishraam-vishraam-options-${type}`
}
