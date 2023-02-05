import { v4 as uuid } from 'uuid';

import { supabase } from "@/global/supabaseClient";

import { IFilesRepository } from "../IFilesRepository";

export class SupabaseFilesRepository implements IFilesRepository {
  private supabaseImagesBucket;
  private supabaseProjectUrl;

  constructor() {
    this.supabaseImagesBucket = process.env.SUPABASE_IMAGES_BUCKET;
    this.supabaseProjectUrl = process.env.SUPABASE_PROJECT_URL;
  }

  // For now only accepts some images formats
  async upload(base64: string, folderName: string, fileType: string): Promise<string> {
    try {
      if (!['jpeg', 'jpg', 'png'].includes(fileType)) {
        throw new Error('Formato de arquivo inválido. Formatos permitidos: jpg, jpeg, png')
      }

      // https://github.com/supabase/supabase/issues/7252
      const imageBase64Str = base64.replace(/^.+,/, '');

      const buf = Buffer.from(imageBase64Str, 'base64');
      //

      const { data, error } = await supabase
        .storage
        .from(this.supabaseImagesBucket as string)
        .upload(`${folderName}/${uuid()}.${fileType}`, buf, {
          contentType: `image/${fileType}`
        })

      if (error) throw(error)

      if (data) {
        return `${this.supabaseProjectUrl}/storage/v1/object/public/${this.supabaseImagesBucket}/${data.path}`;
      } else {
        throw new Error('O upload do arquivo não retornou uma URL...')
      }
    } catch (error: any) {
      const errorMessage = error?.message ?? 'Erro desconhecido';

      throw new Error('Houve um erro no uploader de arquivos: ' + errorMessage);
    }
  }

  async override(base64: string, fileUrl: string, fileType: string): Promise<void> {
    try {
      if (!['jpeg', 'jpg', 'png'].includes(fileType)) {
        throw new Error('Formato de arquivo inválido. Formatos permitidos: jpg, jpeg, png')
      }

      // https://github.com/supabase/supabase/issues/7252
      const imageBase64Str = base64.replace(/^.+,/, '');

      const buf = Buffer.from(imageBase64Str, 'base64');
      //

      const filePath = fileUrl.split(`${this.supabaseImagesBucket as string}/`)[1];

      const { data, error } = await supabase
        .storage
        .from(this.supabaseImagesBucket as string)
        .update(filePath, buf, {
          contentType: `image/${fileType}`,
          upsert: true,
        })

      if (error) throw(error)
    } catch (error: any) {
      const errorMessage = error?.message ?? 'Erro desconhecido';

      throw new Error('Houve um erro ao atualizar arquivo: ' + errorMessage);
    }
  }

  async delete(fileUrl: string): Promise<void> {
    try {
      const filePath = fileUrl.split(`${this.supabaseImagesBucket as string}/`)[1];

      const { data, error } = await supabase
        .storage
        .from(this.supabaseImagesBucket as string)
        .remove([filePath])

      if (error) throw(error)
    } catch (error: any) {
      const errorMessage = error?.message ?? 'Erro desconhecido';

      throw new Error('Houve um erro ao deletar arquivo: ' + errorMessage);
    }
  }
}
