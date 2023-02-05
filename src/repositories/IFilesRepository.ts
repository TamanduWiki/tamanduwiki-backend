export interface IFilesRepository {
  upload: (base64: string, folderName: string, fileType: string) => Promise<string>;
  override: (base64: string, fileUrl: string, fileType: string) => Promise<void>;
  delete: (fileUrl: string) => Promise<void>;
}
