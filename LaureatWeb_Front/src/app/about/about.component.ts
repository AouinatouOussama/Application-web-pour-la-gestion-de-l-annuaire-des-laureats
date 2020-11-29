import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';


import {AuthentificationServices} from '../../services/authentification.services';
import {OrganismesServices} from '../../services/organismes.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

} 