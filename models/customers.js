var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
	cFname: String,
	cLname: String,
	ccNumber: Number,
	ccExpDate: Number,
	ccCode: Number,
	BtoAddr: String,
	BtoCity: String,
	BtoState: String,
	BtoZip: Number,
	BtoCountry: String,
	StoAddr: String,
	StoCity: String,
	StoState: String,
	StoZip: Number,
	StoCountry: String,
	cPhone: Number,
	customerID: String,
	pMethod: String
});
mongoose.model('Customer', CustomerSchema);
