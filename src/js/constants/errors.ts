
interface IErrors {
  [key: string]: {
    TITLE: string
    MESSAGE: string
  }
}

export const ERRORS: IErrors = {
  STEEK_LANGUAGES: {
    TITLE: "Invalid steek options selection",
    MESSAGE: "Empty steek options is invalid selection. You need to have atleast 1 steek option selected if punjabi translation is selected"
  },
}