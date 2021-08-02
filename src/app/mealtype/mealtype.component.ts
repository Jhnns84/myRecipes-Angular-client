import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mealtype',
  templateUrl: './mealtype.component.html',
  styleUrls: ['./mealtype.component.scss']
})
export class MealtypeComponent implements OnInit {

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
