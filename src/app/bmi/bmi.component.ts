import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { person } from '../person';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'router-outlet',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.css']
})
export class BmiComponent implements OnInit {

  angForm: FormGroup;
  bmi: person[];
  totalbmi: number;
  selectedbmi: person = {Bmi_id: null, Name: null, Weight: null, Height: null, BMI: 0, Category: null};
  constructor(private apiService: ApiService, private fb: FormBuilder) {

    this.createForm();
    this.apiService.readBmi().subscribe((bmi: person[]) => {
      this.bmi = bmi;
      console.log(this.bmi);
    });

  }

  ngOnInit(): void {
  }

  create(){
    console.log(this.angForm.value);
  }

  createForm()
  {
    this.angForm = this.fb.group({
      Name: ['', Validators.required],
      Weight: ['', Validators.required],
      Height: ['', Validators.required]
    });
  }

    createBmi(form){

      this.totalbmi = (this.selectedbmi.Weight / this.selectedbmi.Height / this.selectedbmi.Height) * 10000;
      if (this.totalbmi >= 29.9 ) {
        this.selectedbmi.Category = 'Obese';
      }

      else if (this.totalbmi >= 25 && this.totalbmi < 29.9) {
        this.selectedbmi.Category = 'Overweight';
      }

      else if (this.totalbmi >= 18.5 && this.totalbmi < 24.9) {
        this.selectedbmi.Category = 'Normal';
      }

      else if (this.totalbmi < 18.5) {
        this.selectedbmi.Category = 'Underweight';
      }

      this.selectedbmi.BMI = this.totalbmi;

      form.value.Bmi_id = this.selectedbmi.Bmi_id;
      form.value.Name = this.selectedbmi.Name;
      form.value.Weight = this.selectedbmi.Weight;
      form.value.Height = this.selectedbmi.Height;
      form.value.BMI = parseFloat(this.selectedbmi.BMI.toFixed(2));
      form.value.Category = this.selectedbmi.Category;

      this.apiService.createBmi(form.value).subscribe((bmi: person) => {
        console.log('bmi created, ', bmi);
        this.apiService.readBmi().subscribe((bmi: person[]) => {
          this.bmi = bmi;
        });
      });
    }
}
