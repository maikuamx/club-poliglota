import { createClient } from './client'
import { Database } from './types'

export type WeeklyActivity = Database['public']['Tables']['weekly_activities']['Row'] & {
  language: Database['public']['Tables']['languages']['Row']
  level: Database['public']['Tables']['levels']['Row']
  user_submission?: Database['public']['Tables']['activity_submissions']['Row']
}

export type ActivitySubmission = Database['public']['Tables']['activity_submissions']['Row']

export async function getWeeklyActivities(userId?: string) {
  const supabase = createClient()
  
  const { data: activities, error } = await supabase
    .from('weekly_activities')
    .select(`
      *,
      language:languages(*),
      level:levels(*)
    `)
    .eq('is_active', true)
    .order('due_date', { ascending: true })

  if (error) {
    return { data: null, error }
  }

  // Si hay usuario, obtener sus entregas
  if (userId) {
    const activitiesWithSubmissions = await Promise.all(
      activities.map(async (activity) => {
        const { data: submission } = await supabase
          .from('activity_submissions')
          .select('*')
          .eq('activity_id', activity.id)
          .eq('user_id', userId)
          .single()

        return {
          ...activity,
          user_submission: submission || undefined,
        }
      })
    )

    return { data: activitiesWithSubmissions, error: null }
  }

  return { data: activities, error: null }
}

export async function submitActivity(
  userId: string,
  activityId: string,
  fileUrl: string,
  fileName: string,
  fileSizeBytes: number,
  comments?: string
) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('activity_submissions')
    .upsert({
      user_id: userId,
      activity_id: activityId,
      file_url: fileUrl,
      file_name: fileName,
      file_size_bytes: fileSizeBytes,
      comments: comments || null,
    })
    .select()
    .single()

  return { data, error }
}

export async function getUserSubmissions(userId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('activity_submissions')
    .select(`
      *,
      activity:weekly_activities(
        *,
        language:languages(*),
        level:levels(*)
      )
    `)
    .eq('user_id', userId)
    .order('submitted_at', { ascending: false })

  return { data, error }
}

export async function uploadActivityFile(file: File, userId: string, activityId: string) {
  const supabase = createClient()
  
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${activityId}/${Date.now()}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('activity-submissions')
    .upload(fileName, file)

  if (error) {
    return { data: null, error }
  }

  const { data: { publicUrl } } = supabase.storage
    .from('activity-submissions')
    .getPublicUrl(fileName)

  return { data: { path: fileName, url: publicUrl }, error: null }
}

export async function deleteActivityFile(filePath: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.storage
    .from('activity-submissions')
    .remove([filePath])

  return { data, error }
}