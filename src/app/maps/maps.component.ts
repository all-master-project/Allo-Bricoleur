import { Component, OnInit } from '@angular/core';
import { Adress } from 'app/classes/adress';
import { AdressService } from 'app/services/adress.service';

declare const google: any;


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

 
    
  Adress : Adress= {
    id:null,
	region: '',
	ville: ''

  };
  submitted = false;
  Adresss : Adress[];
  constructor(private AdressService: AdressService) { }

  ngOnInit() {
    this.getAllAdress();
  }
  showAdress(adr : Adress){
    this.Adress = adr;
  }

  deleteAdress(id: any) {
    console.log("id");
    console.log(id);

    this.AdressService.delete(id)
      .subscribe(
        response => {
          this.Adresss = [];
          this.getAllAdress();
          //this.router.navigate(['/user-profile']);
        },
        error => {
          console.log(error);
        });
  }
  saveAdress() {
    const data = {
      region: this.Adress.region,
      ville: this.Adress.ville
    };
    console.log(data);


    this.AdressService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.newAdress();
        },
        error => {
          console.log(error);
        });
  }

  newAdress() {
    this.submitted = false;
    this.Adress = {
        region: '',
        ville: ''
    };
  }


  async getAllAdress() {
    this.AdressService.getAll().subscribe(Adresss => {
      this.Adresss = Adresss['_embedded']['Adress'];
      console.log("this.Adresss");
      console.log(this.Adresss);
      this.Adresss.forEach(element => {
        console.log(element.region);
        
      });
      console.log(Adresss['_embedded']['Adress']);
      //reset champs
      //upload table
    }, err => {
      console.log("err");
      console.log(err);

    }
    );
  }

}
