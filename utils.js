function verify_string(a, key, value) {
	if(a.get(key) == undefined) return false;
	if(a.get(key) == null) return false;
	if(a.get(key).trim() == "") return false;
	if(value) {
		if(a.get(key).trim() != value) return false;
	}
	return true;
}

function verify_float(a, key, value) {
	if(a.get(key) == undefined) return false;
	if(a.get(key) == null) return false;
	if(parseFloat(a.get(key)) <= 0 ) return false;
	if(value) {
		if(parseFloat(a.get(key)) != value) return false;
	}
	return true;
}

function verify_int(a, key, value) {
	if(a.get(key) == undefined) return false;
	if(a.get(key) == null) return false;
	if(parseFloat(a.get(key)) <= 0 ) return false;
	if(value) {
		if(parseInt(a.get(key)) != value) return false;
	}
	return true;
}

function verify_in(collection, a, key) {
	if(a.get(key) == undefined) return false;
	if(a.get(key) == null) return false;
	if(a.get(key).trim() == "") return false;
	if(collection.indexOf(a.get(key).trim()) == -1) return false;
	return true;
}


function create_resource(resource, opts) {
	opts = opts || {};
	opts["created_at"] = (new Date()).toISOString();
	return resource.merge(opts);
}

module.exports = {
	verify_in: verify_in,
	verify_int: verify_int,
	verify_float: verify_float,
	verify_string: verify_string,
	create_resource: create_resource
}