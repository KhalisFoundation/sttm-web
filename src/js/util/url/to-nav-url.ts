interface IToNavURLArguments {
  type: string,
  info: {
    source: {
      sourceId: string
    }
  }
}

export const toNavURL = ({ type, info }: IToNavURLArguments) => {
  switch (type) {
    case 'hukamnama':
      return 'hukamnama?date=';
    case 'shabad':
      return 'shabad?id=';
    case 'ang':
      return `ang?source=${info.source.sourceId}&ang=`;
  }
}
