import { Component, OnInit } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { formatCurrency, CurrencyPipe, formatNumber, DecimalPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'app-main-form',
  standalone: true,
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.css',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatSliderModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDividerModule,
    CurrencyPipe,
    DecimalPipe,
    PercentPipe,
  ],
})
export class MainFormComponent {

  taxForm: FormGroup;
  hoursMonthly: number = 0;
  monthlyTotal: number = 0;
  yearlyTotal: number = 0;
  quarterlyTotal: number = 0;
  quarterlyTotalRSD: number = 0;
  normiraniTroskoviA: number = 103296;
  normiraniTroskoviB: number = 62300;
  uvecanjeNormiranihTroskovaA: number = 0;
  uvecanjeNormiranihTroskovaB: number = 0.34;
  osnovicaDoprinosaA: number = 0;
  osnovicaDoprinosaB: number = 0;
  porezZaUplatuA: number = 0;
  pioZaUplatuA: number = 0;
  zdravstvenoZaUplatuA: number = 0;
  porezZaUplatuB: number = 0;
  pioZaUplatuB: number = 0;
  zdravstvenoZaUplatuB: number = 0;

  constructor() {
    this.taxForm = new FormGroup({
      hourlyRate: new FormControl(10),
      hoursPerDay: new FormControl(8),
      daysPerMonth: new FormControl(21),
      zdravstvenoOsiguran: new FormControl(false),
    });
  }

  ngOnInit() {
    // Trigger initial calculation with default values
    const initialValues = this.taxForm.value;
    
    this.taxForm.valueChanges.subscribe(values => {
      this.calculate(values.hourlyRate, values.hoursPerDay, values.daysPerMonth);
      if (values.zdravstvenoOsiguran) {
        this.zdravstvenoZaUplatuA = this.osnovicaDoprinosaA * 0.103;
        this.zdravstvenoZaUplatuB = this.osnovicaDoprinosaB * 0.103;
      } else {
        this.zdravstvenoZaUplatuA = 0;
        this.zdravstvenoZaUplatuB = 0;
      }
    });

    this.calculate(initialValues.hourlyRate, initialValues.hoursPerDay, initialValues.daysPerMonth);
  }

  calculate(hourlyRate: number, hoursPerDay: number, daysPerMonth: number) {
    this.hoursMonthly = hoursPerDay * daysPerMonth;
    this.monthlyTotal = this.hoursMonthly * hourlyRate;
    this.yearlyTotal = this.monthlyTotal * 12;
    this.quarterlyTotal = this.monthlyTotal * 3;
    this.quarterlyTotalRSD = this.quarterlyTotal * 117;
    this.osnovicaDoprinosaA = this.quarterlyTotalRSD - (this.quarterlyTotalRSD * this.uvecanjeNormiranihTroskovaA) - this.normiraniTroskoviA;
    this.osnovicaDoprinosaB = this.quarterlyTotalRSD - (this.quarterlyTotalRSD * this.uvecanjeNormiranihTroskovaB) - this.normiraniTroskoviB;
    this.porezZaUplatuA = this.osnovicaDoprinosaA * 0.2;
    this.pioZaUplatuA = this.osnovicaDoprinosaA * 0.24;
    this.porezZaUplatuB = this.osnovicaDoprinosaB * 0.1;
    this.pioZaUplatuB = this.osnovicaDoprinosaB * 0.24;
  }
}
