var Immutable = require("immutable");
var Flux = require("./Flux");
var Dispatcher = Flux.Dispatcher;
var Utils = require("./utils");

var ParcelStore = Immutable.Vector();

var parcelDispatcher = new Dispatcher();

parcelDispatcher.register(function(payload) {
	if(payload.actionType === "parcel-create") {
		ParcelStore = ParcelStore.push(payload.data);
	}
})

var parcel = Immutable.Map({
  "id": "",
  "object": "Parcel",
  "length": 0.0,
  "width": 0.0,
  "height": 0.0,
  "predefined_package": "",
  "weight": 0.0,
  "created_at": null,
  "updated_at": null
});

function create_parcel(a) {
	create_parcel_from_fields(a.weight, a.length, a.width, a.height);
}

function create_parcel_from_fields(weight, length, width, height) {
	var data = Utils.create_resource( parcel, {
		weight: weight,
		length: length,
		width: width,
		height: height
	} );
	if(verify_parcel(data)) {
		parcelDispatcher.dispatch({
			actionType: "parcel-create",
			data: data
		})
	} else {
		return new Error("Invalid Parcel");
	}
}

var predefined_package_sizes = {
	"USPS": [
		"Card",
		"Letter",
		"Flat",
		"Parcel",
		"LargeParcel",
		"IrregularParcel",
		"FlatRateEnvelope",
		"FlatRateLegalEnvelope",
		"FlatRatePaddedEnvelope",
		"FlatRateGiftCardEnvelope",
		"FlatRateWindowEnvelope",
		"FlatRateCardboardEnvelope",
		"SmallFlatRateEnvelope",
		"SmallFlatRateBox",
		"MediumFlatRateBox",
		"LargeFlatRateBox",
		"RegionalRateBoxA",
		"RegionalRateBoxB",
		"RegionalRateBoxC",
		"LargeFlatRateBoardGameBox"
	],
	"UPS": [
		"UPSLetter",
		"UPSExpressBox",
		"UPS25kgBox",
		"UPS10kgBox",
		"Tube",
		"Pak",
		"Pallet",
		"SmallExpressBox",
		"MediumExpressBox",
		"LargeExpressBox"
	],
	"FedEx": [
		"FedExEnvelope",
		"FedExBox",
		"FedExPak",
		"FedExTube",
		"FedEx10kgBox",
		"FedEx25kgBox"
	],
	"DHL": [
		"JumboDocument",
		"JumboParcel",
		"Document",
		"DHLFlyer",
		"Domestic",
		"ExpressDocument",
		"DHLExpressEnvelope",
		"JumboBox",
		"JumboJuniorDocument",
		"JuniorJumboBox",
		"JumboJuniorParcel",
		"OtherDHLPackaging",
		"Parcel",
		"YourPackaging"
	],
	"OnTrac" :["Ground", "Overnight"],
	"GSO": ["Ground", "Overnight"],
	"NORCO": ["Ground", "Overnight"]
}

var predefined_package_service_levels = {
	"USPS": [
		"First",
		"Priority",
		"Express",
		"ParcelSelect",
		"LibraryMail",
		"MediaMail",
		"CriticalMail",
		"FirstClassMailInternational",
		"FirstClassPackageInternational",
		"PriorityMailInternational",
		"ExpressMailInternational"
	],
	"UPS": {
		"Standard" : [
			"Ground",
			"UPSStandards",
			"UPSSaver",
			"Express",
			"ExpressPlus",
			"Expedited",
			"NextDayAir",
			"NextDayAirSaver",
			"NextDayAirEarlyAM",
			"2ndDayAir",
			"2ndDayAirAM",
			"3DaySelect"
		],
		"SurePost" : [
			"SurePost - SurePostUnder1Lb",
			"SurePost - SurePostOver1Lb"
		],
		"Mail Innovations" : [
			"First",
			"Priority",
			"ExpeditedMailInnovations",
			"PriorityMailInnovations",
			"EconomyMailInnovations"
		]
	},
	"FedEx": [
		"FEDEX_GROUND",
		"FEDEX_2_DAY",
		"FEDEX_2_DAY_AM",
		"FEDEX_EXPRESS_SAVER",
		"STANDARD_OVERNIGHT",
		"FIRST_OVERNIGHT",
		"PRIORITY_OVERNIGHT",
		"INTERNATIONAL_ECONOMY",
		"INTERNATIONAL_FIRST",
		"INTERNATIONAL_PRIORITY",
		"GROUND_HOME_DELIVERY",
		"SMART_POST"	
	],
	"DHL": [
		"BreakBulkEconomy",
		"BreakBulkExpress",
		"DomesticEconomySelect",
		"DomesticExpress",
		"DomesticExpress1030",
		"DomesticExpress1200",
		"EconomySelect",
		"EconomySelectNonDoc",
		"EuroPack",
		"EuropackNonDoc",
		"Express1030",
		"Express1030NonDoc",
		"Express1200NonDoc",
		"Express1200",
		"Express900",
		"Express900NonDoc",
		"ExpressEasy",
		"ExpressEasyNonDoc",
		"ExpressEnvelope",
		"ExpressWorldwide",
		"ExpressWorldwideB2C",
		"ExpressWorldwideB2CNonDoc",
		"ExpressWorldwideECX",
		"ExpressWorldwideNonDoc",
		"FreightWorldwide",
		"GlobalmailBusiness",
		"JetLine",
		"JumboBox",
		"LogisticsServices",
		"SameDay",
		"SecureLine",
		"SprintLine"
	],
	"OnTrac" :[ "Sunrise", "Gold", "OnTracGold"],
	"GSO": [
		"EarlyPriorityOvernight",
		"PriorityOvernight",
		"CaliforniaParcelService",
		"SaturdayDeliveryService",
		"EarlySaturdayService"
	],
	"NORCO": [
		"EarlyOvernite",
		"MorningOvernite",
		"OneOvernite",
		"NextDayOvernite",
		"SaturdayOvernite",
		"2DayMetro"
	],
	"CanadaPost" : [
		"RegularParcel",
		"ExpeditedParcel",
		"Xpresspost",
		"XpresspostCertified",
		"Priority",
		"LibraryBooks",
		"ExpeditedParcelUSA",
		"PriorityWorldwideEnvelopeUSA",
		"PriorityWorldwidePakUSA",
		"PriorityWorldwideParcelUSA",
		"SmallPacketUSAAir",
		"TrackedPacketUSA",
		"TrackedPacketUSALVM",
		"XpresspostUSA",
		"XpresspostInternational",
		"InternationalParcelAir",
		"InternationalParcelSurface",
		"PriorityWorldwideEnvelopeIntl",
		"PriorityWorldwidePakIntl",
		"PriorityWorldwideParcelIntl",
		"SmallPacketInternationalAir",
		"SmallPacketInternationalSurface",
		"TrackedPacketInternational"
	]
}

var all_predifined_package_sizes = Object.keys(predefined_package_sizes).map(function(i) {
	return predefined_package_sizes[i];
}).reduce(function(a,i) {
	return a.concat(i);
}, [])

function verify_parcel(a) {
	if(a.get("object") != "Parcel") return false;

	if(a.get("predefined_package") == "") {
		var weight = Utils.verify_float(a, "weight");
		var length = Utils.verify_float(a, "length");
		var width = Utils.verify_float(a, "width");
		var height = Utils.verify_float(a, "height");
		return weight && length && width && height;
	} else {
		return Utils.verify_in(all_predifined_package_sizes, a, "predefined_package");
	}
}

module.exports = {
	create: create_parcel,
	store: function() { return ParcelStore }
} 