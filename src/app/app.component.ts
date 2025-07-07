import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fervo-weather-form';
  currentYear = new Date().getFullYear();

  constructor(private translate: TranslateService) {
    // Imposta lingua di default e fallback
    this.translate.setDefaultLang('it');
    this.translate.use('it');
  }

  switchLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.translate.use(lang);
  }
}
