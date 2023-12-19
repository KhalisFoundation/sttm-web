export const getQueryParams = (
  qString: string = document.location.search
): any => {
  const qs = qString.replace(/\+/g, ' ');
  const params: any = {};
  const re = /[?&]?([^=]+)=([^&]*)/g;
  let tokens;

  while ((tokens = re.exec(qs))) {
    const firstToken = tokens[1];
    const secondToken = tokens[2];
    params[decodeURIComponent(firstToken)] = decodeURIComponent(secondToken);
  }

  return params;
};
