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
          last_name: string
          registry_key: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: number
          item_id: number
          last_name: string
          registry_key: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: number
          item_id?: number
          last_name?: string
          registry_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "gift_tracker_item_id_fkey"
            columns: ["item_id"]
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gift_tracker_registry_key_fkey"
            columns: ["registry_key"]
            referencedRelation: "registry"
            referencedColumns: ["key"]
          }
        ]
      }
      items: {
        Row: {
          category_id: string
          created_at: string
          id: number
          link: string
          name: string
          price: number
          purchased_status: boolean
          registry_key: string
          user_id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: number
          link: string
          name: string
          price: number
          purchased_status?: boolean
          registry_key: string
          user_id?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: number
          link?: string
          name?: string
          price?: number
          purchased_status?: boolean
          registry_key?: string
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
            foreignKeyName: "items_registry_key_fkey"
            columns: ["registry_key"]
            referencedRelation: "registry"
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
      registry: {
        Row: {
          created_at: string
          id: number
          key: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          key: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          key?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "registry_user_id_fkey"
            columns: ["user_id"]
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
