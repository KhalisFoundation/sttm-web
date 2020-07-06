export const getVisraamClass = (verse: string, akharIndex: number, visraams: any) => {
  let visraamClass = '';

  if (visraams) {
    Object.keys(visraams).forEach((visraamSource) => {
      if (visraams[visraamSource].length) {
        visraams[visraamSource].forEach((visraam) => {
          if (parseInt(visraam.p, 10) === akharIndex) {
            visraamClass += visraam.t === 'v' ?
              ` visraam-${visraamSource}-main ` :
              ` visraam-${visraamSource}-yamki `;
          }
        });
      }
    });
  }
  return visraamClass;
}
