import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from 'src/app/models/movie.model~';

import {MatSort} from '@angular/material/sort';
import {NgForm}  from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { HttpDataService } from 'src/app/services/http-data.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
})
export class PeliculasComponent {
  //movieData!: Movie;

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
  ];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  isEditMode = false;
  //Nesesario importar sus modules en material.module.ts
  @ViewChild(MatSort, { static: true }) Sort!: MatSort;

  constructor(private httpDataService: HttpDataService) {
    //this.movieData= {} as Movie;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.Sort;
    this.getAllMovies();
  }

  getAllMovies() {
    this.httpDataService.getList().subscribe((response: any) => {
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
}
