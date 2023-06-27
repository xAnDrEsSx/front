import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css'],
})
export class SucursalComponent {
  sucursalForm: FormGroup;
  dataSource: any[];
  displayedColumns: string[] = [
    'codigo',
    'descripcion',
    'direccion',
    'identificacion',
    'moneda',
    'acciones',
  ];
  monedaOptions: string[] = ['Opción 1', 'Opción 2', 'Opción 3'];

  constructor(private formBuilder: FormBuilder) {
    this.sucursalForm = this.formBuilder.group({
      codigo: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      direccion: ['', [Validators.required, Validators.maxLength(250)]],
      identificacion: ['', [Validators.required, Validators.maxLength(50)]],
      fechaCreacion: ['', Validators.required],
      moneda: ['', Validators.required],
    });

    // Datos de prueba para la tabla
    this.dataSource = [
      {
        codigo: 1,
        descripcion: 'Sucursal A',
        direccion: 'Calle 123',
        identificacion: 'ABC123',
        moneda: 'COP',
      },
      {
        codigo: 2,
        descripcion: 'Sucursal B',
        direccion: 'Avenida 456',
        identificacion: 'DEF456',
        moneda: 'COP',
      },
      {
        codigo: 3,
        descripcion: 'Sucursal C',
        direccion: 'Plaza 789',
        identificacion: 'GHI789',
        moneda: 'COP',
      },
    ];
  }

  submitForm() {
    if (this.sucursalForm.valid) {
      // Guardar los datos del formulario
    } else {
      // Formulario inválido
    }
  }

  updateSucursal(sucursal: any) {
    // Actualizar una sucursal
  }

  deleteSucursal(sucursal: any) {
    // Eliminar una sucursal
  }
}
