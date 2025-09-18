import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './create.html',
  styleUrl: './create.scss',
  standalone: true
})
export class Create implements OnInit, OnDestroy {

  private subscription = new Subscription()
  pautaForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ){
    
  }

  ngOnInit(): void {
    this.pautaForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descricao: [''],
      duracao: [1]
    })
  }

  ngOnDestroy(): void {
    
  }

}
