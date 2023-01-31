const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

mongoose.connect("mongodb://root:password@localhost:27017/new?authSource=admin",{
	useNewUrlParser:true,
	useUnifiedTopology:true
},(err)=>{
	if(!err){
		console.log("connected to db")
	}
	else{
		console.log(err.message)
	}
})

//Schema
const sch = {
	name:String,
	email:String,
	id:Number
}

const mongomodel = mongoose.model("test", sch)

//Post
app.post("/post",(req,res)=>{
	console.log('inside post')

	try{
		const data = new mongomodel({
			name: req.body.name,
			email: req.body.email,
			id: req.body.id
		});
		const val = data.save();
		res.send("posted")
	}catch{
		console.log(err.message)
	}
	
})

//Fetch
app.get("/fetch/:id", function(req,res){
	fetchid=req.params.id,
	mongomodel.find(({id:fetchid}), function(err,val){
		if(err || val.length==0){
			res.send("error");
		}else{
			res.send(val);
		}
		
	})
})

//Delete
app.delete("/delete/:_id", function(req,res){
	const deletid = req.params._id;

	mongomodel.deleteOne(({_id:deletid}),function(err,val){
		res.send(val)
	})
})

//Push all the data
app.push("/dbdata", function(req,res){
	let users=[];
	mongomodel.find(function(err,val){
		users.push(val);
		res.send("Data saved on the document")
		console.log(users);
	})
})

app.listen(3000, ()=>{
	console.log('Example of app listening at http://localhost:3000}')
	});

