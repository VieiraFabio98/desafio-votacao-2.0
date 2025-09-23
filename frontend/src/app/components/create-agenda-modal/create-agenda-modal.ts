import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { RestService } from '../../services/rest.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogRef } from '@angular/material/dialog';

interface ICategory {
  value: string
  viewValue: string
}

@Component({
  selector: 'app-create-agenda-modal',
  imports: [MatDividerModule, MatFormFieldModule, MatInputModule, MatSelect, MatOption, MatDatepickerModule, MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-agenda-modal.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './create-agenda-modal.scss'
})
export class CreateAgendaModal implements OnInit, OnDestroy {

  agendaForm!: FormGroup;
  private subscriptions = new Subscription()

  categories: ICategory[] = [
    {value: 'POLITICA', viewValue: 'Política'},
    {value: 'ESPORTES', viewValue: 'Esportes'},
    {value: 'TECNOLOGIA', viewValue: 'Tecnologia'},
    {value: 'EDUCAÇÃO', viewValue: 'Educação'},
    {value: 'OUTROS', viewValue: 'Outros'},
  ]

  constructor(
    private formBuilder: FormBuilder,
    private restService: RestService,
    private dialogRef: MatDialogRef<CreateAgendaModal>
  ){
    
  }

  ngOnInit(): void {
    this.agendaForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      category: [''],
      iniVoteDate: [null],
      iniVoteTime: ['00:00'],
      durationValue: [1, [Validators.required, Validators.min(1)]],
      durationUnit: ['minutes', Validators.required]
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  save() {
    const payload = this.setPayload()

    this.subscriptions.add(
      this.restService.post('/agendas', payload).subscribe({
        next: (response) => {
          this.agendaForm.reset()
          this.dialogRef.close(true)
        },
        error: (error) => {
          console.log(error)
        }
      })
    )
  }

  setPayload() {
    return {
      title: this.agendaForm.value.title,
      description: this.agendaForm.value.description,
      category: this.agendaForm.value.category,
      iniVoteDate: this.agendaForm.value.iniVoteDate,
      iniVoteTime: this.formatTime(this.agendaForm.value.iniVoteTime),
    }
  }

  formatTime(value: string) {
    const hours = parseInt(value.split(':')[0])
    const minutes = parseInt(value.split(':')[1])
    return (hours * 60) + minutes
  }

}