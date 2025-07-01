import { createClient } from './client'
import { Database } from './types'

export type ForumCategory = Database['public']['Tables']['forum_categories']['Row']

export type ForumTopic = Database['public']['Tables']['forum_topics']['Row'] & {
  author: Database['public']['Tables']['profiles']['Row']
  category: Database['public']['Tables']['forum_categories']['Row']
  language?: Database['public']['Tables']['languages']['Row']
}

export type ForumReply = Database['public']['Tables']['forum_replies']['Row'] & {
  author: Database['public']['Tables']['profiles']['Row']
  replies?: ForumReply[]
}

export async function getForumCategories() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('forum_categories')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true })

  return { data, error }
}

export async function getForumTopics(categoryId?: string, limit = 20, offset = 0) {
  const supabase = createClient()
  
  let query = supabase
    .from('forum_topics')
    .select(`
      *,
      author:profiles(*),
      category:forum_categories(*),
      language:languages(*)
    `)

  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }

  const { data, error } = await query
    .order('is_pinned', { ascending: false })
    .order('last_reply_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  return { data, error }
}

export async function getForumTopic(topicId: string) {
  const supabase = createClient()
  
  // Incrementar contador de vistas
  await supabase.rpc('increment_topic_views', { topic_id: topicId })
  
  const { data, error } = await supabase
    .from('forum_topics')
    .select(`
      *,
      author:profiles(*),
      category:forum_categories(*),
      language:languages(*)
    `)
    .eq('id', topicId)
    .single()

  return { data, error }
}

export async function getForumReplies(topicId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('forum_replies')
    .select(`
      *,
      author:profiles(*)
    `)
    .eq('topic_id', topicId)
    .is('parent_reply_id', null)
    .order('created_at', { ascending: true })

  if (error) {
    return { data: null, error }
  }

  // Obtener respuestas anidadas
  const repliesWithNested = await Promise.all(
    data.map(async (reply) => {
      const { data: nestedReplies } = await supabase
        .from('forum_replies')
        .select(`
          *,
          author:profiles(*)
        `)
        .eq('parent_reply_id', reply.id)
        .order('created_at', { ascending: true })

      return {
        ...reply,
        replies: nestedReplies || [],
      }
    })
  )

  return { data: repliesWithNested, error: null }
}

export async function createForumTopic(
  title: string,
  content: string,
  authorId: string,
  categoryId: string,
  languageId?: string
) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('forum_topics')
    .insert({
      title,
      content,
      author_id: authorId,
      category_id: categoryId,
      language_id: languageId || null,
    })
    .select()
    .single()

  return { data, error }
}

export async function createForumReply(
  content: string,
  authorId: string,
  topicId: string,
  parentReplyId?: string
) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('forum_replies')
    .insert({
      content,
      author_id: authorId,
      topic_id: topicId,
      parent_reply_id: parentReplyId || null,
    })
    .select()
    .single()

  return { data, error }
}

export async function updateForumTopic(
  topicId: string,
  authorId: string,
  updates: { title?: string; content?: string }
) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('forum_topics')
    .update(updates)
    .eq('id', topicId)
    .eq('author_id', authorId)
    .select()
    .single()

  return { data, error }
}

export async function updateForumReply(
  replyId: string,
  authorId: string,
  content: string
) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('forum_replies')
    .update({ content })
    .eq('id', replyId)
    .eq('author_id', authorId)
    .select()
    .single()

  return { data, error }
}

export async function deleteForumTopic(topicId: string, authorId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('forum_topics')
    .delete()
    .eq('id', topicId)
    .eq('author_id', authorId)
    .select()
    .single()

  return { data, error }
}

export async function deleteForumReply(replyId: string, authorId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('forum_replies')
    .delete()
    .eq('id', replyId)
    .eq('author_id', authorId)
    .select()
    .single()

  return { data, error }
}