import { Component, OnInit } from '@angular/core';
import { ForeignService } from '../foreign.service';
import { SharedService } from "../shared.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {

  public foodList: any = [];
  public pageNumber: number = 1;
  public showLoader: boolean = false;

  constructor(private _foreignService: ForeignService,private _sharedService: SharedService,private router: Router) { }

  ngOnInit() {
    this.getFoodList();
  }

  getFoodList() {
    this.showLoader = true;
    this._foreignService.getDishPics(this.pageNumber).subscribe(result => {
      this.foodList = result.photos.photo;
      this.showLoader = false;
    })
  }

  getImageUrl(food:any): string {
    return this._foreignService.formFlickrData(food);
  }

  checkAlreadyReviewed(id:string): number {
    return this._sharedService.getInitialStars(id);
  }

  foodSelected(food:any) {
    this._sharedService.updateChosenFood(food);
    this.router.navigate(['/item']);
  }

}
