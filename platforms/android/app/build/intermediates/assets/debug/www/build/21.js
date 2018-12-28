webpackJsonp([21],{

/***/ 1224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasicPage", function() { return BasicPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SliderPageModule", function() { return SliderPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__slider__ = __webpack_require__(306);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var BasicPage = (function () {
    function BasicPage() {
        this.slides = [
            {
                title: "Welcome to the Docs!",
                description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
                image: "assets/img/ica-slidebox-img-1.png",
            },
            {
                title: "What is Ionic?",
                description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
                image: "assets/img/ica-slidebox-img-2.png",
            },
            {
                title: "What is Ionic Cloud?",
                description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
                image: "assets/img/ica-slidebox-img-3.png",
            }
        ];
    }
    BasicPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/desarrollo/Escritorio/gevents/appPrueba/geventsapplication/src/pages/slider/slider.html"*/'<!--\n\n  Generated template for the SliderPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n\n\n\n\n\n\n<ion-content padding class="backgroundSlide">\n\n\n\n  <ion-slides pager>\n\n\n\n    <ion-slide class="swiper-slide swiper-slide-active slideBackground" style="width: 320px;">\n\n      <div class="slide-zoom">\n\n        <ion-toolbar class="toolbar toolbar-ios statusbar-padding">\n\n          <div class="toolbar-background toolbar-background-ios"></div>\n\n          <ion-buttons end="" class="bar-buttons bar-buttons-ios">\n\n            <button color="primary" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios bar-button-ios-primary"\n\n              (click)="goToLogin()">\n\n              <span class="button-inner skipColor">Omitir</span>\n\n              <div class="button-effect"></div>\n\n            </button>\n\n          </ion-buttons>\n\n          <div class="toolbar-content toolbar-content-ios">\n\n\n\n          </div>\n\n        </ion-toolbar>\n\n\n\n        <h2 class="slide-title animated fadeInUp tittleWelcome">\n\n          {{ \'welcome\' | translate }}\n\n        </h2>\n\n\n\n        <div class="lineSlider"></div>\n\n        <p class="paragraph">\n\n          <b class="capitalize"> {{ app_instance?.name }} </b>\n\n          <br> Te da la bienvenida a nuestra Aplicación </p>\n\n        <img class="slide-image animated bounceIn ImgPhone" src="assets/img/slide1.png">\n\n      </div>\n\n    </ion-slide>\n\n\n\n\n\n    <ion-slide class="swiper-slide swiper-slide-active slideBackground" style="width: 320px;">\n\n      <div class="slide-zoom">\n\n        <ion-toolbar class="toolbar toolbar-ios statusbar-padding">\n\n          <div class="toolbar-background toolbar-background-ios"></div>\n\n          <ion-buttons end="" class="bar-buttons bar-buttons-ios">\n\n            <button color="primary" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios bar-button-ios-primary"\n\n              (click)="goToLogin()">\n\n              <span class="button-inner skipColor">Omitir</span>\n\n              <div class="button-effect"></div>\n\n            </button>\n\n          </ion-buttons>\n\n          <div class="toolbar-content toolbar-content-ios">\n\n\n\n          </div>\n\n        </ion-toolbar>\n\n\n\n        <h2 class="slide-title animated fadeInUp tittleWelcome">Nuestra App</h2>\n\n        <div class="lineSlider"></div>\n\n        <p class="paragraph">\n\n          <b> Te ayudará </b>\n\n          <br> a ser parte de nuestro evento. </p>\n\n        <img class="slide-image animated bounceIn ImgPhone" src="assets/img/slide1.png">\n\n      </div>\n\n    </ion-slide>\n\n\n\n\n\n\n\n    <ion-slide class="swiper-slide swiper-slide-active slideBackground" style="width: 320px;">\n\n      <div class="slide-zoom">\n\n        <ion-toolbar class="toolbar toolbar-ios statusbar-padding">\n\n          <div class="toolbar-background toolbar-background-ios"></div>\n\n          <ion-buttons end="" class="bar-buttons bar-buttons-ios">\n\n            <button color="primary" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios bar-button-ios-primary">\n\n              <span class="button-inner skipColor"></span>\n\n              <div class="button-effect"></div>\n\n            </button>\n\n          </ion-buttons>\n\n          <div class="toolbar-content toolbar-content-ios">\n\n\n\n          </div>\n\n        </ion-toolbar>\n\n\n\n        <h2 class="slide-title animated fadeInUp tittleWelcome">¿Estás listo?</h2>\n\n        <div class="lineSlider"></div>\n\n\n\n        <button (click)="goToLogin()" clear="" color="primary" icon-end="" ion-button="" large="" class="disable-hover button button-ios button-clear button-clear-ios button-large button-large-ios button-clear-ios-primary ">\n\n          <span class="button-inner paragraph ">\n\n            Continuar\n\n            <i class="demo-icon  icon-geventsright-open placeholder-icon " style="padding-top: 5px;">&#xe850;</i>\n\n            <!--   <ion-icon name="arrow-forward" role="img" class="icon icon-ios ion-ios-arrow-forward" aria-label="arrow forward"></ion-icon> -->\n\n          </span>\n\n          <div class="button-effect"></div>\n\n        </button>\n\n\n\n\n\n\n\n        <img class="slide-image animated bounceIn ImgPhone" src="assets/img/slide1.png">\n\n\n\n\n\n      </div>\n\n    </ion-slide>\n\n\n\n  </ion-slides>\n\n\n\n</ion-content>\n\n\n\n\n\n\n\n<!-- <ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Slides</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="tutorial-page">\n\n\n\n  <ion-slides pager>\n\n    <ion-slide *ngFor="let slide of slides">\n\n      <ion-toolbar>\n\n        <ion-buttons end>\n\n          <button ion-button color="primary">Skip</button>\n\n        </ion-buttons>\n\n      </ion-toolbar>\n\n      <img [src]="slide.image" class="slide-image"/>\n\n      <h2 class="slide-title" [innerHTML]="slide.title"></h2>\n\n      <p [innerHTML]="slide.description"></p>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n      <ion-toolbar>\n\n      </ion-toolbar>\n\n      <img src="assets/img/ica-slidebox-img-4.png" class="slide-image"/>\n\n      <h2 class="slide-title">Ready to Play?</h2>\n\n      <button ion-button large clear icon-end color="primary">\n\n        Continue\n\n        <ion-icon name="arrow-forward"></ion-icon>\n\n      </button>\n\n    </ion-slide>\n\n  </ion-slides>\n\n</ion-content> -->'/*ion-inline-end:"/home/desarrollo/Escritorio/gevents/appPrueba/geventsapplication/src/pages/slider/slider.html"*/
        })
    ], BasicPage);
    return BasicPage;
}());

var SliderPageModule = (function () {
    function SliderPageModule() {
    }
    SliderPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__slider__["a" /* SliderPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__slider__["a" /* SliderPage */]),
            ],
        })
    ], SliderPageModule);
    return SliderPageModule;
}());

//# sourceMappingURL=slider.module.js.map

/***/ })

});
//# sourceMappingURL=21.js.map