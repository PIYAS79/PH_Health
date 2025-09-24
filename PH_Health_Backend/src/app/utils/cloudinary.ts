import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

type CloudinaryUploadResponse = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string; // ISO date string
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  overwritten: boolean;
  original_filename: string;
  api_key: string;
};

type UploadedFile_Type = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};



cloudinary.config({
  cloud_name: 'do7nin6oo',
  api_key: '787966622996427',
  api_secret: '-Y8aRpRKfATTpHZMy4lb-htaEEQ' 
});


const Upload_To_Cloudinary = async (file: UploadedFile_Type):Promise<CloudinaryUploadResponse|undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path,
      // { public_id: "DUMMY_NAME" }, //file.originalname
      (error:Error, result:CloudinaryUploadResponse) => {
        fs.unlinkSync(file.path)
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })

  })
}




export default Upload_To_Cloudinary;