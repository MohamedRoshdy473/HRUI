import { Directionality } from '@angular/cdk/bidi';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'HR';
  direction = '';

  public textDir;
  lang = sessionStorage.getItem("lang");


  // constructor(dir: Directionality) {
  //   console.log(dir.value);

  //   dir.change.subscribe((changes) => {
  //     console.log(changes)
  //   });
  // }
  constructor(public translate: TranslateService, public dir: Directionality) {
    // console.log(dir.value);

    // translate.addLangs(['English', 'العربية']);
    // translate.setDefaultLang('العربية');
    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/English|العربية/) ? browserLang : 'العربية');


    //this.lang = sessionStorage.getItem("lang");
    console.log("session", this.lang);

  }

  changeDir($event) {
    debugger;
    console.log("$event.target.value",$event.target.value);
    // this.translate.use($event.target.value);
    sessionStorage.setItem("lang", $event.target.value);


    if ($event.target.value === 'English') {
      localStorage.setItem('dir', 'ltr');
    }
    if ($event.target.value === 'العربية') {
      localStorage.setItem('dir', 'rtl');
    }

console.log("test",this.dir)
  }

  ngOnInit(): void {
    // if(this.lang === "العربية"){
    //   this.textDir = 'rtl';
    // }
    // if(this.lang === "English") 
    // {
    //   this.textDir = 'ltr';
    // }
    // console.log("textDir",this.textDir); 

    // this.textDir = localStorage.getItem("dir");
  }
}
