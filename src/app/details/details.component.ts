import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  /**
   * This takes the data from the recipe-card component
   * @param data 
   */
  constructor(

    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      imagePath: string;
      description: string;
      difficulty: string;
      time: string;
    }
  ) { }

  ngOnInit(): void {
  }

}
