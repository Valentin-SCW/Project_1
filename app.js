'use strict'
const fs = require('fs');
const yargs = require('yargs');
const pkg = require('./package.json');
const notes = require('./notes');
const chalk = require('chalk');

yargs.version(pkg.version);

yargs.command({

    command: 'add',
    describe: 'Добавить новую заметку',
   builder:{
        title: {
            type: 'string',
            demandOption: true,
            describe: 'Название заметки'
        },
    text:{
       type: 'string',
       demandOption: true,
       describe: 'Текст заметки'
    }    
   },
    handler({title, text}){
        notes.addNote(title, text);
    },
})



yargs.command({

    command: 'list',
    describe: 'Показать список заметок',
    handler(){
        notes.lister();
    },
})

yargs.command({

    command: 'read',
    describe: 'Показать содержание выбраной заметки',
    builder:{
        title: {
            type: 'string',
            demandOption: true,
            describe: 'Название заметки'
        }
    },
    handler({title}){
        notes.reader(title)
    },
})

yargs.command({

    command: 'remove',
    describe: 'Удалить заметку',
    builder:{
        title: {
            type: 'string',
            demandOption: true,
            describe: 'Название заметки'
        }
    },
    handler({title}){
      const b = JSON.stringify( notes.remover(title))
      //console.log(b)

      fs.writeFile('notes.json',  b, (err)=>{
        if(err){
            console.log('err')
            return
        }
    })
    console.log('\x1b[33m%s\x1b[0m','Заметка удалена')
    },
})
yargs.parse()