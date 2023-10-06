
import multer from "multer"

export const uploadSingleFile = (folderName, fieldName) => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + "-" + file.originalname);
        }
    });

    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"));
        }
    }

    const upload = multer({ storage: storage, fileFilter });

    return upload.single(fieldName)
}







export const uploadSFiles = (folderName, arrayField) => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + "-" + file.originalname);
        }
    });

    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"));
        }
    }

    const upload = multer({ storage: storage, fileFilter });

    return upload.fields(arrayField)
}