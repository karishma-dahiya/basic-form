const express = require('express');
const cors = require('cors');
const app = express();



const PORT = 5000;
app.use(cors());
app.use(express.json());

app.post('/formdata',async(req,res)=>{
    try{
        let data = req.body;
        if(data){
            return res.status(200).send({message:'Success!'})
        }
        return res.status(404).send({message:'Form Data Not Found!!'})
    }catch(err){
        return res.status(400).send(err)
    }
})

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});