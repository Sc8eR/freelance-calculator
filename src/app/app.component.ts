import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MainFormComponent } from "./main-form/main-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSliderModule, MatSlideToggleModule, MainFormComponent],
  template: '',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'freelance-calculator';
}
