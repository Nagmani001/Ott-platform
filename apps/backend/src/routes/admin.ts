import express, { Router, Request, Response } from "express"
const multer = require('multer')
const multerS3 = require('multer-s3')
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: "Global" });
export const adminRouter: Router = express.Router()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'ott-platform-videos',
    metadata: function (req: Request, file: any, cb: any) {
      cb(null, { fieldName: file.fieldname });
    },
    acl: 'public-read',
    key: function (req: Request, file: any, cb: any) {
      cb(null, Date.now().toString())
    }
  })
})

adminRouter.post("/upload", upload.array('video', 3), (req: Request, res: Response) => {
  res.json({
    msg: "upload"
  });
});
