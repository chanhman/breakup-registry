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
      categories: {
        Row: {
          created_at: string
          id: number
          key: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          key: string
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          key?: string
          name?: string
        }
        Relationships: []
      }
      gift_tracker: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: number
          item_id: number
          last_last: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: number
          item_id: number
          last_last: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: number
          item_id?: number
          last_last?: string
        }
        Relationships: [
          {
            foreignKeyName: "gift_tracker_item_id_fkey"
            columns: ["item_id"]
            referencedRelation: "items"
            referencedColumns: ["id"]
          }
        ]
      }
      items: {
        Row: {
          category_id: string | null
          created_at: string
          id: number
          link: string
          name: string
          price: number
          purchased_status: boolean
          user_id: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          id?: number
          link: string
          name: string
          price: number
          purchased_status?: boolean
          user_id: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          id?: number
          link?: string
          name?: string
          price?: number
          purchased_status?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "items_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["key"]
          },
          {
            foreignKeyName: "items_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          first_name: string
          id: string
          last_name: string
          role: string | null
          username: string
        }
        Insert: {
          created_at?: string
          first_name: string
          id: string
          last_name: string
          role?: string | null
          username: string
        }
        Update: {
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          role?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
