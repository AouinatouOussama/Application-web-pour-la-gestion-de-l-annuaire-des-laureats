import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';


import {AuthentificationServices} from '../../services/authentification.services';
import {AvancementServices} from '../../services/avancements.services';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public currentUserSubscription : Subscription;
  public currentUser: any;

  public avancementsListSubscription : Subscription;
  public avancementsList : any[];
  listEtudAccepte : any[];
  listEtudReinscrit: any[];
  public router :Router;


  dataSource: any;

  currentPage: number = 0;
  filiere :string;
  promotion :string;
  secteur :string;
  genre :string;
  province :string;
  organisme :string;
  quota: number;
  users=[];
  avnc={};
  u={};
  avancementDetail = null;


  constructor(public authentificationServices:AuthentificationServices, public avancementServices : AvancementServices) {

        //this.authentificationServices.emit();
        this.currentUserSubscription = this.authentificationServices.currentAuthentified$.subscribe(data => {
          this.currentUser = data;
          console.log(data);


        });
    this.authentificationServices.emit();


  }

  ngOnInit() {

    this.avancementsListSubscription = this.avancementServices.getAvancements().subscribe(
          (avancementsImported: any[]) => {
            console.log(avancementsImported)
            this.avancementsList = (avancementsImported as any).features;


            for(let i =0; i<this.avancementsList.length; i++){
              var res = this.users.filter(data => (data.id == this.avancementsList[i].id));
              console.log(res)
              if(res.length ==0){
                console.log('entreee')
               this.avnc={'datetraitement':this.avancementsList[i].datetraitement,
                      'motif':this.avancementsList[i].motif,
                      'refutilisateur':this.avancementsList[i].refutilisateur
                    }
               this.u={'id':this.avancementsList[i].id,
                      'nom':this.avancementsList[i].nom,
                      'avnc':this.avnc}
               this.users.push(this.u);
              }else{
                //list.splice( list.indexOf('foo'), 1 );

              }
              this.avancementsList[i]["detailAffiche"] = false;
              this.avancementsList[i]["editionAffiche"] = false;
              this.avancementsList[i]["historiqueAffiche"] = false;

            }
            //console.log(avancementsImported);
            console.log('users',this.users );
          }
        );

    this.genre=""; this.filiere=""; this.province=""; this.organisme=""; this.secteur=""; this.promotion="";this.quota=2;

    this.getListAccepter();
    this.getListReinscrit();
  }



  editer(avancement){


    if(avancement.editionAffiche == false){

      avancement.detailAffiche = false;
      avancement.editionAffiche = true;
      avancement.historiqueAffiche = false;


    }
    else{

      avancement.detailAffiche = false;
      avancement.editionAffiche = false;
      avancement.historiqueAffiche = false;



    }


  }

  historique(avancement){

    if(avancement.historiqueAffiche == false){

      avancement.editionAffiche = false;
      avancement.detailAffiche = false;
      avancement.historiqueAffiche = true;

    }
    else{

      avancement.historiqueAffiche = false;
      avancement.detailAffiche = false;
      avancement.editionAffiche = false;


    }




  }

  detail(avancement){

    if(avancement.detailAffiche == false){

      avancement.editionAffiche = false;
      avancement.detailAffiche = true;
      avancement.historiqueAffiche = false;


    }
    else{

      avancement.detailAffiche = false;
      avancement.editionAffiche = false;
      avancement.historiqueAffiche = false;



    }


  }

  getListAccepter(){
    this.avancementServices.getListAccepter().subscribe(
      (data: any[]) => {
        this.listEtudAccepte = (data as any).features;
      });
  }

  getListReinscrit(){
    this.avancementServices.getListReinscrit().subscribe(
      (data: any[]) => {
        this.listEtudReinscrit = (data as any).features;
      });
  }


}
