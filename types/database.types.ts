export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      meal_assignments: {
        Row: {
          created_at: string
          id: number
          meal_id: number | null
          meal_plan_day_id: number | null
          type: Database["public"]["Enums"]["meal_type"] | null
        }
        Insert: {
          created_at?: string
          id?: number
          meal_id?: number | null
          meal_plan_day_id?: number | null
          type?: Database["public"]["Enums"]["meal_type"] | null
        }
        Update: {
          created_at?: string
          id?: number
          meal_id?: number | null
          meal_plan_day_id?: number | null
          type?: Database["public"]["Enums"]["meal_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "meal_assignments_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_assignments_meal_plan_day_id_fkey"
            columns: ["meal_plan_day_id"]
            isOneToOne: false
            referencedRelation: "meal_plan_days"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_plan_days: {
        Row: {
          calories: string | null
          carbs: string | null
          created_at: string
          day: string
          fats: string | null
          id: number
          meal_plan_id: number
          protein: string | null
        }
        Insert: {
          calories?: string | null
          carbs?: string | null
          created_at?: string
          day: string
          fats?: string | null
          id?: number
          meal_plan_id: number
          protein?: string | null
        }
        Update: {
          calories?: string | null
          carbs?: string | null
          created_at?: string
          day?: string
          fats?: string | null
          id?: number
          meal_plan_id?: number
          protein?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meal_plan_days_meal_plan_id_fkey"
            columns: ["meal_plan_id"]
            isOneToOne: false
            referencedRelation: "meal_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_plans: {
        Row: {
          created_at: string
          id: number
          meal_plan: Json[] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          meal_plan?: Json[] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          meal_plan?: Json[] | null
          user_id?: string | null
        }
        Relationships: []
      }
      meals: {
        Row: {
          calories: string | null
          carbs: string | null
          created_at: string
          description: string | null
          fats: string | null
          id: number
          name: string | null
          protein: string | null
          type: string | null
        }
        Insert: {
          calories?: string | null
          carbs?: string | null
          created_at?: string
          description?: string | null
          fats?: string | null
          id?: number
          name?: string | null
          protein?: string | null
          type?: string | null
        }
        Update: {
          calories?: string | null
          carbs?: string | null
          created_at?: string
          description?: string | null
          fats?: string | null
          id?: number
          name?: string | null
          protein?: string | null
          type?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          completed_setup: boolean
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          personal_information: Json | null
        }
        Insert: {
          completed_setup?: boolean
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          personal_information?: Json | null
        }
        Update: {
          completed_setup?: boolean
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          personal_information?: Json | null
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
      meal_type: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
