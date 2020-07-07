import { MAX_LARIVAAR_ASSIST_STRENGTH } from "@/constants";

export const getLarivaarStrengthPercentage = (strength: number) => {
  if (MAX_LARIVAAR_ASSIST_STRENGTH === strength) {
    return 1;
  }
  const perUnitBrightness = 1 / MAX_LARIVAAR_ASSIST_STRENGTH;
  return strength * perUnitBrightness;
}
