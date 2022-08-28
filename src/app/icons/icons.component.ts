import { Component, OnInit } from '@angular/core';
import { Client } from 'app/classes/client';
import { Mission } from 'app/classes/mission';
import { SousService } from 'app/classes/sous-service';
import { ClientService } from 'app/services/client.service';
import { MissionService } from 'app/services/mission.service';
import { SousServiceService } from 'app/services/sous-service.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {

  Mission : Mission= {
    id:null,
    titre:'', 
    dateMission:'',
    descriptions:'',
    prixMission:'',
    client_id :0,
    service_id:0,
  };
  submitted = false;
  Missions : Mission[];

  category: SousService[];
  clients: Client[];

  constructor(private MissionService: MissionService,
    private _SousService: SousServiceService, 
    private _client: ClientService) { }

  ngOnInit() {
    this.getAllMission();
    this.getSousServices();
    this.getClient();
  }

  showMission(miss : Mission){
    this.Mission = miss;
  }

  deleteMission(id: any) {
    console.log("id");
    console.log(id);

    this.MissionService.delete(id)
      .subscribe(
        response => {
          this.Missions = [];
          this.getAllMission();
          //this.router.navigate(['/user-profile']);
        },
        error => {
          console.log(error);
        });
  }

  getClient() {

    this._client.getAll().subscribe(res => {
      this.clients = res['_embedded']['Client'];
      
      
      
    }, err => {
      console.log("err");
      console.log(err);
    }
    );

  }

  getSousServices() {

    this._SousService.getAll().subscribe(sousService => {
      this.category = sousService['_embedded']['SousService'];
     }, err => {
      console.log("err");
      console.log(err);
    }
    );

  }
  saveMission() {
    const data = {
      titre: this.Mission.titre,
      dateMission: this.Mission.dateMission,
      descriptions: this.Mission.descriptions,
      prixMission: this.Mission.prixMission,
      client_id: this.Mission.client_id,
      service_id: this.Mission.service_id,
    };
    console.log(data);


    this.MissionService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.newMission();
        },
        error => {
          console.log(error);
        });
  }

  newMission() {
    this.submitted = false;
    this.Mission = {
    titre:'', 
    dateMission:'',
    descriptions:'',
    prixMission:'',
    client_id :0,
    service_id:0,
    };
  }


  async getAllMission() {
    this.MissionService.getAll().subscribe(Missions => {
      this.Missions = Missions['_embedded']['Mission'];
      console.log("this.Missions");
      console.log(this.Missions);
      this.Missions.forEach(element => {
        console.log(element.dateMission);
        
      });
      console.log(Missions['_embedded']['Mission']);
      //reset champs
      //upload table
    }, err => {
      console.log("err");
      console.log(err);

    }
    );
  }

}
