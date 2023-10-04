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
          created_at: string | null
          id: number
          title: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          title?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      gift_tracker: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string | null
          id: number
          item_id: number | null
          last_last: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: number
          item_id?: number | null
          last_last?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: number
          item_id?: number | null
          last_last?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gift_tracker_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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
          category_id: number | null
          created_at: string | null
          id: number
          link: string | null
          price: number | null
          purchased_status: boolean | null
          title: string | null
          user_id: number | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string | null
          id?: number
          link?: string | null
          price?: number | null
          purchased_status?: boolean | null
          title?: string | null
          user_id?: number | null
        }
        Update: {
          category_id?: number | null
          created_at?: string | null
          id?: number
          link?: string | null
          price?: number | null
          purchased_status?: boolean | null
          title?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "items_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "items_category_id_fkey1"
            columns: ["category_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string | null
          id: number
          last_name: string | null
          role: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          role?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          role?: string | null
          username?: string | null
        }
        Relationships: []
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
