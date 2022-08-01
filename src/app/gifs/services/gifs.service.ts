import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '3Pt6hg5eXMkEziJV1JpoR8iblRRPXtGM';
  private servicioUrl : string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];


  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial]; 
  }

  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) ;

    this.resultados = JSON.parse(localStorage.getItem('resultados')!);


    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!) ;
    // }
  }

  buscarGiffs (query : string = '') {

    query = query.trim().toLocaleLowerCase(); //Evitar los espacios adelante y atras con el trim y guardar el query en miniscula. Para evitar busquedas duplicadas


    if(!this._historial.includes(query))
    {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10); //Mostrar solo los 10 primeros, cortando con splice. Primero insertando y luego lo corto

      localStorage.setItem('historial', JSON.stringify(this._historial)); 
    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit','20')
    .set('q',query);


    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
    .subscribe(( resp ) => {
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados)); //Lo pongo en este apartado porque ya tendria los resultados de la busqueda

    });


  }

}
