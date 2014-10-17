 var Immutable = require("immutable");
var Flux = require("./Flux");
var Dispatcher = Flux.Dispatcher;
var Utils = require("./utils");

var ScanFormStore = Immutable.Vector();

var scanFormDispatcher = new Dispatcher();

scanFormDispatcher.register(function(payload) {
	if(payload.actionType === "scan_form-create") {
		ScanFormStore = ScanFormStore.push(payload.data);
	}
})

var scan_form = Immutable.Map({
	"id": "",
	"object": "ScanForm",
	"from_address": null,
	"tracking_codes": [],
	"form_url": "",
	"form_file_type": "application/pdf",
	"created_at": null,
	"updated_at": null
});

function create_scan_form(a) {
	create_scan_form_from_field(a["batch"]);
}

function create_scan_form_from_field(batch) {
	var data = Utils.create_resource( scan_form );
	if(verify_scan_form(data)) {
		scanFormDispatcher.dispatch({
			actionType: "scan_form-create",
			data: data
		})
	} else {
		return new Error("Invalid Scan Form");
	}
}

function verify_scan_form(a) {
	return true;
}

module.exports = {
	create: create_scan_form,
	store: function() { return ScanFormStore }
}