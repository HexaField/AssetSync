// import fs from 'fs-extra'
import os from 'os'

export default class FileStorageNode
{  
    constructor()   
    {
        this.rootDirectory = os.homedir() + (global.isDevelopment ? '/.conjure-dev/' : '/.conjure/')
        this.files = require('fs-extra')
    }   

    // Internal

    async initialise()
    {
        
    }

    async makeDirectory(directory)
    {
        try {
            // global.log('makeDirectory', directory)
            if(!await this.exists(this.rootDirectory + directory))
                return Boolean(await this.files.mkdir(this.rootDirectory + directory, { recursive: true }))
        } catch (err) {
            // global.log('Error making directory at location', directory, err)
        }
        return false
    }

    async exists(directory)
    {
        try {
            // global.log('exists', directory)
            let stat = await this.files.stat(directory)
            return Boolean(stat)
        } catch (err) {
            // global.log('Error finding status of file at location', directory, err)
        }
        return false
    }

    // API

    async readFile(filename)
    {
        try {
            // global.log('readFile', this.rootDirectory + filename)
            if(await this.exists(this.rootDirectory + filename))
                return await this.files.readFile(this.rootDirectory + filename)
            return false
        } catch (err) {
            global.log('Error reading file at location', filename, err)
        }
        return false
    }

    async writeFile(filename, data)
    {
       try {
            // global.log('writeFile', this.rootDirectory + filename)
            return await this.files.outputFile(this.rootDirectory + filename, data)
        } catch (err) {
            global.log('Error writing file at location', filename, err)
        }
        return false
    }

    async removeFile(filename)
    {
       try {
            if(await this.exists(this.rootDirectory + filename))
                if(await this.files.unlink(this.rootDirectory + filename))
                    return true
        } catch (err) {
            global.log('Error removing file at location', filename, err)
        }
        return false
    }

    async getFiles(directory)
    {
        try {
            return await this.getAllFilesIn(this.rootDirectory + directory)
        } catch (err) {
            global.log('Error getting files at location', directory, err)
        }
        return []
    }

    async getAllFilesIn(directory)
    {
        let files = [];
        if(!await this.exists(directory))
        {
            return [];
        }
        let objects = await this.files.ls(directory)
        for(let object of objects)
        {
            if(object.isFile())
            {
                let blob = await this.files.readFile(object.path);
                files.push(await blob.text())
            }
        }
        return files;
    }

    async getRecursively(dir) {
        let files = await this.files.readdir(dir);
        return Promise.all(files
          .map(f => path.join(dir, f))
          .map(async f => {
            let stats = await this.files.lstat(f);
            return stats.isDirectory() ? this.getRecursivelygetFiles(f) : f;
          }));
      }
    // async getRecursively(directory)
    // {
    //     let files = [];
    //     if(!await this.exists(directory))
    //     {
    //         return [];
    //     }
    //     let objects = await this.files.ls(directory)
    //     for(let object of objects)
    //     {
    //         if(object.isFile())
    //         {
    //             let blob = await this.files.readFile(object.path);
    //             files.push({ data: await blob.text(), filename: object.path })
    //         }
    //         else if(object.isDirectory())
    //         {
    //             files.push({ directory: await getRecursively(object.path) })
    //         }
    //     }
    //     return files;
    // }
}