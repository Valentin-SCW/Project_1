'use strict'
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');




const notePath = path.join(__dirname, 'notes.json');


const getNotes = (callback) => {
    fs.readFile(notePath, 'utf-8', (err, content) => {
        if(err){
            throw new Error(err);
        }


        try {
            callback(JSON.parse(content));
        } catch (e) {
           callback ([])
        }
        //console.log(content);
    })
};

const addNote = (title, text) => {

   getNotes((notes) => {
       const dublicateNote = notes.find(note => note.title === title);

       if(dublicateNote){
           console.log(chalk.red.inverse('Такая заметка уже существует'));
       } else{


        let data = JSON.parse(fs.readFileSync('notes.json', 'utf8'))        
         data.push({title ,text});
           fs.writeFile('notes.json',  JSON.stringify(data), (err)=>{
            if(err){
                console.log('err')
                return
            }
        })
           console.log(chalk.green.inverse('Заметка добавлена'));
       }

    });
}


const lister = () => {
    const data2 = JSON.parse(fs.readFileSync('notes.json', 'utf8'))
    for (const key in data2){
        console.log(chalk.green.italic(` ${data2[key].title} : ${data2[key].text}`))
    }
}


const reader = (title) =>{
    let counter = 0
    const data3 = JSON.parse(fs.readFileSync('notes.json', 'utf8'))
    for (const key in data3){
        if(title == data3[key].title){
            counter += 1
            console.log(chalk.green.inverse(`${data3[key].text}`));
            
        } 
    } 
    
    if (counter == 0) console.log(chalk.red.inverse('Такой заметки не существует'))
}

const removeByAttr = function(arr, attr, value){
    let i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;

}
const data4 = JSON.parse(fs.readFileSync('notes.json', 'utf8'))
const remover = removeByAttr.bind(null, data4,"title")


module.exports = { addNote, lister, reader, remover };

//console.log(chalk.red.inverse('Такой заметки не существует'))
