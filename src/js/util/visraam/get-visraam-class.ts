export const getVisraamClass = ({
  akharIndex, visraams, isBothLarivaarAssistAndVisraam = false
}: {
  isBothLarivaarAssistAndVisraam?: boolean,
  akharIndex: number,
  visraams: Object,
}) => {
  let visraamClass = '';

  if (visraams) {
    Object.keys(visraams).forEach((visraamSource) => {
      if (visraams[visraamSource].length) {
        visraams[visraamSource].forEach((visraam) => {
          if (parseInt(visraam.p, 10) === akharIndex) {
            if(isBothLarivaarAssistAndVisraam) {
              visraamClass += visraam.t == 'v' ?
              ` larivaar-visraam-${visraamSource} larivaar-visraam-${visraamSource}-main ` : 
              ` larivaar-visraam-${visraamSource} larivaar-visraam-${visraamSource}-yamki `;
            }else {
              visraamClass += visraam.t === 'v' ?
              ` visraam-${visraamSource}-main ` :
              ` visraam-${visraamSource}-yamki `;
            }
          }
        });
      }
    });
  }

  return visraamClass;
}
