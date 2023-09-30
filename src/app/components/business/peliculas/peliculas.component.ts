import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from 'src/app/models/movie.model~';

import { MatSort } from '@angular/material/sort';
import { NgForm }  from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogModule,MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpDataService } from 'src/app/services/http-data.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
})

export class PeliculasComponent {
  movieData!: Movie;

  @ViewChild('movieForm', { static: false })
  movieForm!: NgForm;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'name',
    'photo',
    'duracion',
    'genero',
    'description',
    'acciones',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  isEditMode = false;
  movieDeleted = false;

  //Nesesario importar sus modules en material.module.ts
  @ViewChild(MatSort, { static: true }) Sort!: MatSort;

  constructor(private httpDataService: HttpDataService , public dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.movieData= {} as Movie;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.Sort;
    this.getAllMovies();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar");
  }

  getAllMovies() {
    this.httpDataService.getMovies().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSubmit(){
    if(this.movieForm.form.valid){
      console.log('valid');
      if(this.isEditMode){
        console.log('update');
        this.updateMovie();
      }else{
        console.log('create');
        this.addMovie();
      }
      this.cancelEdit();
    } else{
      console.log('valid data');
    }
  }

  cancelEdit(){
    this.isEditMode = false;
    this.movieForm.resetForm();
    this.getAllMovies();
  }
  
  editItem(element: any){
    this.movieData = element;
    this.isEditMode = true;
  }

  //delete
  deleteMovie(id: string){
    this.httpDataService.deleteMovie(id).subscribe((response: any)=>{
      this.dataSource.data = this.dataSource.data.filter((o: any)=>{
        this.getAllMovies();
        this.openSnackBar("Pelicula Eliminada");
        return o.id !== id ? o : false;
      })
    })
    console.log(this.dataSource.data);
  }

   //add
   addMovie(){ 
    this.movieData.id = this.dataSource.data.length + 1;
    this.httpDataService.createMovie(this.movieData).subscribe((response: any)=>{
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o: any)=>{
        this.getAllMovies();
        this.openSnackBar("Pelicula Añadida");
        return o;
      })
    })
  }

  //update
  updateMovie(){
    this.httpDataService.updateMovie(this.movieData.id, this.movieData).subscribe((response: any)=>{
      this.dataSource.data = this.dataSource.data.map((o: any)=>{
        if(o.id === response.id){
          o = response;
        }
        this.getAllMovies();
        this.openSnackBar("Pelicula Actualizada");
        return o;
      })
    })
  }

  
  //Ventana Modal

  openDialogDelete(movie_id : string) {
    const dialogRef = this.dialog.open(DialogDeleteMovie, {
      data: { nombre :  this.movieDeleted},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.movieDeleted = result;
      if(this.movieDeleted){
        this.deleteMovie(movie_id);
      }
    });
  }


}

@Component({
  selector: 'dialog-delete-user',
  templateUrl: './dialogs/dialog-delete-movie.html',
  styleUrls: ['./dialogs/dialog-delete-movie.css'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule],
})
export class DialogDeleteMovie {
  constructor(public dialogRef: MatDialogRef<DialogDeleteMovie>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}