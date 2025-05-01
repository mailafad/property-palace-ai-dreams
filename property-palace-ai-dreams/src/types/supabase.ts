
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string
          title: string
          price: number
          address: string
          city: string
          state: string
          zip_code: string
          description: string
          ai_description: string | null
          type: string
          bedrooms: number
          bathrooms: number
          area: number
          year_built: number
          features: Json
          images: string[]
          featured: boolean
          status: string
          created_at: string
          updated_at: string
          realtor_id: string | null
        }
        Insert: {
          id?: string
          title: string
          price: number
          address: string
          city: string
          state: string
          zip_code: string
          description: string
          ai_description?: string | null
          type: string
          bedrooms: number
          bathrooms: number
          area: number
          year_built: number
          features: Json
          images: string[]
          featured?: boolean
          status: string
          created_at?: string
          updated_at?: string
          realtor_id?: string | null
        }
        Update: {
          id?: string
          title?: string
          price?: number
          address?: string
          city?: string
          state?: string
          zip_code?: string
          description?: string
          ai_description?: string | null
          type?: string
          bedrooms?: number
          bathrooms?: number
          area?: number
          year_built?: number
          features?: Json
          images?: string[]
          featured?: boolean
          status?: string
          created_at?: string
          updated_at?: string
          realtor_id?: string | null
        }
      }
      realtors: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          photo: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          photo?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          photo?: string | null
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string
          avatar_url: string | null
          email: string
          role: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          avatar_url?: string | null
          email: string
          role?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          avatar_url?: string | null
          email?: string
          role?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
