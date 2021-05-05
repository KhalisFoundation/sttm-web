interface IToMultipleShabadsUrlArguments {
  shabadData: (number | undefined)[][]
}

export const toMultipleShabadsURL = ({
  shabadData,  
}: IToMultipleShabadsUrlArguments) => {
  const shabadIds = [];
  const verseIds = [];
  for(const shabad of shabadData) {
    const [shabadId, verseId] = shabad;
    shabadIds.push(shabadId)
    verseIds.push(verseId)
  }
  return `/shabad?id=${shabadIds.join(',')}&highlight=${verseIds.join(',')}`;
}
