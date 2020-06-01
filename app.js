const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const [dirToCopy, dirToInstall] = process.argv.slice(2);

fs.mkdir(path.join(dirToInstall, '/newone'), {}, err => {
    if (err) {
        console.error(err.message);
        
        return
    }
    sortFiles(dirToCopy);
    rimraf(dirToCopy, () => console.log('deleted'))
})

function sortFiles(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error(err.message);
            return
        }
    
        for (let part of files) {
            fs.stat(path.join(directory, `/${part}`), (err, stats) => {
                if (err) {
                    console.error(err.message);

                    return
                } else if (stats.isDirectory()) {
                    let currentDir = path.join(directory, `/${part}`)
                    
                    sortFiles(currentDir)
                } else if (stats.isFile()) {
                    let currentFile = path.join(directory, `/${part}`)

                    if (!fs.existsSync(`${dirToInstall}/newone/${path.parse(currentFile).base[0]}`)) {
                        fs.mkdirSync(`${dirToInstall}/newone/${path.parse(currentFile).base[0]}`)
                    }
                    fs.copyFile(currentFile, `${dirToInstall}/newone/${path.parse(currentFile).base[0]}/${part}`, err => {
                        if (err) {
                            console.error(err.message);

                            return
                        }
                    })
                }
            })
        }
    })
}

