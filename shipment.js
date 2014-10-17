var Immutable = require("immutable");
var Flux = require("./Flux");
var Dispatcher = Flux.Dispatcher;
var Utils = require("./utils");

var ShipmentStore = Immutable.Vector();

var shipmentDispatcher = new Dispatcher();

shipmentDispatcher.register(function(payload) {
	if(payload.actionType === "shipment-create") {
		ShipmentStore = ShipmentStore.push(payload.data);
	}
})

var shipment = Immutable.Map({
	"id": "",
	"object": "Shipment",
	"mode": "test",
	"to_address": null,
	"from_address": null,
	"parcel": null,
	"customs_info": null,
	"rates": [],
	"scan_form": null,
	"selected_rate": null,
	"postage_label": null,
	"return_label": null,
	"tracking_code": "",
	"reference": "",
	"refund_status": "",
	"insurance": 0.0,
	"batch_status": "",
	"batch_message": "",
	"created_at": null,
	"updated_at": null,
	"options": null
});

function create_shipment(a) {
	create_shipment_from_field(a.to_address, a.from_address, a.parcel, a.customs_info);
}

function create_shipment_from_field(to_address, from_address, parcel, customs_info) {
	var data = Utils.create_resource(shipment,{
		"to_address": to_address,
		"from_address": from_address,
		"parcel": parcel,
		"customs_info": customs_info
	});
	if(verify_shipment(data)) {
		shipmentDispatcher.dispatch({
			actionType: "shipment-create",
			data: data
		})
	} else {
		return new Error("Invalid Shipment");
	}
}

var shipping_options = {
	"additional_handling": true,
	"address_validation_level": "O",
	"alcohol": true,
	"bill_third_party_account": null,
	"bill_third_party_country": null,
	"bill_third_party_postal_code": null,
	"by_drone": false,
	"carbon_neutral": false,
	"currency": "USD",
	"date_advance": 30,
	"declared_value": 101,
	"delivered_duty_paid": false,
	"delivery_confirmation": "ADULT_SIGNATURE",
	"dry_ice": false,
	"dry_ice_medical": false,
	"dry_ice_weight": 0,
	"handling_instructions": "Do not drop!",
	"hold_for_pickup": false,
	"invoice_number": null,
	"label_format": "EPL2",
	"machinable": false,
	"po_facility": null,
	"po_zip": null,
	"print_custom_1": null,
	"print_custom_2": null,
	"print_custom_3": null,
	"saturday_delivery": false,
	"special_rates_eligibility": "USPS.MEDIAMAIL",
	"smartpost_hub": null,
	"smartpost_manifest": null
}

var shipping_options_per_carrier = {
	"CanadaPost": [
		"alcohol",
		"delivery_confirmation",
		"hold_for_pickup",
		"label_format",
		"print_custom_1", "print_custom_2", "print_custom_3"
	],
	"DHLExpress": [
		"bill_third_party_account",
		"currency",
		"date_advance",
		"delivered_duty_paid",
		"delivery_confirmation",
		"hold_for_pickup",
		"label_format",
		"print_custom_1", "print_custom_2", "print_custom_3",
		"saturday_delivery"
	],
	"DHLGMDomestic": [
		"print_custom_1", "print_custom_2", "print_custom_3"
	],
	"FedEx": [
		"alcohol",
		"bill_third_party_account",
		"currency",
		"date_advance",
		"delivery_confirmation",
		"dry_ice",
		"dry_ice_weight",
		"dry_ice_medical",
		"invoice_number",
		"print_custom_1", "print_custom_2", "print_custom_3",
		"saturday_delivery"		
	],
	"FedExSmartPost": [
		"currency",
		"date_advance",
		"invoice_number",
		"print_custom_1", "print_custom_2", "print_custom_3",
		"smartpost_hub", "smartpost_manifest"
	],
	"GSO": [
		"bill_third_party_account",
		"date_advance",
		"delivery_confirmation",
		"handling_instructions",
		"label_format",
		"print_custom_1", "print_custom_2", "print_custom_3"
	],
	"NORCO": [
		"delivery_confirmation",
		"handling_instructions",
		"label_format",
		"print_custom_1", "print_custom_2", "print_custom_3",
		"saturday_delivery"
	],
	"OnTrac": [
		"bill_third_party_account",
		"date_advance",
		"delivery_confirmation",
		"handling_instructions",
		"label_format",
		"print_custom_1", "print_custom_2", "print_custom_3",
		"saturday_delivery"
	],
	"UPS": [
		"additional_handling",
		"alcohol",
		"bill_third_party_account",
		"bill_third_party_country",
		"bill_third_party_postal_code",
		"carbon_neutral",
		"currency",
		"declared_value",
		"delivered_duty_paid",
		"delivery_confirmation",
		"dry_ice",
		"dry_ice_weight",
		"dry_ice_medical",
		"invoice_number",
		"print_custom_1", "print_custom_2", "print_custom_3"
	],
	"UPSMailInnovations": [
		"carbon_neutral",
		"currency",
		"delivered_duty_paid",
		"dry_ice",
		"dry_ice_weight",
		"dry_ice_medical",
		"invoice_number",
		"print_custom_1", "print_custom_2", "print_custom_3"
	],
	"UPSSurePost":[
		"carbon_neutral",
		"delivery_confirmation",
		"dry_ice",
		"dry_ice_weight",
		"dry_ice_medical",
		"invoice_number",
		"print_custom_1", "print_custom_2", "print_custom_3"
	],
	"USPS": [
		"address_validation_level",
		"date_advance",
		"delivery_confirmation",
		"hold_for_pickup",
		"invoice_number",
		"label_format",
		"machinable",
		"po_facility",
		"po_zip",
		"print_custom_1", "print_custom_2", "print_custom_3",
		"special_rates_eligibility"
	]
}

function shipping_options_for_carrier(carrier) {
	var options = shipping_options_per_carrier[carrier];
}

function verify_shipment(a) {
	return true;
}

function verify_hs_tarrif_number(a) {
	if(a["hs_tariff_number"].toString().length != 6) {
		return false;
	}
	return true;
}

module.exports = {
	create: create_shipment,
	store: function() { return ShipmentStore }
} 