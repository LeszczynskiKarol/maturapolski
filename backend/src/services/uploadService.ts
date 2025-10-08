// backend/src/services/uploadService.ts
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME || "maturapolski";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export class UploadService {
  /**
   * Upload obrazu do S3 z automatyczną kompresją
   */
  async uploadImage(
    file: Buffer,
    originalName: string,
    folder: string = "images"
  ): Promise<string> {
    try {
      // Walidacja rozmiaru
      if (file.length > MAX_FILE_SIZE) {
        throw new Error("File too large. Max size is 5MB");
      }

      // Walidacja typu pliku (sprawdzamy przez sharp)
      const metadata = await sharp(file).metadata();
      if (!["jpeg", "jpg", "png", "webp"].includes(metadata.format || "")) {
        throw new Error(
          "Invalid file type. Only JPEG, PNG, and WebP are allowed"
        );
      }

      // Kompresja i konwersja do WebP
      const processedImage = await sharp(file)
        .resize(1920, 1920, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 85 })
        .toBuffer();

      // Generuj unikalną nazwę
      const baseName = originalName.replace(/\.[^/.]+$/, "");
      const fileName = `${folder}/${baseName}-${uuidv4()}.webp`;

      // Upload do S3
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: processedImage,
        ContentType: "image/webp",
        CacheControl: "max-age=31536000", // 1 rok cache
      });

      await s3Client.send(command);

      // Zwróć publiczny URL
      return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    } catch (error: any) {
      console.error("Upload error:", error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

  /**
   * Usuń obraz z S3
   */
  async deleteImage(imageUrl: string): Promise<void> {
    try {
      // Wyciągnij key z URL
      const url = new URL(imageUrl);
      const key = url.pathname.substring(1); // usuń pierwszy /

      const command = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      });

      await s3Client.send(command);
    } catch (error: any) {
      console.error("Delete error:", error);
      throw new Error(`Failed to delete image: ${error.message}`);
    }
  }

  /**
   * Upload wielu obrazów naraz
   */
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

export const uploadService = new UploadService();
