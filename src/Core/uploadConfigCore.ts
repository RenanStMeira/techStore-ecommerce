import multer from "multer";

export class UploadMulter {
    private storage(destiny: string) {
        return multer.diskStorage({
            destination: destiny,
            filename: (req, file, cb) => {
                cb(null, file.originalname)
            },
        });
    }
    public guard(destiny: string): any {
        return multer({ storage: this.storage(destiny) }).single('file');
    }
}