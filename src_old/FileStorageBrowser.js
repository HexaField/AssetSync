import FileSystem from '@forlagshuset/simple-fs'

export default class FileStorageBrowser
{  
    constructor(rootDirectory)
    {
        this.rootDirectory = rootDirectory || '/.storage/'
        this.files = new FileSystem()
    }

    async initialise()
    {
        if(!await this.files.exists(this.rootDirectory))
            await this.files.mkdirParents(this.rootDirectory)
    }

    async makeDirectory(directory)
    {
        if(!await this.files.exists(this.rootDirectory + directory))
            await this.files.mkdirParents(this.rootDirectory + directory)
    }

    async readFile(filename)
    {
        try {
            if(await this.files.exists(this.rootDirectory + filename))
                return await (await this.files.readFile(this.rootDirectory + filename)).text()
            return false
        } catch (err) {
            console.log('ERROR reading file at location', filename, err)
        }
        return false
    }

    async writeFile(filename, data)
    {
       try {
            return await this.files.writeFile(this.rootDirectory + filename, new Blob([data]))
        } catch (err) {
            console.log('ERROR writing file at location', filename, err)
        }
        return false
    }

    async removeFile(filename)
    {
       try {
            if(await this.files.exists(this.rootDirectory + filename))
                if(await this.files.unlink(this.rootDirectory + filename))
                    return true
        } catch (err) {
            console.log('ERROR removing file at location', filename, err)
        }
        return false
    }

    async getFiles(directory)
    {
        try {
            return await this.getAllFilesIn(this.rootDirectory + directory)
        } catch (err) {
            console.log('Error getting files at location', directory, err)
        }
        return []
    }

    async getAllFilesIn(directory)
    {
        let files = [];
        if(!await this.files.exists(directory))
        {
            await this.files.mkdirParents(directory)
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
}