import { createClient } from './client'
import { Database } from './types'

export type LiveClass = Database['public']['Tables']['live_classes']['Row'] & {
  instructor: Database['public']['Tables']['instructors']['Row']
  language: Database['public']['Tables']['languages']['Row']
  level: Database['public']['Tables']['levels']['Row']
  enrollment_count?: number
  is_enrolled?: boolean
}

export type RecordedClass = Database['public']['Tables']['recorded_classes']['Row'] & {
  instructor: Database['public']['Tables']['instructors']['Row']
  language: Database['public']['Tables']['languages']['Row']
  level: Database['public']['Tables']['levels']['Row']
}

export async function getLiveClasses(userId?: string) {
  const supabase = createClient()
  
  let query = supabase
    .from('live_classes')
    .select(`
      *,
      instructor:instructors(*),
      language:languages(*),
      level:levels(*)
    `)
    .eq('is_active', true)
    .gte('scheduled_at', new Date().toISOString())
    .order('scheduled_at', { ascending: true })

  const { data: classes, error } = await query

  if (error) {
    return { data: null, error }
  }

  // Obtener conteo de inscripciones y verificar si el usuario está inscrito
  const classesWithEnrollment = await Promise.all(
    classes.map(async (classItem) => {
      // Contar inscripciones
      const { count } = await supabase
        .from('class_enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('live_class_id', classItem.id)

      let isEnrolled = false
      if (userId) {
        const { data: enrollment } = await supabase
          .from('class_enrollments')
          .select('id')
          .eq('live_class_id', classItem.id)
          .eq('user_id', userId)
          .single()
        
        isEnrolled = !!enrollment
      }

      return {
        ...classItem,
        enrollment_count: count || 0,
        is_enrolled: isEnrolled,
      }
    })
  )

  return { data: classesWithEnrollment, error: null }
}

export async function getRecordedClasses(userId?: string) {
  const supabase = createClient()
  
  const { data: classes, error } = await supabase
    .from('recorded_classes')
    .select(`
      *,
      instructor:instructors(*),
      language:languages(*),
      level:levels(*)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    return { data: null, error }
  }

  // Filtrar clases premium si el usuario no tiene suscripción
  let filteredClasses = classes
  if (userId) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_status, subscription_expires_at')
      .eq('id', userId)
      .single()

    const hasPremium = profile?.subscription_status === 'premium' && 
      (!profile.subscription_expires_at || new Date(profile.subscription_expires_at) > new Date())

    if (!hasPremium) {
      filteredClasses = classes.filter(c => !c.is_premium)
    }
  } else {
    // Usuario no autenticado, solo mostrar clases gratuitas
    filteredClasses = classes.filter(c => !c.is_premium)
  }

  return { data: filteredClasses, error: null }
}

export async function enrollInClass(userId: string, classId: string) {
  const supabase = createClient()
  
  // Verificar que la clase existe y tiene cupo
  const { data: classData, error: classError } = await supabase
    .from('live_classes')
    .select('max_students')
    .eq('id', classId)
    .single()

  if (classError || !classData) {
    return { data: null, error: classError || new Error('Clase no encontrada') }
  }

  // Contar inscripciones actuales
  const { count } = await supabase
    .from('class_enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('live_class_id', classId)

  if (count && count >= classData.max_students) {
    return { data: null, error: new Error('La clase está llena') }
  }

  // Inscribir al usuario
  const { data, error } = await supabase
    .from('class_enrollments')
    .insert({
      user_id: userId,
      live_class_id: classId,
    })
    .select()
    .single()

  return { data, error }
}

export async function unenrollFromClass(userId: string, classId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('class_enrollments')
    .delete()
    .eq('user_id', userId)
    .eq('live_class_id', classId)
    .select()
    .single()

  return { data, error }
}

export async function getUserEnrollments(userId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('class_enrollments')
    .select(`
      *,
      live_class:live_classes(
        *,
        instructor:instructors(*),
        language:languages(*),
        level:levels(*)
      )
    `)
    .eq('user_id', userId)
    .order('enrolled_at', { ascending: false })

  return { data, error }
}

export async function incrementViewCount(classId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.rpc('increment_view_count', {
    class_id: classId
  })

  return { data, error }
}