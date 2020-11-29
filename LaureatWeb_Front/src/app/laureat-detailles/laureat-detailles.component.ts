import { Component, OnInit,Input } from '@angular/core';
import {AvancementServices} from '../../services/avancements.services';
import {Subscription} from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'laureat-detailles',
  templateUrl: './laureat-detailles.component.html',
  styleUrls: ['./laureat-detailles.component.css']
})
export class LaureatDetaillesComponent implements OnInit {

  organismes: any;
  displayedColumns: string[] = [ 'id_index',  'ref_organisation',  'date_debut',  'intitule_de_poste'];

  @Input() dernierAvancement;



  constructor(private httpClient: HttpClient) {
    //this.getOrgaDetails();


  }

  getOrgaDetails(){
    let requete = "http://localhost:9090/requestAny/select * from laureat_org_association where ref_laureat="+this.dernierAvancement.id;
    this.httpClient.get(requete).subscribe(data => {
      this.organismes = (data as any).features;
    });
  }

  ngOnInit() {
    console.log(this.dernierAvancement);
    this.getOrgaDetails();
  }

}
