var Immutable = require("immutable");
var Flux = require("./Flux");
var Dispatcher = Flux.Dispatcher;
var Utils = require("./utils");

var BatchStore = Immutable.Vector();

var batchDispatcher = new Dispatcher();

batchDispatcher.register(function(payload) {
	if(payload.actionType === "batch-create") {
		BatchStore = BatchStore.push(payload.data);
	}
});

var batch = Immutable.Map({
	"id": "",
	"object": "Batch",
	"shipments": [],
	"status": {
		"created": null,
		"postage_purchased": null,
		"postage_purchase_failed": null
	},
	"label_url" : "",
	"created_at": null,
	"updated_at": null
});

function create_batch() { 
	var data = Utils.create_resource( batch );
	if(verify_batch(data)) {
		batchDispatcher.dispatch({
			actionType: "batch-create",
			data: data
		})
	} else {
		return new Error("Invalid Batch");
	}
}

function verify_batch(a) {
	return true;
}

module.exports = {
	create: create_batch,
	store: function() { return BatchStore }
} 