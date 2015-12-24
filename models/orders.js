var mongoose=require('mongoose');
var OrderSchema = new mongoose.Schema({
	itemName: String,
	pMethod: String,
	itemPrice: Number,
	orderStatus: Number,
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
	orderID: String,
	cPhone: Number,
	tNum: String,
	sLabel: String,
	postID:Number,
	user:String,
	date:{
		type: Date,
		default: Date.now
	}
	
});
mongoose.model('Order',OrderSchema);
