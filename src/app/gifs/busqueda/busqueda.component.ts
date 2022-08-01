import { Component, ElementRef, ViewChild} from '@angular/core';
import { Validators } from '@angular/forms';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent 
{
    @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;            //Operador para asegurarse de que el objeto nunca es nulo --!--

constructor(private gifsService: GifsService) {}


    buscar() {
      const value = this.txtBuscar.nativeElement.value;

      if(value.trim().length===0){ //Evitar que se ingresen campos vacios al array
        return;
      }

      this.gifsService.buscarGiffs(value);

      this.txtBuscar.nativeElement.value='';
    }

}
