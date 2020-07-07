import { sanitizeBaani } from "./sanitize-baani"

export const baaniNameToIdMapper = (baanies: any, baaniIdOrName: string) => {
  const allBaanies = baanies.map(b => {
    return {
      id: b.ID,
      token: b.token,
      name: sanitizeBaani(b.transliteration).split(' ').join('-'),
    }
  })

  console.log(allBaanies, baaniIdOrName, 'all baanies')

  for (let cntr = 0; cntr < allBaanies.length; ++cntr) {
    if (allBaanies[cntr].id == baaniIdOrName ||
      allBaanies[cntr].name == baaniIdOrName) {
      return allBaanies[cntr].id;
    }
  }
}