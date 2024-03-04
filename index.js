import  express  from "express";
import fs from 'fs' 
import { format } from "date-fns";
import path from "path";

const app= express();
const PORT=4000; //http://localhost:4000/

app.get('/',(req,res)=>{

      res.status(200).json({message:"Hi friends"})
})

// app.get('/get-data',(req,res)=>{

//     res.status(200).json({message:"data",data:{name:"yamuna"}})
// })

app.get('/write',(req,res)=>{
    let task= format(new Date(), 'dd-mm-yyyy-HH-mm-ss')
    console.log(("task",task));
    const filePath= `TimeStamp/${task}.txt`
    fs.writeFileSync(filePath, `${task}`, 'utf8')

    res.status(200).send(task)
})

app.get('/retrieve',(req,res)=>{

    const folderPath = './TimeStamp'; 
    try {
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error('Error reading folder:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            const txtFiles = files.filter(file => path.extname(file) === '.txt');

            res.status(200).json({ files: txtFiles });
        });
    } catch (error) {
        console.error("Error reading folder:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.listen(PORT,()=>{

     console.log(`App is running in the port ${PORT}`);

})