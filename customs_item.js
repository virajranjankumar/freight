var Immutable = require("immutable");
var Flux = require("./Flux");
var Dispatcher = Flux.Dispatcher;
var Utils = require("./utils");

var CustomsItemStore = Immutable.Vector();

var customsItemDispatcher = new Dispatcher();

customsItemDispatcher.register(function(payload) {
	if(payload.actionType === "customs_item-create") {
		CustomsItemStore = CustomsItemStore.push(payload.data);
	}
});

var customs_item = Immutable.Map({
    "id": "",
    "object": "CustomsItem",
    "description": "",
    "quantity": 0,
    "value": 0,
    "weight": 0,
    "hs_tariff_number": "",
    "origin_country": "US",
    "created_at": null,
    "updated_at": null
});

function create_customs_item( description, quantity, value, weight, hs_tariff_number, origin_country) {
	var data = Utils.create_resource( customs_item, {
		description: description,
		quantity: quantity,
		value: value,
		weight: weight,
		hs_tariff_number: hs_tariff_number,
		origin_country: origin_country
	} );
	if(verify_customs_item(data)) {
		customsItemDispatcher.dispatch({
			actionType: "customs_item-create",
			data: data
		})
	} else {
		return new Error("Invalid Customs Item");
	}	
}

function verify_customs_item(a) {
	if(a["object"] !=  "CustomsItem") {
		return false;
	}

	var description = Utils.verify_string(a, "description");
	var quantity = Utils.verify_int(a, "quantity");
	var value = Utils.verify_int(a, "value");
	var weight = Utils.verify_int(a, "weight");
	var tariff = Utils.verify_hs_tariff_number(a);
	var origin_country = Utils.verify_in( all_country_codes, a, "origin_country");
	return description && quantity && value && weight && tariff && origin_country;
}

module.exports = {
	create: create_customs_item,
	store: function() { return CustomsItemStore }
} 