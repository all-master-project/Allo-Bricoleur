import { Component, OnInit } from '@angular/core';
import { Adress } from 'app/classes/adress';
import { Client } from 'app/classes/client';
import { AdressService } from 'app/services/adress.service';
import { ClientService } from 'app/services/client.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  
  Client : Client= {
    id:null,
    nom: '',
	
    prenom: '', 
	
    email: '',
        
    id_ville: 0

  };
  submitted = false;
  Clients : Client[];
  villes: Adress[];

  constructor(private ClientService: ClientService,  private _adressService: AdressService) { }

  ngOnInit() {

    this._adressService.getAll().subscribe(adresses => {
      this.villes = adresses['_embedded']['Adress'];
    }, err => {
      console.log("err");
      console.log(err);
    }
    );

    this.getAllClient();
  }

  showClient(clt : Client){
    this.Client = clt;
  }

  deleteClient(id: any) {
    console.log("id");
    console.log(id);

    this.ClientService.delete(id)
      .subscribe(
        response => {
          this.getAllClient();
          //this.router.navigate(['/user-profile']);
        },
        error => {
          console.log(error);
        });
  }


  saveClient() {
    const data = {
      nom: this.Client.nom,
      prenom: this.Client.prenom,
      email: this.Client.email,
      id_ville: this.Client.id_ville,
    };
    console.log(data);


    this.ClientService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.newClient();
        },
        error => {
          console.log(error);
        });
  }

  newClient() {
    this.submitted = false;
    this.Client = {
      nom: this.Client.nom,
      prenom: this.Client.prenom,
      email: this.Client.email,
      id_ville: this.Client.id_ville,
    };
  }


  async getAllClient() {
    this.ClientService.getAll().subscribe(Clients => {
      this.Clients = Clients['_embedded']['Client'];
      console.log("this.Clients");
      console.log(this.Clients);
      this.Clients.forEach(element => {
        console.log(element.email);
        
      });
      console.log(Clients['_embedded']['Client']);
      //reset champs
      //upload table
    }, err => {
      console.log("err");
      console.log(err);

    }
    );
  }

}
