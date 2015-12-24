var mongoose=require('mongoose');
var pMethodSchema = new mongoose.Schema({
	type: String
});
mongoose.model('pMethod', pMethodSchema);
