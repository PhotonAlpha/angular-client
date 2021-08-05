import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CustomMissingTranslationHandler } from './custom-missing-translation-handler';

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  // return new TranslateHttpLoader(http, './assets/i18n/', '');
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  // return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: CustomMissingTranslationHandler },
      isolate: true
      
    })
  ],
  exports: [TranslateModule],
  providers: [],
})
export class TranslationLazyLoadedModule { }
