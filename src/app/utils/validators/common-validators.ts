import { FormControl } from "@angular/forms";
/**
 * 自定义通用验证
 */
export function validateAlphaNumeric() {
  const ALPHANUMERIC_REGEX = /^[0-9A-Za-z]+$/
  const validator = (fc: FormControl): { [key: string]: any } | null => {
    const val = fc.value
    if(!val) {
      return null;
    }
    if(ALPHANUMERIC_REGEX.test(val)) {
      return null;
    }
    return { invalidAlphaNumeric: true}
  }
  return validator;
}