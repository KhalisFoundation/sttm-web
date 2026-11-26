import { newDesignPath, newDesignUrl } from '../design-preference';

const at = (url: string) => {
  const { pathname, search, hash } = new URL(url, 'https://www.sikhitothemax.org');
  return { pathname, search, hash };
};

describe('newDesignPath', () => {
  it('keeps the path, query and hash as they are', () => {
    expect(newDesignPath(at('/shabad?id=1&highlight=3'))).toBe('/shabad?id=1&highlight=3');
    expect(newDesignPath(at('/shabad?random'))).toBe('/shabad?random');
    expect(newDesignPath(at('/ang?ang=1&source=G'))).toBe('/ang?ang=1&source=G');
    expect(newDesignPath(at('/index/sri-guru-granth-sahib'))).toBe('/index/sri-guru-granth-sahib');
    expect(newDesignPath(at('/help#keyboard'))).toBe('/help#keyboard');
    expect(newDesignPath(at('/'))).toBe('/');
  });

  it('drops the ?design=old escape hatch', () => {
    expect(newDesignPath(at('/?design=old'))).toBe('/');
    expect(newDesignPath(at('/shabad?id=1&design=old'))).toBe('/shabad?id=1');
  });
});

describe('newDesignUrl', () => {
  it('is the same page on the new design', () => {
    expect(newDesignUrl(at('/search?q=hhnh&type=0'))).toBe(
      'https://next.sikhitothemax.org/search?q=hhnh&type=0'
    );
  });
});
