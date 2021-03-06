import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cuisine',
  templateUrl: './cuisine.component.html',
  styleUrls: ['./cuisine.component.scss']
})
export class CuisineComponent implements OnInit {

    /**
   * This takes the data from the recipe-card component
   * @param data 
   */
  constructor(

    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      description: string;
    }
  ) { }

  ngOnInit(): void {
  }

}