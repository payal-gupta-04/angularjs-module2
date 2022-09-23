(function() {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
		.controller('ToBuyController', ToBuyController)
		.controller('AlreadyBoughtController', AlreadyBoughtController)
		.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService) {
		var list = this;
		list.items = ShoppingListCheckOffService.getToBuyItems();

		list.removeItem = function(itemIndex) {
			try {
				ShoppingListCheckOffService.removeItem(itemIndex);
			} catch (error) {
				list.errorMessage = error.message;
			}
		};
	}

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService) {
		var list = this;
		list.errorMessage = "Nothing bought yet.";
		list.items = ShoppingListCheckOffService.getBoughtItems();
	}

	function ShoppingListCheckOffService() {
		var service = this;
		// Empty list of bought items.
		var boughtItems = [];

		// Pre-populated list of "To Buy items".
		var toBuyItems = [
			{ "name": "Cookies", "quantity": 5 },
			{ "name": "Chips", "quantity": 10 },
			{ "name": "Chocolates", "quantity": 20 },
			{ "name": "Pastry", "quantity": 12 },
			{ "name": "Wafers", "quantity": 25 }
		];

		service.removeItem = function(itemIndex) {
			if (toBuyItems.length > 0) {
				var toRemoveItem = toBuyItems[itemIndex];
				boughtItems.push(toRemoveItem);
				toBuyItems.splice(itemIndex, 1);
			}

			if (toBuyItems.length == 0) {
				throw new Error("Everything is bought!");
			}
		};

		service.getToBuyItems = function() {
			return toBuyItems;
		};
		service.getBoughtItems = function() {
			return boughtItems;
		};
	}
})();