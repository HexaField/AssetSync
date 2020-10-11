import { homedir } from '@AssetSync/common'
import fs from 'fs-extra'

export default class FileStorageNode {
    constructor(rootDirectory) {
        this.setRootDirectory(rootDirectory)
        this.files = fs
    }

    setRootDirectory(rootDirectory) {
        this.rootDirectory = rootDirectory || homedir()
    }

    // Internal

    async makeDirectory(directory) {
        try {
            await this.files.mkdir(this.rootDirectory + directory, { recursive: true })
            return true
        } catch (err) {
            console.log('Error making directory at location', directory, err)
        }
        return false
    }

    async exists(directory) {
        try {
            let stat = await this.files.stat(this.rootDirectory + directory)
            return Boolean(stat)
        } catch (err) {
            console.log('Error finding status of file at location', directory, err)
        }
        return false
    }

    async readFile(filename) {
        try {
            if (await this.exists(filename))
                return await this.files.readFile(this.rootDirectory + filename)
            return false
        } catch (err) {
            console.log('Error reading file at location', filename, err)
        }
        return false
    }

    async writeFile(filename, data) {
        try {
            await this.files.outputFile(this.rootDirectory + filename, data)
            return true
        } catch (err) {
            console.log('Error writing file at location', filename, err)
        }
        return false
    }

    async removeFile(filename) {
        try {
            if (await this.exists(filename)) {
                await this.files.unlink(this.rootDirectory + filename)
                return true
            }
        } catch (err) {
            console.log('Error removing file at location', filename, err)
        }
        return false
    }


    async removeDirectory(filename) {
        try {
            if (await this.exists(filename)) {
                await this.files.rmdir(this.rootDirectory + filename)
                return true
            }
        } catch (err) {
            console.log('Error removing file at location', filename, err)
        }
        return false
    }

    async getFiles(directory) {
        try {
            return await this._getAllFilesIn(this.rootDirectory + directory)
        } catch (err) {
            console.log('Error getting files at location', directory, err)
        }
        return []
    }

    async _getAllFilesIn(directory) {
        let files = [];
        if (!await this.exists(directory)) {
            return [];
        }
        let objects = await this.files.ls(directory)
        for (let object of objects) {
            if (object.isFile()) {
                let blob = await this.files.readFile(object.path);
                files.push(await blob.text())
            }
        }
        return files;
    }

    async getRecursively(directory) {
        try {
            return await this._getRecursively(this.rootDirectory + directory)
        } catch (err) {
            console.log('Error getting files at location', directory, err)
        }
        return []
    }

    async _getRecursively(dir) {
        let files = await this.files.readdir(dir);
        return Promise.all(files
            .map(f => path.join(dir, f))
            .map(async f => {
                let stats = await this.files.lstat(f);
                return stats.isDirectory() ? this.getRecursivelygetFiles(f) : f;
            })
        );
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