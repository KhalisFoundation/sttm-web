interface IShouldSaveAngArguments {
  type: string,
  info: {
    source: {
      sourceId: string
    }
  }
}

export const shouldSaveAng = ({ type, info }: IShouldSaveAngArguments) =>
  type === 'ang' && info.source.sourceId === 'G';
