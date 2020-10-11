import FileSystem from '@forlagshuset/simple-fs'

export default class FileStorageBrowser {
    constructor(rootDirectory) {
        this.setRootDirectory(rootDirectory)
        this.files = new FileSystem()
    }

    setRootDirectory(rootDirectory) {
        this.rootDirectory = rootDirectory
    }

    async makeDirectory(directory) {
        if (!await this.files.exists(this.rootDirectory + directory))
            await this.files.mkdirParents(this.rootDirectory + directory)
    }

    async exists(directory) {
        return await this.files.exists(this.rootDirectory + directory)
    }

    async readFile(filename) {
        try {
            if (await this.files.exists(this.rootDirectory + filename))
                return await (await this.files.readFile(this.rootDirectory + filename)).text()
            return false
        } catch (err) {
            console.log('ERROR reading file at location', filename, err)
        }
        return false
    }

    async writeFile(filename, data) {
        try {
            return await this.files.outputFile(this.rootDirectory + filename, new Blob([data]))
        } catch (err) {
            console.log('ERROR writing file at location', filename, err)
        }
        return false
    }

    async removeFile(filename) {
        try {
            if (await this.files.exists(this.rootDirectory + filename))
                if (await this.files.unlink(this.rootDirectory + filename))
                    return true
        } catch (err) {
            console.log('ERROR removing file at location', filename, err)
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
        if (!await this.files.exists(directory)) {
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

    async _getRecursively(directory) {
        let files = [];
        if (!await this.files.exists(directory)) {
            return [];
        }
        let objects = await this.files.ls(directory)
        for (let object of objects) {
            if (object.isFile()) {
                let blob = await this.files.readFile(object.path);
                files.push({ data: await blob.text(), filename: object.path })
            }
            else if (object.isDirectory()) {
                files.push({ directory: await getRecursively(object.path) })
            }
        }
        return files;
    }
}