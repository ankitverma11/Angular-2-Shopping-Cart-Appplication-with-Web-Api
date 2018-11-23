"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var CartItemDetails_1 = require("../model/CartItemDetails");
var shoppingComponent = /** @class */ (function () {
    //Inital Load
    function shoppingComponent(http) {
        this.http = http;
        //Declare Variables to be used
        //To get the WEb api Item details to be displayed for shopping
        this.ShoppingDetails = [];
        //Show the Table row for Items,Cart  and Cart Items.
        this.showDetailsTable = true;
        this.AddItemsTable = false;
        this.CartDetailsTable = false;
        this.cartDetails = [];
        this.ImageUrl = require("./Images/CD.png");
        this.cartImageUrl = require("./Images/shopping_cart64.png");
        this.ItemName = "";
        this.ItemPrice = 0;
        this.Imagename = "";
        this.ImagePath = "";
        this.Descrip = "";
        this.txtAddedBy = "";
        this.Qty = 0;
        //For calculate Total Price,Qty and Grand Total price
        this.totalPrice = 0;
        this.totalQty = 0;
        this.GrandtotalPrice = 0;
        this.totalItem = 0;
        this.myName = "Shanu";
        this.showDetailsTable = true;
        this.AddItemsTable = false;
        this.CartDetailsTable = false;
        this.getShoppingDetails('');
    }
    //Get all the Item Details and Item Details by Item name
    shoppingComponent.prototype.getShoppingDetails = function (newItemName) {
        var _this = this;
        if (newItemName == "") {
            this.http.get('/api/ItemDetailsAPI/Details').subscribe(function (result) {
                _this.ShoppingDetails = result.json();
            });
        }
        else {
            this.http.get('/api/ItemDetailsAPI/Details/' + newItemName).subscribe(function (result) {
                _this.ShoppingDetails = result.json();
            });
        }
    };
    //Get Image Name to bind
    shoppingComponent.prototype.getImagename = function (newImage) {
        this.ImageUrl = require("./Images/" + newImage);
    };
    // Show the Selected Item to Cart for add to my cart Items.
    shoppingComponent.prototype.showToCart = function (Id, Name, Price, IMGNM, Desc, user) {
        this.showDetailsTable = true;
        this.AddItemsTable = true;
        this.CartDetailsTable = false;
        this.ItemID = Id;
        this.ItemName = Name;
        this.ItemPrice = Price;
        this.Imagename = require("./Images/" + IMGNM);
        this.ImagePath = IMGNM;
        this.Descrip = Desc;
        this.txtAddedBy = user;
    };
    // to Show Items to be added in cart
    shoppingComponent.prototype.showCart = function () {
        this.showDetailsTable = false;
        this.AddItemsTable = true;
        this.CartDetailsTable = true;
        this.addItemstoCart();
    };
    // to show all item details
    shoppingComponent.prototype.showItems = function () {
        this.showDetailsTable = true;
        this.AddItemsTable = false;
        this.CartDetailsTable = false;
    };
    //to Show our Shopping Items details
    shoppingComponent.prototype.showShoppingItems = function () {
        if (this.cartDetails.length <= 0) {
            alert("Ther is no Items In your Cart.Add Items to view your Cart Details !");
            return;
        }
        this.showDetailsTable = false;
        this.AddItemsTable = false;
        this.CartDetailsTable = true;
    };
    //Check the Item already exists in Cart,If the Item is exist then add only the quantity else add selected item to cart.
    shoppingComponent.prototype.addItemstoCart = function () {
        var count = 0;
        var ItemCountExist = 0;
        this.totalItem = this.cartDetails.length;
        if (this.cartDetails.length > 0) {
            for (count = 0; count < this.cartDetails.length; count++) {
                if (this.cartDetails[count].CItem_Name == this.ItemName) {
                    ItemCountExist = this.cartDetails[count].CQty + 1;
                    this.cartDetails[count].CQty = ItemCountExist;
                }
            }
        }
        if (ItemCountExist <= 0) {
            this.cartDetails.push(new CartItemDetails_1.CartItemDetails(this.ItemID, this.ItemName, this.ImagePath, this.Descrip, this.txtAddedBy, this.ItemPrice, 1, this.ItemPrice));
        }
        this.getItemTotalresult();
    };
    //to calculate and display the total price information in Shopping cart.
    shoppingComponent.prototype.getItemTotalresult = function () {
        this.totalPrice = 0;
        this.totalQty = 0;
        this.GrandtotalPrice = 0;
        var count = 0;
        this.totalItem = this.cartDetails.length;
        for (count = 0; count < this.cartDetails.length; count++) {
            this.totalPrice += this.cartDetails[count].CItem_Price;
            this.totalQty += (this.cartDetails[count].CQty);
            this.GrandtotalPrice += this.cartDetails[count].CItem_Price * this.cartDetails[count].CQty;
        }
    };
    //remove the selected item from the cart.
    shoppingComponent.prototype.removeFromCart = function (removeIndex) {
        alert(removeIndex);
        this.cartDetails.splice(removeIndex, 1);
        this.getItemTotalresult();
    };
    shoppingComponent = __decorate([
        core_1.Component({
            selector: 'shopping',
            template: require('./shopping.component.html')
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], shoppingComponent);
    return shoppingComponent;
}());
exports.shoppingComponent = shoppingComponent;
//# sourceMappingURL=shopping.component.js.map