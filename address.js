var Immutable = require("immutable");
var Flux = require("./Flux");
var Dispatcher = Flux.Dispatcher;
var Utils = require("./utils");

var AddressStore = Immutable.Vector();

var addressDispatcher = new Dispatcher();

addressDispatcher.register(function(payload) {
	if(payload.actionType == "address-create") {
		AddressStore = AddressStore.push(payload.data);
	}
});

var address = Immutable.Map({
  "id": "",
  "object": "Address",
  "name": "",
  "company": "",
  "street1": "",
  "street2": "",
  "city": "",
  "state": "",
  "zip": "",
  "country": "US",
  "phone": "",
  "email": "",
  "residential": false,
  "created_at": null,
  "updated_at": null
});

function create_address(a) {
  if(a) {
	  return create_address_from_fields(a.street1, a.street2, a.city, a.state, a.zip, a.country, a.name, a.company, a.phone, a.email, a.residential);
  } else {
    return create_emtpy_address();
  }
}

function create_emtpy_address() {
  var data = Utils.create_resource( address );
  console.log(data);
  console.log("End");
  return data;
}

function create_address_from_fields(street1, street2, city, state, zip, country, name, company, phone, email, residential) { 
	var data = Utils.create_resource( address, {
		street1: street1,
		street2: street2,
		city: city, 
		state: state,
		zip: zip,
		country:country,
		name:name,
		company:company,
		phone:phone,
		email:email,
		residential:residential
	} );
	if( verify_address(data)) {
		addressDispatcher.dispatch({
			actionType: "address-create",
			data: data
		});
	} else {
		return new Error("Invalid address");
	}
	return data;
}

function verify_address(a) {
	if(a.get("object") != "Address") {
		return false;
	}

	if(a.get("zip") == undefined && (Utils.verify_string(a, "city") || Utils.verify_string(a, "state")) ) {
		return false;
	}
	var street1 = Utils.verify_string(a, "street1");
	var name = Utils.verify_string(a, "name");
	var company = Utils.verify_string(a, "company");

	return street1 && name && company;
}

module.exports = {
	create: create_address,
	verify: verify_address,
	store: function() { return AddressStore }
}
