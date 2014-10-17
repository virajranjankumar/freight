var Immutable = require("immutable");
var Flux = require("./Flux");
var Dispatcher = Flux.Dispatcher;
var Utils = require("./utils");

var CustomsInfoStore = Immutable.Vector();

var customsInfoDispatcher = new Dispatcher();

customsInfoDispatcher.register(function(payload) {
	if(payload.actionType === "customs_info-create") {
		CustomsInfoStore = CustomsInfoStore.push(payload.data);
	}
})

var customs_info = Immutable.Map({
    "id": "",
    "object": "CustomsInfo",
    "contents_explanation": "",
    "contents_type": "merchandise",
    "customs_certify": false,
    "customs_signer": "",
    "eel_pfc": "EEL",
    "non_delivery_option": "return",
    "restriction_comments": "",
    "restriction_type": "none",
    "customs_items": [],
    "created_at": null,
    "updated_at": null
});

function create_customs_info(customs_items) {
	var data = Utils.create_resource(customs_info, {
		"customs_items": customs_items
	});
	if(verify_customs_info(data)) {
		customsInfoDispatcher.dispatch({
			actionType: "customs_info-create",
			data: data
		})
	} else {
		return new Error("Invalid Customs Info");
	}
}

function verify_customs_info(a) {
	if(a["object"] != "CustomsInfo") {
		return false;
	}

	var eel_pfc = verify_in(["EEL", "PFC"], a, "eel_pfc");
	var contents_type = verify_in(["documents", "gift", "merchandise", "returned_goods", "sample", "other"], a, "contents_type")
	var non_delivery_option = verify_in(["abandon", "return"], a, "non_delivery_option");
	var restriction_type = verify_in(["none", "other", "quarantine", "sanitary_phytosanitary_inspection"], a, "restriction_type")
	if((a.get("restriction_type") != "none") && (a.get("restriction_comments") == undefined) ) {
		return false;
	}

	if(a.get("customs_certify") && (a.get("customs_signer") == undefined)) {
		return false;
	}

	return eel_pfc && contents_type && non_delivery_option && restriction_type;
}

module.exports = {
	create: create_customs_info,
	store: function() { return CustomsInfoStore }
} 