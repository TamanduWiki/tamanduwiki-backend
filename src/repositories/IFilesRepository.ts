export interface IFilesRepository {
  upload: (base64: string, folderName: string, fileType: string) => Promise<string>;
}
