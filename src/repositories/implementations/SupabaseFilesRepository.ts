import { v4 as uuid } from 'uuid';

import { supabase } from "@/global/supabaseClient";

import { IFilesRepository } from "../IFilesRepository";

export class SupabaseFilesRepository implements IFilesRepository {
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
        .from(process.env.SUPABASE_IMAGES_BUCKET as string)
        .upload(`${folderName}/${uuid()}.${fileType}`, buf, {
          contentType: `image/${fileType}`
        })

      if (error) throw(error)

      if (data) {
        return `${process.env.SUPABASE_PROJECT_URL}/storage/v1/object/public/${process.env.SUPABASE_IMAGES_BUCKET}/${data.path}`;
      } else {
        throw new Error('O upload do arquivo não retornou uma URL...')
      }
    } catch (error: any) {
      const errorMessage = error?.message ?? 'Erro desconhecido';

      throw new Error('Houve um erro no uploader de arquivos: ' + errorMessage);
    }
  }
}
