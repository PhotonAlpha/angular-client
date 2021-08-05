import { MissingTranslationHandler, MissingTranslationHandlerParams } from "@ngx-translate/core";

export class CustomMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return this.alternative(params.key)
  }

  alternative(key: string) {
    let alternative = key
    if(key) {
      alternative = key.split('.').pop() || ''
    }
    return alternative
  }
  
}