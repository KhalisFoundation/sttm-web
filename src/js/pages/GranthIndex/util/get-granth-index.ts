import { DG, NLV, SGGS } from "@/constants/granth-index";

export const getGranthIndex = (pathname: string) => {
  if (/sri-guru/.test(pathname)) {
    return SGGS
  } else if (/sri-dasam/.test(pathname)) {
    return DG
  } else if (/bhai-nand/.test(pathname)) {
    return NLV
  }
  return SGGS;
}
