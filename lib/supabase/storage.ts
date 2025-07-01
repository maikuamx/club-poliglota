  import { createClient } from './client'
  
  export async function uploadFile(
    bucket: string,
    path: string,
    file: File,
    options?: {
      cacheControl?: string
      contentType?: string
      upsert?: boolean
    }
  ) {
    const supabase = createClient()
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, options)
  
    if (error) {
      return { data: null, error }
    }
  
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
  
    return { data: { ...data, publicUrl }, error: null }
  }
  
  export async function deleteFile(bucket: string, paths: string[]) {
    const supabase = createClient()
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove(paths)
  
    return { data, error }
  }
  
  export async function getFileUrl(bucket: string, path: string) {
    const supabase = createClient()
    
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
  
    return data.publicUrl
  }
  
  export async function createSignedUrl(
    bucket: string,
    path: string,
    expiresIn: number = 3600
  ) {
    const supabase = createClient()
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn)
  
    return { data, error }
  }
  
  export async function listFiles(bucket: string, path?: string) {
    const supabase = createClient()
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path)
  
    return { data, error }
  }