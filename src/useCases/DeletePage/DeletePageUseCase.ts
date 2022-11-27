import { IPagesRepository } from "@/repositories/IPagesRepository";

export class DeletePageUseCase {
  constructor(private pagesRepository: IPagesRepository) {}

  async execute(id: string) {
    const pageExists = await this.pagesRepository.findById(id);

    if (!pageExists) {
      throw new Error('Página a ser deletada não existe.');
    }

    await this.pagesRepository.delete(id);
  }
}
