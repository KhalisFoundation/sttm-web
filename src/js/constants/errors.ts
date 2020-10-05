
interface IErrors {
  [key: string]: {
    title: string
    message: string
  }
}

export const errors: IErrors = {
  steekOptions: {
    title: "Invalid steek options selection",
    message: "Empty steek options is invalid selection. You need to have atleast 1 steek option selected if punjabi translation is selected"
  },
}