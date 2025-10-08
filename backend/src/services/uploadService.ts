// backend/src/services/uploadService.ts
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

const BUCKET_NAME = process.env.AWS_BUCKET_NAME || "maturapolski";
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export class UploadService {
  private s3Client: S3Client;

  constructor() {
    console.log("🔍 Constructor - checking env vars...");
    console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID);
    console.log("AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY);

    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      throw new Error("AWS credentials not configured");
    }

    this.s3Client = new S3Client({
      region: process.env.AWS_REGION || "eu-north-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadImage(
    file: Buffer,
    originalName: string,
    folder: string = "images"
  ): Promise<string> {
    try {
      if (file.length > MAX_FILE_SIZE) {
        throw new Error("File too large. Max size is 5MB");
      }

      const metadata = await sharp(file).metadata();
      if (!["jpeg", "jpg", "png", "webp"].includes(metadata.format || "")) {
        throw new Error(
          "Invalid file type. Only JPEG, PNG, and WebP are allowed"
        );
      }

      const processedImage = await sharp(file)
        .resize(1920, 1920, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 85 })
        .toBuffer();

      const baseName = originalName.replace(/\.[^/.]+$/, "");
      const fileName = `${folder}/${baseName}-${uuidv4()}.webp`;

      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: processedImage,
        ContentType: "image/webp",
        CacheControl: "max-age=31536000",
      });

      await this.s3Client.send(command);

      return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    } catch (error: any) {
      console.error("Upload error:", error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

  async deleteImage(imageUrl: string): Promise<void> {
    try {
      const url = new URL(imageUrl);
      const key = url.pathname.substring(1);

      const command = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      });

      await this.s3Client.send(command);
    } catch (error: any) {
      console.error("Delete error:", error);
      throw new Error(`Failed to delete image: ${error.message}`);
    }
  }

  async uploadMultipleImages(
    files: Array<{ buffer: Buffer; originalName: string }>,
    folder: string = "images"
  ): Promise<string[]> {
    const uploadPromises = files.map((file) =>
      this.uploadImage(file.buffer, file.originalName, folder)
    );
    return Promise.all(uploadPromises);
  }
}

// ✅ LAZY INITIALIZATION - nie tworzy instancji od razu!
let uploadServiceInstance: UploadService | null = null;

export function getUploadService(): UploadService {
  if (!uploadServiceInstance) {
    uploadServiceInstance = new UploadService();
  }
  return uploadServiceInstance;
}

// Export dla kompatybilności wstecznej
export const uploadService = {
  uploadImage: (...args: Parameters<UploadService["uploadImage"]>) =>
    getUploadService().uploadImage(...args),
  deleteImage: (...args: Parameters<UploadService["deleteImage"]>) =>
    getUploadService().deleteImage(...args),
  uploadMultipleImages: (
    ...args: Parameters<UploadService["uploadMultipleImages"]>
  ) => getUploadService().uploadMultipleImages(...args),
};
