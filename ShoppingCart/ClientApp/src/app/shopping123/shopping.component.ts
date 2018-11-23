//In students.component.ts file, we have three parts - //import part //component part //class for writing our business logic.

//import part
//First, import Angular files to be used in our component; here, we import HTTP for using HTTP client in our Angular 2 component. 
import { Component, Injectable, Inject, EventEmitter, Input, Output, OnInit, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions } from '@angular/http';
import { ItemDetails } from '../model/ItemDetails';
import { CartItemDetails } from '../model/CartItemDetails';

//In component, we have selector and template. Selector is to give a name for this app and in our HTML file, we can use this selector name to display in our HTML page.
//In template.give your output html file name.
//component part
@Component({
  selector: 'shooping',
  template: require('./shopping.component.html')
})

//Export Class is the main class where we perform all our business logic and variable declaration to be used in our component template.
//In this class, we get the API method result and bind the result to the student array.

export class shoppingComponent {


//Declare Variables to be used  

//To get the WEb api Item details to be displayed for shopping

  public ShoppingDetails: ItemDetails[] = [];
  myName: string;

 //Show the Table row for Items,Cart  and Cart Items.
  showDetailsTable: Boolean = true;
  AddItemsTable: Boolean = false;
  CartDetailsTable: Boolean = false; 
  public cartDetails: CartItemDetails[] = [];

  public ImageURL = require("./images/CD.png");
  public cartImageUrl = require("./images/HDD.png");

  //For display Item details and Cart Detail items  
  public ItemID: number;
  public ItemName: string = "";
  public ItemPrice: number = 0;
  public Imagename: string = "";
  public ImagePath: string = "";
  public Descrip: string = "";
  public txtAddedBy: string = "";
  public Qty: number = 0;   

  //For calculate Total Price,Qty and Grand Total price
  public totalPrice: number = 0;
  public totalQty: number = 0;
  public GrandtotalPrice: number = 0;

  public totalItem: number = 0;

  //Inital Load
  constructor(public http: Http) {
    this.myName = "Ankit";
    this.showDetailsTable = true;
    this.AddItemsTable = false;
    this.CartDetailsTable = false;
    this.getShoppingDetails('');
  }

  //Get all the Item Details and Item Details by Item name  
  getShoppingDetails(newItemName) {
    if (newItemName == "") {
      this.http.get('/api/ItemDetailsAPI/Details').subscribe(result => {
        this.ShoppingDetails = result.json()
      });
    }
    else {
      this.http.get('/api/ItemDetailsAPI/Details/' + newItemName).subscribe(result => {
        this.ShoppingDetails = result.json()
      });
    }
  }

  //Get Image Name to bind  
  getImagename(newImage) {
    this.ImageURL = require("./Images/" + newImage);
  }

  // Show the Selected Item to Cart for add to my cart Items.  
  showToCart(Id, Name, Price, IMGNM, Desc, user) {
    this.showDetailsTable = true;
    this.AddItemsTable = true;
    this.CartDetailsTable = false;
    this.ItemID = Id;
    this.ItemName = Name;
    this.ItemPrice = Price;
    this.Imagename = require("./Images/" + IMGNM);
    this.ImagePath = IMGNM
    this.Descrip = Desc;
    this.txtAddedBy = user;
  }

  // to Show Items to be added in cart  
  showCart() {
    this.showDetailsTable = false;
    this.AddItemsTable = true;
    this.CartDetailsTable = true;
    this.addItemstoCart();
  }

  //Check the Item already exists in Cart,If the Item is exist then add only the quantity else add selected item to cart.  
  addItemstoCart() {
    var count: number = 0;
    var itemCountExists: number = 0;
    this.totalItem = this.cartDetails.length;
    if (this.cartDetails.length > 0) {
      for (count = 0; count < this.cartDetails.length; count++) {
        if (this.cartDetails[count].CItem_Name == this.ItemName) {
          itemCountExists = this.cartDetails[count].CQty + 1;
          this.cartDetails[count].CQty = itemCountExists;
        }
      }  
    }
    if (itemCountExists <= 0) {
      this.cartDetails.push(
        new CartItemDetails(this.ItemID, this.ItemName, this.ImagePath, this.Descrip, this.txtAddedBy, this.ItemPrice, 1, this.ItemPrice));
    }
    this.getItemTotalresult();
  }

  //to calculate and display the total price information in Shopping cart.
  getItemTotalresult() {
    this.totalPrice = 0;
    this.totalQty = 0;
    this.GrandtotalPrice = 0;
    var count: number = 0;
    this.totalItem = this.cartDetails.length;
    for (count = 0; count < this.cartDetails.length; count++) {
      this.totalPrice += this.cartDetails[count].CItem_Price;
      this.totalQty += this.cartDetails[count].CQty;
      this.GrandtotalPrice += this.cartDetails[count].CItem_Price * this.cartDetails[count].CQty;
    }
  }

  // to show all item details  
  showItems() {
    this.showDetailsTable = true;
    this.AddItemsTable = false;
    this.CartDetailsTable = false;
    this.CartDetailsTable = false;
  }

  //to Show our Shopping Items details  

  showShoppingItems() {
    if (this.cartDetails.length <= 0) {
      alert("Ther is no Items In your Cart.Add Items to view your Cart Details !")
      return;
    }
    this.showDetailsTable = false;
    this.AddItemsTable = false;
    this.CartDetailsTable = true;
  }

}
