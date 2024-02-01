"use strict";

const EmptyCartException = require("./EmptyCartException.js");
const UpdateCartException = require("./UpdateCartException.js");

module.exports = class Cart {

    //region private attributes
    _items = [];
    //endregion private attributes

    //region public methods
    constructor(expectedItems) {
        this._items = expectedItems;
    }

    get items() {
        this.CheckValidItems(this._items)
        return this._items;
    }

    get total() {
        this.CheckValidItems(this._items)
        let total = 0;
        for (let i = 0; i < this._items.length; i++) {
            total += this._items[i].total;
        }
        return total;
    }

    count(distinct = false) {
        if (distinct) {
            return this.CountDistinctItems();
        }
        return this.CountQuantityAllItems();

    }

    add(cartItem) {
        this.CheckValidItem(cartItem)
        if (!this._items) {
            this._items = [];
        }
        this._items.push(...cartItem);


    }

    //endregion public methods

    //region private methods

    CheckValidItems(items) {
        // check if is array of CartItem
        if (!Array.isArray(items)){
            throw new EmptyCartException();
        }
        for (let i = 0; i < items.length; i++) {
            if (items[i] === null || items[i] === undefined) {
                throw new EmptyCartException();
            }
        }
    }

    CheckValidItem(item) {
        if (item === null || item === undefined) {
            throw new UpdateCartException();
        }
    }

    CountDistinctItems() {
        this.CheckValidItems(this._items)
        return this._items.length;
    }

    CountQuantityAllItems() {
        this.CheckValidItems(this._items)
        return this._items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);

    }

    //endregion private methods
}