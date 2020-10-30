import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  initial = 0;
  page = 0; // Always 1 value less than the actual value
  pagelimit = 10;
  end = this.pagelimit;
  lastpage = 0;
  pagebuttons = [];
  originalcomments = [];
  comments = [];
  showpage = false;

  constructor(private api: ApiService) {
    console.log('constructor');
    this.api.get('comments').subscribe(
      (data: any[]) => {
        console.log(data);
        this.comments = data;
        this.originalcomments = data;
        console.log('request');
        this.findlastpage();
        this.generatePageButtons();
      }
    );

    this.api.get('posts').subscribe(
      (data: any[]) => {
        console.log(data);
      }
    );
    this.api.get('photos').subscribe(
      (data: any[]) => {
        console.log(data);
      }
    );

  }


  ngOnInit() {
    console.log('ngOnInit');
  }
  // Leftmostpage() {
  //   this.initial = 0;
  //   this.end = 10;
  // }
  generatePageButtons() {
    this.pagebuttons = [];
    for (let i = 0; i <= this.lastpage; i++) {
      if (i <= (this.page + 2) && i >= (this.page - 2)) {
        this.pagebuttons.push(i + 1);
      }
    }
  }

  setPage(page: number) {
    this.page = page;
    this.initial = page * this.pagelimit;
    this.end = this.initial + this.pagelimit;
    // this.end = this.initial + this.lastpage;
    console.log(this.initial + ' , ' + this.end);
    // this.showpage = !this.showpage;
    this.generatePageButtons();

  }
  changepagelimit() {
    // console.log(event.target['value']);
    // this.pagelimit = event.target['value'];

    this.findlastpage;
    // this.setPage(0);
    this.setPage(0);
  }
  findlastpage() {
    this.lastpage = (this.comments.length / this.pagelimit) - 1;
    // alert(this.lastpage);
  }

  searchdata(event) {

    // for (let j = 0; j = this.c.length; j++) {
    //   console.log(this.originalcomments[j]);
    // }
    // // this.comments = this.originalcomments;
    // // console.log(this.comments);
    console.log(event.target.value);
    let searchString = event.target.value;
    let filteredData = [];
    let searchRegexp = new RegExp(searchString.toUpperCase());
    for (let data of this.originalcomments) {
      // console.log(data);
      let commentKeys = Object.keys(data);
      // console.log(commentKeys);
      let isMatch = false
      for (let commentKey of commentKeys) {
        // console.log(String(data[commentKey]));
        let eachCell = String(data[commentKey]);
        if (searchRegexp.test(eachCell.toUpperCase())) {
          isMatch = true
        }
      }
      if (isMatch) {
        filteredData.push(data);
      }
    }
    this.comments = filteredData;
    this.findlastpage();
    this.generatePageButtons();
    this.setPage(0);
  }

  downloadExcel() {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.comments);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Suganya_Sheet_1');

    /* save to file */
    XLSX.writeFile(wb, 'Suganya_File.xlsx');
  }

  // Firstpage()
  // {
  //   this.initial=this.initial;
  //   this.end=this.end;
  // }
  // Secondpage()
  // {
  //   this.initial=this.initial+10;
  //   this.end=this.end+10;
  // }
  // Thirdpage()
  // {
  //   this.initial=this.initial+20;
  //   this.end=this.end+20;
  // }
  // Fourthpage()
  // {
  //   this.initial=this.initial+30;
  //   this.end=this.end+30;
  // }
  // Fifthpage()
  // {
  //   this.initial=this.initial+40;
  //   this.end=this.end+30;
  // }
  // Previouspage() {
  //   this.initial = this.initial - 10;
  //   this.end = this.end - 10;
  // }
  // Nextpage() {
  //   this.initial = this.initial + 10;
  //   this.end = this.end + 10;
  // }
  // Lastpage() {
  // this.initial = 490;
  // this.end = 500;
  // }
}
