import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Laureat} from '../Model/model.laureat';
import {Subject} from 'rxjs';
import {assertNumber} from '@angular/core/src/render3/assert';



@Injectable()
export class AvancementServices {

  private avancementsList: any[] = [];
  avancementsList$ = new Subject<any[]>();


  constructor(public httpClient: HttpClient) {

    this.getAvancements();
    this.emitList();


  }

  //permet d'indiquer qu'une mise à jour au niveau du service est necessaire
  emitList() {
    this.avancementsList$.next(this.avancementsList);
    console.log(this.avancementsList);
  }


  //permet de récupérer le dernier avancement de chaque personne
  getAvancements(){
    console.log('TestOOOO')
     return this.httpClient.get("http://localhost:9090/requestAny/select%20distinct U.nom ,  U.id,U.prenom, U.genre ,U.telephone  , U.email,U.promotion ,U.filiere ,photo ,U.secteur , U.province ,U.dateinscription ,U.description%20from%20utilisateur%20as%20U,%20avancement,organisme%20" +
     "where%20U.id%20=%20avancement.refutilisateur%20" +
     "and%20U.reforganisme=organisme.id%20" +
     "and%20datetraitement%20is%20not%20null%20 and avancement.etat='inscrit'" +
     "and%20datetraitement%20%3E=%20" +
         "(select%20datetraitement%20" +
         "from%20utilisateur,%20avancement%20" +
         "where%20utilisateur.id%20=%20avancement.refutilisateur%20" +
         "and%20utilisateur.id%20=%20U.id%20" +
         "order%20by%20datetraitement%20desc%20limit%201)");

  }

  getListAccepter(){
    console.log('TestOOOO')
     return this.httpClient.get("http://localhost:9090/requestAny/select%20distinct U.nom ,  U.id,U.prenom, U.genre ,U.telephone  , U.email,U.promotion ,U.filiere ,photo ,U.secteur , U.province ,U.dateinscription ,U.description%20from%20utilisateur%20as%20U,%20avancement,organisme%20" +
     "where%20U.id%20=%20avancement.refutilisateur%20" +
     "and%20U.reforganisme=organisme.id%20" +
     "and%20datetraitement%20is%20not%20null%20 and avancement.etat='accepté'" +
     "and%20datetraitement%20%3E=%20" +
         "(select%20datetraitement%20" +
         "from%20utilisateur,%20avancement%20" +
         "where%20utilisateur.id%20=%20avancement.refutilisateur%20" +
         "and%20utilisateur.id%20=%20U.id%20" +
         "order%20by%20datetraitement%20desc%20limit%201)");

  }

  getListReinscrit(){
    return this.httpClient.get("http://localhost:9090/requestAny/select%20distinct U.nom ,  U.id,U.prenom, U.genre ,U.telephone  , U.email,U.promotion ,U.filiere ,photo ,U.secteur , U.province ,U.dateinscription ,U.description%20from%20utilisateur%20as%20U,%20avancement,organisme%20" +
     "where%20U.id%20=%20avancement.refutilisateur%20" +
     "and%20U.reforganisme=organisme.id%20" +
     "and%20datetraitement%20is%20not%20null%20 and avancement.etat='réinscrit'" +
     "and%20datetraitement%20%3E=%20" +
         "(select%20datetraitement%20" +
         "from%20utilisateur,%20avancement%20" +
         "where%20utilisateur.id%20=%20avancement.refutilisateur%20" +
         "and%20utilisateur.id%20=%20U.id%20" +
         "order%20by%20datetraitement%20desc%20limit%201)");
  }


  


  getHistoriqueAvancementById(id){

    return this.httpClient.get("http://localhost:9090/requestAny/select%20*%20" +
      "from%20utilisateur,%20avancement%20" +
      "where%20utilisateur.id%20=%20avancement.refutilisateur%20" +
      "and%20utilisateur.id%20=%20" + id.toString() + "%20" +
      "order%20by%20datetraitement%20desc");

  }



}
