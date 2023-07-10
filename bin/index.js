#! /usr/bin/env node
import chalk from 'chalk';
import fs from 'fs';
import { resolve, dirname} from 'path';
import { writeComponent, generateTypescriptCode, generateComponentCode } from './component.js';


let moduleDir = process.argv.splice(0, 2)[1];//working dir
let command = process.argv.filter(e => !e.includes('-'))[0];//component dir or setting
let flags = process.argv.filter(e => e.includes('-'))
let config_path = resolve(dirname(moduleDir), './config.json');
let setting


const createComponent = (dir) => {
   //make dir to project file
   fs.mkdirSync(dir, { recursive: true });

   let extension;
   let content;
   let name = dir.split('/').pop();

   //css
   let cssExtension = flags.includes('-cssm') || setting.cssm  ? '.module.css' : '.css'
   let newFileName = `${name}${cssExtension}`;
   writeComponent(`${dir}/${newFileName}`, '')

   //component
   if(flags.includes('-tsx') || setting.format === 'tsx' ) {
      extension = '.tsx'
      content = generateTypescriptCode(name, cssExtension)
   } else {
      extension = '.jsx'
      content = generateComponentCode(name, cssExtension)
   }
   
   newFileName = `${name}${extension}`;
   writeComponent(`${dir}/${newFileName}`, content)

   //test
   if(flags.includes('-test') || setting.test) {
      extension = '.test.js'
      newFileName = `${name}${extension}`;
      writeComponent(`${dir}/${newFileName}`, '')
   }

   console.log(chalk.bold.green('Component Created'));
}



function checkFlagValidity() {
   const allowFlag = ['-test', '-tsx', '-cssm'];
   flags.forEach(flag => {
      let index = allowFlag.indexOf(flag)
      if (index < 0) throw Error(`${flag} flag is not allow`)
   })

   return true
}


function checkDirValidity(dir) {
   
   if (!dir) throw new Error(`Invalid component name`)

   dir.split('/').forEach((folderName, index, array) => {
      if (!isValidDirectoryName(folderName)) throw new Error(`${folderName} is not valid folder name`)

      if (array.length - 1 === index) {
         if (!isValidFilename(folderName)) throw new Error(`${folderName} is not valid file name`)
      }
   })

   return true
}


function isValidFilename(fileName) {
   const validFilenameRegex = /^[^ .][\w.\- ]+$/;
   return validFilenameRegex.test(fileName);
}


function isValidDirectoryName(dirName) {
   const validDirectoryNameRegex = /^[^ .][\w.\- ]*$/;
   return validDirectoryNameRegex.test(dirName);
}
function getSetting () {
   try {
      let data = fs.readFileSync(config_path,  'utf8')
      
      setting = JSON.parse(data)
   } catch (error) {
      throw Error('config file read error')
   }

}

const setSetting =  () => {
   getSetting()
   let valid = true;

   flags.forEach((flag, i) => {
      let value = JSON.parse(flag.split('=')[1])
      switch (true) {
         case flag.includes('-test'):
            setting.test = value
            break;
         case flag.includes('-cssm'):
            setting.cssm = value
            break;
         case flag.includes('-format'):
            setting.format = value
            break;
         default:
            valid = false;
            throw Error(`${flag} flag is not allowed`)
      }
   })

   if(!valid) return

   try {
      let data = JSON.stringify(setting, null, 4)
      fs.writeFileSync(config_path, data)
   } catch (error) {
      throw Error('config file write error')
   }
}

try {
   if(command === 'set')  {
      setSetting();  
   } else {
      checkDirValidity(command)
      checkFlagValidity()
      getSetting()
      createComponent(command)
   }    
} catch (error) {
   console.error(chalk.bold.red(error))
}
