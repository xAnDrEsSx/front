import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Respuesta } from 'src/app/interfaces/respuesta';
import { BranchStoreService } from 'src/app/shared/services/branchStore.service';
import { BranchStoreModel } from 'src/app/models/branch.model';
import { MatTableDataSource } from '@angular/material/table';
import { CurrencyTypeService } from 'src/app/shared/services/currencyType.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css'],
})
export class SucursalComponent {
  sucursalForm: FormGroup;
  dataSource: MatTableDataSource<BranchStoreModel>;
  displayedColumns: string[] = [
    'codigo',
    'descripcion',
    'direccion',
    'identificacion',
    'moneda',
    'acciones',
  ];
  //monedaOptions: string[] = ['Opción 1', 'Opción 2', 'Opción 3'];
  monedaOptions: any[] = [];
  model: any = {};

  tiendas: BranchStoreModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private branchStoreService : BranchStoreService,
    private currencyTypeService : CurrencyTypeService) {

    this.sucursalForm = this.formBuilder.group({
      codigo: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      direccion: ['', [Validators.required, Validators.maxLength(250)]],
      identificacion: ['', [Validators.required, Validators.maxLength(50)]],
      moneda: ['', Validators.required],
    });

    this.cargarTiendas();
    this.cargarTipoMoneda();
    this.dataSource = new MatTableDataSource<BranchStoreModel>(this.tiendas); 
  }

  cargarTipoMoneda(){
    this.currencyTypeService.consultaTipoMoneda().subscribe(
      (data: Respuesta) => {
        if (data.data.length > 0) {
          this.monedaOptions = data.data;
        }
      }
    );
  };

  cargarTiendas(){
    this.branchStoreService.consultaTiendas().subscribe(
      (data: Respuesta) => {
        if (data.data.length > 0) {
          this.tiendas = data.data;
          this.dataSource = new MatTableDataSource<BranchStoreModel>(this.tiendas);
        }
      }
    );
  };  

  crearSucursal(){

    var branch = this.sucursalForm.value;

    this.model = {
      code: branch.codigo,
      description: branch.descripcion,
      address: branch.direccion,
      identification: branch.identificacion,
      currencyTypeId: branch.moneda
    };

    this.branchStoreService.guardarTienda(this.model).pipe(
      finalize(() => {
      })
    )
    .subscribe(async response => {
      if (response.succeeded){
        Swal.fire(
          'Exitoso',
          response.message,
          'success'
        );

        this.cargarTiendas();

        this.sucursalForm.reset();

      }
      else{
        Swal.fire(
          'Fallo..',
          response.message,
          'error'
        );
      }
    }, 
    (err) => {
      console.log(err);

      Swal.fire(
        'Error',
        err.error.message,
        'error'
      );
    });    

  }

  submitForm() {
    if (this.sucursalForm.valid) {
      this.crearSucursal();
    } else {
      Swal.fire(
        'Error',
        "Verificar Campos.",
        'error'
      );
    }
  }

  updateSucursal(sucursal: any) {
    // Actualizar una sucursal
  }

  deleteSucursal(sucursal: any) {
    // Eliminar una sucursal
  }


  async borrarSucursal(row: any) : Promise<any> {
    const resultado = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Borrar Sucursal',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    });

    if(resultado.isConfirmed){
        this.model = {
          Id: row.id
        };
    
        this.branchStoreService.borrarTienda(this.model).pipe(
          finalize(() => {
          })
        )
        .subscribe(async response => {
          if (response.succeeded){
            Swal.fire(
              'Exitoso',
              response.message,
              'success'
            );
    
            this.cargarTiendas();
            
          }
          else{
            Swal.fire(
              'Fallo..',
              response.message,
              'error'
            );
          }
        }, 
        (err) => {
          console.log(err);
    
          Swal.fire(
            'Error',
            err.error.message,
            'error'
          );
        });       
    }
  }

  

}
