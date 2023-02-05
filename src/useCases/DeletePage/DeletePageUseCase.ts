import { IFilesRepository } from "@/repositories/IFilesRepository";
import { IPagesRepository } from "@/repositories/IPagesRepository";

export class DeletePageUseCase {
  constructor(private pagesRepository: IPagesRepository, private filesRepository: IFilesRepository) {}

  async execute(id: string) {
    const page = await this.pagesRepository.findById(id);
    const imgUrl = page?.imageUrl;

    if (!page) {
      throw new Error('Página a ser deletada não existe.');
    }

    await this.pagesRepository.delete(id);

    if (!!imgUrl) {
      await this.filesRepository.delete(imgUrl);
    }
  }
}
