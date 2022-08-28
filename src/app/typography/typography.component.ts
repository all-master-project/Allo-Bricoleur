import { Component, OnInit } from '@angular/core';
import { Adress } from 'app/classes/adress';
import { Service } from 'app/classes/service';
import { SousService } from 'app/classes/sous-service';
import { AdressService } from 'app/services/adress.service';
import { ServiceService } from 'app/services/service.service';
import { SousServiceService } from 'app/services/sous-service.service';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {


  Service: Service = {
    id:null,
    nom: ''
  };
  submitted = false;
  Services: Service[];
  villes: Adress[];
  //sous -service
  SousService: SousService = {
    id:null,
    nom: '',
    adress_id: 0,

    service_id: 0
  };
  SousServices: SousService[];

  constructor(private ServiceService: ServiceService, 
    private SousServiceService: SousServiceService, 
    private _adressService: AdressService) { }

  ngOnInit() {
    this._adressService.getAll().subscribe(adresses => {
      this.villes = adresses['_embedded']['Adress'];
    }, err => {
      console.log("err");
      console.log(err);
    }
    );
    this.getAllService();
    this.getAllSousService();
  }
  showService(serv : Service){
    this.Service = serv;
  }

  deleteService(id: any) {
    console.log("id");
    console.log(id);

    this.ServiceService.delete(id)
      .subscribe(
        response => {
          this.Services = [];
          this.getAllService();
          //this.router.navigate(['/user-profile']);
        },
        error => {
          console.log(error);
        });
  }

  saveService() {
    const data = {
      nom: this.Service.nom
    };
    console.log(data);


    this.ServiceService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.newService();
        },
        error => {
          console.log(error);
        });
  }

  newService() {
    this.submitted = false;
    this.Service = {
      nom: ''
    };
  }


  async getAllService() {
    this.ServiceService.getAll().subscribe(Services => {
      this.Services = Services['_embedded']['Service'];
      console.log("this.Services");
      console.log(this.Services);
      this.Services.forEach(element => {
        console.log(element.nom);

      });
      console.log(Services['_embedded']['Service']);
      //reset champs
      //upload table
    }, err => {
      console.log("err");
      console.log(err);

    }
    );
  }

  //sous-service

  showSousServices(ssvc : SousService){
    this.SousService = ssvc;
  }

  deleteSousServices(id: any) {
    console.log("id");
    console.log(id);

    this.SousServiceService.delete(id)
      .subscribe(
        response => {
          this.SousServices = [];
          this.getAllSousService();
          //this.router.navigate(['/user-profile']);
        },
        error => {
          console.log(error);
        });
  }
  
  saveSousService() {
    const data = {
      nom: this.SousService.nom,
      adress_id: this.SousService.adress_id,
  
      service_id: this.SousService.service_id
    };
    console.log(data);


    this.SousServiceService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.newSousService();
        },
        error => {
          console.log(error);
        });
  }

  newSousService() {
    this.submitted = false;
    this.SousService = {
      nom: '',
      adress_id: 0,
  
      service_id: 0
    };
  }


  async getAllSousService() {
    this.SousServiceService.getAll().subscribe(SousService => {
      this.SousServices = SousService['_embedded']['SousService'];
      console.log("this.SousService");
      console.log(this.SousServices);
      this.Services.forEach(element => {
        console.log(element.nom);

      });
      console.log(SousService['_embedded']['SousService']);
      //reset champs
      //upload table
    }, err => {
      console.log("err");
      console.log(err);

    }
    );
  }

}
