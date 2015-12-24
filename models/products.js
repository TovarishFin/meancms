var mongoose=require('mongoose');
var productSchema = new mongoose.Schema({
	prodName: String,
	prodCode: String,
	prodPrice: Number
});
mongoose.model('Product',productSchema);
