import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AuthentificationServices} from '../../services/authentification.services';
import {OrganismesServices} from '../../services/organismes.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-aboud',
  templateUrl: './aboud.component.html',
  styleUrls: ['./aboud.component.css']
})
export class AboudComponent implements OnInit {
  organismes: any;
  displayedColumns: string[] = ['id', 'nom', 'secteur', 'province','longitude','latitude','statut','action'];
  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    console.log(this.organismes);
    this.getListOrganismes();
  }

  accepter(element){
    console.log(element)
    let requete = "http://localhost:9090/requestAny/update%20nv_orga%20set%20statut%20='accepté'%20where%20id="+element.id;
    this.httpClient.get(requete).subscribe(data => {
      this.organismes = (data as any).features;
    });
    this.ajouterNouveauOrg(element);
    this.getListOrganismes();
  }

  refuser(element){
    console.log(element)
    let requete = "http://localhost:9090/requestAny/update%20nv_orga%20set%20statut%20='refusé'%20where%20id="+element.id;
    this.httpClient.get(requete).subscribe(data => {
      this.organismes = (data as any).features;

    },err=>{
      alert('L organisme est refusé')
    });
    this.getListOrganismes();
  }

  getListOrganismes(){
    let requete = "http://localhost:9090/requestAny/select%20*%20from%20nv_orga";
    this.httpClient.get(requete).subscribe(data => {
        this.organismes = (data as any).features;
  });
  }

  ajouterNouveauOrg(organisme){
    let requete = "http://localhost:9090/requestAny/Insert%20into%20organisme%20(nomorganisme,secteur,long,lat,province)%20values%20('"+ organisme.nom +"',%20'"+ organisme.secteur +"',%20"+ organisme.longitude +",%20"+ organisme.latitude +",%20'"+ organisme.province +"')";
    this.httpClient.get(requete).subscribe(data => {
      alert('L organisme est bien ajouté')
    },err=>{
      alert('L organisme est bien ajouté')
    });
  }

}
