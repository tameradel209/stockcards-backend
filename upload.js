const multer = require('multer')

const UploadImage = (name) =>{
    const storage = multer.diskStorage({
        destination: (req, file, callback) =>{callback(null, 'public/images')},
        filename: (req, file, callback) =>{
            const spliting = file.originalname.split('.')
            const extention = spliting[spliting.length-1]
            callback(null, name+ '-' + Math.random().toString(36).substr(2, 9)+'.'+extention)
        }
    })
    
    const fileFilter = (req, file, callback) =>{
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            return callback(new Error('file uploaded is not an image'))
        }
        callback(null, true)
    }
    
    const upload = multer({storage, fileFilter})

    return upload
}

module.exports = UploadImage