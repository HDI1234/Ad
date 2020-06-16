import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { bmi } from '../bmi'
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'router-outlet',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.css']
})
export class BmiComponent implements OnInit {

  angForm: FormGroup;
  bmi: bmi[];
  totalbmi: number;
  selectedbmi: bmi = {Bmi_id:null, Name:null, Weight:null, Height:null, BMI:null, Category:null};
  constructor(private apiService: ApiService, private fb: FormBuilder) {

    this.createForm();
    this.apiService.readBmi().subscribe((bmi: bmi[]) =>{
      this.bmi = bmi;
      console.log(this.bmi);
    })

  }

  ngOnInit(): void {
  }

  create(){
    console.log(this.angForm.value)
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

      this.totalbmi = this.selectedbmi.Weight/(this.selectedbmi.Height * this.selectedbmi.Height);

      if (this.totalbmi >= 29.9 ) {
        this.totalbmi = this.selectedbmi.BMI;
        this.selectedbmi.Category = "Obese";
      }

      else if (this.totalbmi >= 25 && this.totalbmi < 29.9) {
        this.totalbmi = this.selectedbmi.BMI;
        this.selectedbmi.Category = "Overweight";
      }

      else if (this.totalbmi >= 18.5 && this.totalbmi < 24.9) {
        this.totalbmi = this.selectedbmi.BMI;
        this.selectedbmi.Category = "Normal";
      }

      else if (this.totalbmi > 18.5) {
        this.totalbmi = this.selectedbmi.BMI;
        this.selectedbmi.Category = "Underweight";
      }

      form.value.Bmi_id = this.selectedbmi.Bmi_id;
      form.value.Name = this.selectedbmi.Name;
      form.value.Weight = this.selectedbmi.Weight;
      form.value.Height = this.selectedbmi.Height;
      form.value.BMI = this.selectedbmi.BMI;
      form.value.Category = this.selectedbmi.Category;
      if(this.selectedbmi && this.selectedbmi.Bmi_id){
        this.apiService.readBmi().subscribe((bmi: bmi[])=>{
          this.bmi = bmi;
      });
      }
      else {
        this.apiService.createBmi(form.value).subscribe((bmi: bmi)=>{
          console.log("bmi created, ", bmi);
          this.apiService.readBmi().subscribe((bmi: bmi[])=>{
            this.bmi = bmi;
        });
      })
      }
    }

    selectbmi(bmi: bmi){
      this.selectedbmi = bmi;
    }
}
