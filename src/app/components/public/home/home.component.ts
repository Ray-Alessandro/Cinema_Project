import { Component } from '@angular/core';
import { HttpDataService } from 'src/app/services/http-data.service';
import { Movie } from 'src/app/models/movie.model~';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  peliculas: any;

  constructor(private httpDataService: HttpDataService) {
    this.peliculas = {} as Movie; //Revisar, creo que no es necesario
  }

  ngOnInit() {
    //Se ejecuta cuando se inicia el componente
    this.httpDataService.getMovies().subscribe((response: any) => {
      this.peliculas = response;
      console.log(this.peliculas);
    });
  }

  currentSlide = 0;

  images: string[] = [
    'https://cdn.discordapp.com/attachments/1151660063606448158/1155983349744156782/BANNER-PREVENTA-saw.png',
    'https://cinemarkla.modyocdn.com/uploads/d67f858b-6217-4205-a294-64e500bcd2a7/original/BANNER-HOME-COMPLEMENTARIOS.png',
    'https://cinemarkla.modyocdn.com/uploads/2d352d79-9f40-40ca-b3bc-a4e27a1fab11/original/BANNER_WEB_TS.png',
    'https://cinemarkla.modyocdn.com/uploads/fd4d9afe-9d2e-4a07-b31f-04fb5b63dedf/original/BANNER-HOME-IU.png',
    'https://cinemarkla.modyocdn.com/uploads/8bae6491-bd3c-4f13-8555-2b9317c10cb1/original/BANNER_WEB_RECARGA_BARRILES_QR.png',
    'https://cdn.discordapp.com/attachments/1151660063606448158/1154484718901940344/362222084_666777205496161_374978095350096886_n.png',
  ];

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.images.length) % this.images.length;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }
}


