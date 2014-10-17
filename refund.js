var Immutable = require("immutable");
var Flux = require("./Flux");
var Dispatcher = Flux.Dispatcher;
var Utils = require("./utils");

var RefundStore = Immutable.Vector();

var refundDispatcher = new Dispatcher();

refundDispatcher.register(function(payload) {
	if(payload.actionType === "refund-create") {
		RefundStore = RefundStore.push(payload.data);
	}
})

var refund = Immutable.Map({
	"id": null,
	"object": "Refund",
	"tracking_code": null,
	"confirmation_number": null,
	"status": null,
	"carrier": null,
	"shipment_id": null,
	"created_at": null,
	"updated_at": null
});

function create_refund(a) {
	create_refund_from_field(a);
}

function create_refund_from_field() {  
	var data = Utils.create_resource( refund );
	if(verify_refund(data)) {
		refundDispatcher.dispatch({
			actionType: "refund-create",
			data: data
		})
	} else {
		return new Error("Invalid Refund");
	}
}

function verify_refund(a) {
	return true;
}

module.exports = {
	create: create_refund,
	store: function() { return RefundStore }
} 