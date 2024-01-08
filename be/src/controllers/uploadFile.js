import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() })
export const fileUploadController = upload.single('excel')
