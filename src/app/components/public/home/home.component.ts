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
    this.httpDataService.getList().subscribe((response: any) => {
      this.peliculas = response;
      console.log(this.peliculas);
    });
  }

  currentSlide = 0;

  images: string[] = [
    'https://cinemarkla.modyocdn.com/uploads/d67f858b-6217-4205-a294-64e500bcd2a7/original/BANNER-HOME-COMPLEMENTARIOS.png',
    'https://cinemarkla.modyocdn.com/uploads/a29c8a8d-99a6-48b0-b6b5-08f7a31a073d/original/BANNER-PROMO_N.png',
    'https://cinemarkla.modyocdn.com/uploads/fd4d9afe-9d2e-4a07-b31f-04fb5b63dedf/original/BANNER-HOME-IU.png',
    'https://cinemarkla.modyocdn.com/uploads/e39b913b-a24c-434a-b78d-393670e6416e/original/BANNER-cumplea_os.png',
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


