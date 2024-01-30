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
      catalog: {
        Row: {
          banner: string | null
          catalog_state: Database["public"]["Enums"]["catalog_state_enum"]
          created_at: string
          custom_domain: string | null
          id: number
          key_id: string
          logo: string | null
          message_404: string
          meta_description: string | null
          nonce: string | null
          password: string | null
          subdomain: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          banner?: string | null
          catalog_state?: Database["public"]["Enums"]["catalog_state_enum"]
          created_at?: string
          custom_domain?: string | null
          id?: number
          key_id?: string
          logo?: string | null
          message_404?: string
          meta_description?: string | null
          nonce?: string | null
          password?: string | null
          subdomain: string
          title: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          banner?: string | null
          catalog_state?: Database["public"]["Enums"]["catalog_state_enum"]
          created_at?: string
          custom_domain?: string | null
          id?: number
          key_id?: string
          logo?: string | null
          message_404?: string
          meta_description?: string | null
          nonce?: string | null
          password?: string | null
          subdomain?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "catalog_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      client: {
        Row: {
          alias: string | null
          alternative_phone: string | null
          created_at: string
          description: string | null
          email: string | null
          id: number
          name: string
          telephone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          alias?: string | null
          alternative_phone?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: number
          name: string
          telephone?: string | null
          updated_at?: string
          user_id?: string
        }
        Update: {
          alias?: string | null
          alternative_phone?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: number
          name?: string
          telephone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      contact_information: {
        Row: {
          catalog_id: number
          created_at: string
          email: string | null
          facebook: string | null
          id: number
          instagram: string | null
          phone: string | null
          tiktok: string | null
          updated_at: string
          use_account_information: boolean
        }
        Insert: {
          catalog_id?: number
          created_at?: string
          email?: string | null
          facebook?: string | null
          id?: number
          instagram?: string | null
          phone?: string | null
          tiktok?: string | null
          updated_at?: string
          use_account_information?: boolean
        }
        Update: {
          catalog_id?: number
          created_at?: string
          email?: string | null
          facebook?: string | null
          id?: number
          instagram?: string | null
          phone?: string | null
          tiktok?: string | null
          updated_at?: string
          use_account_information?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "contact_information_catalog_id_fkey"
            columns: ["catalog_id"]
            isOneToOne: false
            referencedRelation: "catalog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_information_catalog_id_fkey"
            columns: ["catalog_id"]
            isOneToOne: false
            referencedRelation: "decrypted_catalog"
            referencedColumns: ["id"]
          }
        ]
      }
      debt_client: {
        Row: {
          client_id: number
          created_at: string
          id: number
          status: Database["public"]["Enums"]["debt_client_status"]
          total_pending: number
          updated_at: string
        }
        Insert: {
          client_id: number
          created_at?: string
          id?: number
          status: Database["public"]["Enums"]["debt_client_status"]
          total_pending: number
          updated_at?: string
        }
        Update: {
          client_id?: number
          created_at?: string
          id?: number
          status?: Database["public"]["Enums"]["debt_client_status"]
          total_pending?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_debt_client"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          }
        ]
      }
      debt_provider: {
        Row: {
          created_at: string
          id: number
          provider_id: number
          status: Database["public"]["Enums"]["debt_provider_status"]
          total_pending: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          provider_id: number
          status: Database["public"]["Enums"]["debt_provider_status"]
          total_pending: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          provider_id?: number
          status?: Database["public"]["Enums"]["debt_provider_status"]
          total_pending?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_debt_provider"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "provider"
            referencedColumns: ["id"]
          }
        ]
      }
      discount: {
        Row: {
          created_at: string
          id: number
          type: Database["public"]["Enums"]["discount_type"]
          updated_at: string
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string
          id?: number
          type: Database["public"]["Enums"]["discount_type"]
          updated_at?: string
          user_id?: string
          value: number
        }
        Update: {
          created_at?: string
          id?: number
          type?: Database["public"]["Enums"]["discount_type"]
          updated_at?: string
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "discount_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      expense: {
        Row: {
          created_at: string
          date: string
          debt_id: number | null
          description: string | null
          expense_category_id: number
          expense_number: number
          expense_state: Database["public"]["Enums"]["expense_state_enum"]
          expense_type: Database["public"]["Enums"]["expense_type_enum"]
          id: number
          payment_form_id: number | null
          photo: string | null
          provider_id: number | null
          status: Database["public"]["Enums"]["expense_status_enum"]
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          debt_id?: number | null
          description?: string | null
          expense_category_id: number
          expense_number?: number
          expense_state?: Database["public"]["Enums"]["expense_state_enum"]
          expense_type?: Database["public"]["Enums"]["expense_type_enum"]
          id?: number
          payment_form_id?: number | null
          photo?: string | null
          provider_id?: number | null
          status: Database["public"]["Enums"]["expense_status_enum"]
          total: number
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          date?: string
          debt_id?: number | null
          description?: string | null
          expense_category_id?: number
          expense_number?: number
          expense_state?: Database["public"]["Enums"]["expense_state_enum"]
          expense_type?: Database["public"]["Enums"]["expense_type_enum"]
          id?: number
          payment_form_id?: number | null
          photo?: string | null
          provider_id?: number | null
          status?: Database["public"]["Enums"]["expense_status_enum"]
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "expense_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_expense_category"
            columns: ["expense_category_id"]
            isOneToOne: false
            referencedRelation: "expense_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_expense_payment_method"
            columns: ["payment_form_id"]
            isOneToOne: false
            referencedRelation: "payment_form"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_expense_provider"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "provider"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_sale_debt_provider"
            columns: ["debt_id"]
            isOneToOne: false
            referencedRelation: "debt_provider"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_sale_debt_provider"
            columns: ["debt_id"]
            isOneToOne: false
            referencedRelation: "debt_provider_view"
            referencedColumns: ["id"]
          }
        ]
      }
      expense_category: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          name_code: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          name_code: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          name_code?: string
          updated_at?: string
        }
        Relationships: []
      }
      expense_item: {
        Row: {
          cost_price_applied: number
          cost_price_at_the_moment: number
          created_at: string
          expense_id: number
          id: number
          item_id: number
          quantity: number
          updated_at: string
        }
        Insert: {
          cost_price_applied: number
          cost_price_at_the_moment: number
          created_at?: string
          expense_id: number
          id?: number
          item_id: number
          quantity: number
          updated_at?: string
        }
        Update: {
          cost_price_applied?: number
          cost_price_at_the_moment?: number
          created_at?: string
          expense_id?: number
          id?: number
          item_id?: number
          quantity?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_expense_item"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "expense"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_expense_item_item"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "item"
            referencedColumns: ["id"]
          }
        ]
      }
      item: {
        Row: {
          catalog_status: Database["public"]["Enums"]["catalog_status_en"]
          cost: number | null
          created_at: string
          description: string | null
          id: number
          item_category_id: number | null
          name: string
          quantity: number
          sale_price: number
          sku: string | null
          slug: string
          status: Database["public"]["Enums"]["item_status"]
          type: Database["public"]["Enums"]["item_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          catalog_status?: Database["public"]["Enums"]["catalog_status_en"]
          cost?: number | null
          created_at?: string
          description?: string | null
          id?: number
          item_category_id?: number | null
          name: string
          quantity: number
          sale_price: number
          sku?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["item_status"]
          type: Database["public"]["Enums"]["item_type"]
          updated_at?: string
          user_id?: string
        }
        Update: {
          catalog_status?: Database["public"]["Enums"]["catalog_status_en"]
          cost?: number | null
          created_at?: string
          description?: string | null
          id?: number
          item_category_id?: number | null
          name?: string
          quantity?: number
          sale_price?: number
          sku?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["item_status"]
          type?: Database["public"]["Enums"]["item_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_item_category"
            columns: ["item_category_id"]
            isOneToOne: false
            referencedRelation: "item_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      item_category: {
        Row: {
          created_at: string
          id: number
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "item_category_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      item_cost: {
        Row: {
          cost: number
          created_at: string
          id: number
          item_id: number
          updated_at: string
        }
        Insert: {
          cost: number
          created_at?: string
          id?: number
          item_id: number
          updated_at?: string
        }
        Update: {
          cost?: number
          created_at?: string
          id?: number
          item_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_item_cost"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "item"
            referencedColumns: ["id"]
          }
        ]
      }
      item_image: {
        Row: {
          created_at: string
          id: number
          item_id: number | null
          position: number
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: number
          item_id?: number | null
          position: number
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: number
          item_id?: number | null
          position?: number
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_item_image_item"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "item"
            referencedColumns: ["id"]
          }
        ]
      }
      notification: {
        Row: {
          body: string | null
          created_at: string
          id: number
          image: string | null
          title: string | null
          type: Database["public"]["Enums"]["notificationtype"] | null
          updated_at: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: number
          image?: string | null
          title?: string | null
          type?: Database["public"]["Enums"]["notificationtype"] | null
          updated_at?: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: number
          image?: string | null
          title?: string | null
          type?: Database["public"]["Enums"]["notificationtype"] | null
          updated_at?: string
        }
        Relationships: []
      }
      payment_debt_client: {
        Row: {
          created_at: string
          date: string
          debt_client_id: number
          id: number
          payment_form_id: number
          total: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          debt_client_id: number
          id?: number
          payment_form_id: number
          total: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          debt_client_id?: number
          id?: number
          payment_form_id?: number
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_payment_debt_client"
            columns: ["debt_client_id"]
            isOneToOne: false
            referencedRelation: "debt_client"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_payment_debt_client"
            columns: ["debt_client_id"]
            isOneToOne: false
            referencedRelation: "debt_client_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_payment_debt_client_method"
            columns: ["payment_form_id"]
            isOneToOne: false
            referencedRelation: "payment_form"
            referencedColumns: ["id"]
          }
        ]
      }
      payment_debt_provider: {
        Row: {
          created_at: string
          date: string
          debt_provider_id: number
          id: number
          payment_form_id: number
          total: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          debt_provider_id: number
          id?: number
          payment_form_id: number
          total: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          debt_provider_id?: number
          id?: number
          payment_form_id?: number
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_payment_debt_provider"
            columns: ["debt_provider_id"]
            isOneToOne: false
            referencedRelation: "debt_provider"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_payment_debt_provider"
            columns: ["debt_provider_id"]
            isOneToOne: false
            referencedRelation: "debt_provider_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_payment_debt_provider_method"
            columns: ["payment_form_id"]
            isOneToOne: false
            referencedRelation: "payment_form"
            referencedColumns: ["id"]
          }
        ]
      }
      payment_form: {
        Row: {
          created_at: string
          id: number
          name: string
          name_code: Database["public"]["Enums"]["name_code_enum"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          name_code: Database["public"]["Enums"]["name_code_enum"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          name_code?: Database["public"]["Enums"]["name_code_enum"]
          updated_at?: string
        }
        Relationships: []
      }
      payment_provider: {
        Row: {
          created_at: string
          id: number
          name: Database["public"]["Enums"]["payment_provider_name"]
          reference: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          name?: Database["public"]["Enums"]["payment_provider_name"]
          reference: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: Database["public"]["Enums"]["payment_provider_name"]
          reference?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_provider_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      point_of_sale: {
        Row: {
          created_at: string
          id: number
          location: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          location: string
          name: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          location?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "point_of_sale_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      provider: {
        Row: {
          alias: string | null
          alternative_phone: string | null
          created_at: string
          description: string | null
          email: string | null
          id: number
          name: string
          telephone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          alias?: string | null
          alternative_phone?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: number
          name: string
          telephone?: string | null
          updated_at?: string
          user_id?: string
        }
        Update: {
          alias?: string | null
          alternative_phone?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: number
          name?: string
          telephone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sale: {
        Row: {
          client_id: number | null
          created_at: string
          date: string
          debt_id: number | null
          description: string | null
          discount_id: number | null
          id: number
          payment_form_id: number | null
          payment_provider_id: number | null
          point_of_sale_id: number | null
          sale_channel_id: number | null
          sale_number: number
          sale_state: Database["public"]["Enums"]["sale_state_enum"]
          sale_type: Database["public"]["Enums"]["sale_type_enum"]
          status: Database["public"]["Enums"]["sale_status_enum"]
          subtotal: number
          total_applied: number
          updated_at: string
          user_id: string
        }
        Insert: {
          client_id?: number | null
          created_at?: string
          date: string
          debt_id?: number | null
          description?: string | null
          discount_id?: number | null
          id?: number
          payment_form_id?: number | null
          payment_provider_id?: number | null
          point_of_sale_id?: number | null
          sale_channel_id?: number | null
          sale_number?: number
          sale_state?: Database["public"]["Enums"]["sale_state_enum"]
          sale_type: Database["public"]["Enums"]["sale_type_enum"]
          status: Database["public"]["Enums"]["sale_status_enum"]
          subtotal: number
          total_applied: number
          updated_at?: string
          user_id?: string
        }
        Update: {
          client_id?: number | null
          created_at?: string
          date?: string
          debt_id?: number | null
          description?: string | null
          discount_id?: number | null
          id?: number
          payment_form_id?: number | null
          payment_provider_id?: number | null
          point_of_sale_id?: number | null
          sale_channel_id?: number | null
          sale_number?: number
          sale_state?: Database["public"]["Enums"]["sale_state_enum"]
          sale_type?: Database["public"]["Enums"]["sale_type_enum"]
          status?: Database["public"]["Enums"]["sale_status_enum"]
          subtotal?: number
          total_applied?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_sale_channel"
            columns: ["sale_channel_id"]
            isOneToOne: false
            referencedRelation: "sale_channel"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_sale_client"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_sale_debt_client"
            columns: ["debt_id"]
            isOneToOne: false
            referencedRelation: "debt_client"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_sale_debt_client"
            columns: ["debt_id"]
            isOneToOne: false
            referencedRelation: "debt_client_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_sale_discount"
            columns: ["discount_id"]
            isOneToOne: false
            referencedRelation: "discount"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_sale_payment_method"
            columns: ["payment_form_id"]
            isOneToOne: false
            referencedRelation: "payment_form"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_sale_payment_provider"
            columns: ["payment_provider_id"]
            isOneToOne: false
            referencedRelation: "payment_provider"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_sale_point_of_sale"
            columns: ["point_of_sale_id"]
            isOneToOne: false
            referencedRelation: "point_of_sale"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sale_channel: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      sale_item: {
        Row: {
          created_at: string
          id: number
          item_id: number
          quantity: number
          sale_id: number
          sale_price_applied: number
          sale_price_at_the_moment: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          item_id: number
          quantity: number
          sale_id: number
          sale_price_applied: number
          sale_price_at_the_moment: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          item_id?: number
          quantity?: number
          sale_id?: number
          sale_price_applied?: number
          sale_price_at_the_moment?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_sale_item"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "item"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_sale_item_sale"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sale"
            referencedColumns: ["id"]
          }
        ]
      }
      user: {
        Row: {
          business_description: string | null
          business_type: Database["public"]["Enums"]["business_type"] | null
          bussines_name: string | null
          created_at: string
          deleted_at: string | null
          email: string | null
          id: string
          name: string | null
          number: string | null
          provider: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          business_description?: string | null
          business_type?: Database["public"]["Enums"]["business_type"] | null
          bussines_name?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          id: string
          name?: string | null
          number?: string | null
          provider?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          business_description?: string | null
          business_type?: Database["public"]["Enums"]["business_type"] | null
          bussines_name?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          number?: string | null
          provider?: string | null
          role?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_notification_state: {
        Row: {
          created_at: string
          id: number
          notification_id: number
          updated_at: string
          user_id: string
          viewed: boolean | null
        }
        Insert: {
          created_at?: string
          id?: number
          notification_id: number
          updated_at?: string
          user_id?: string
          viewed?: boolean | null
        }
        Update: {
          created_at?: string
          id?: number
          notification_id?: number
          updated_at?: string
          user_id?: string
          viewed?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "user_notification_state_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "notification"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_notification_state_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_notification_tokens: {
        Row: {
          created_at: string
          id: number
          token: string | null
          token_status:
            | Database["public"]["Enums"]["notificationtokenstatus"]
            | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: never
          token?: string | null
          token_status?:
            | Database["public"]["Enums"]["notificationtokenstatus"]
            | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: never
          token?: string | null
          token_status?:
            | Database["public"]["Enums"]["notificationtokenstatus"]
            | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_notification_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      debt_client_view: {
        Row: {
          client_id: number | null
          id: number | null
          status: Database["public"]["Enums"]["debt_client_status"] | null
          total_debt: number | null
          total_pending: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_debt_client"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          }
        ]
      }
      debt_provider_view: {
        Row: {
          id: number | null
          provider_id: number | null
          status: Database["public"]["Enums"]["debt_provider_status"] | null
          total_debt: number | null
          total_pending: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_debt_provider"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "provider"
            referencedColumns: ["id"]
          }
        ]
      }
      decrypted_catalog: {
        Row: {
          banner: string | null
          catalog_state:
            | Database["public"]["Enums"]["catalog_state_enum"]
            | null
          created_at: string | null
          custom_domain: string | null
          decrypted_password: string | null
          id: number | null
          key_id: string | null
          logo: string | null
          message_404: string | null
          meta_description: string | null
          nonce: string | null
          password: string | null
          subdomain: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          banner?: string | null
          catalog_state?:
            | Database["public"]["Enums"]["catalog_state_enum"]
            | null
          created_at?: string | null
          custom_domain?: string | null
          decrypted_password?: never
          id?: number | null
          key_id?: string | null
          logo?: string | null
          message_404?: string | null
          meta_description?: string | null
          nonce?: string | null
          password?: string | null
          subdomain?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          banner?: string | null
          catalog_state?:
            | Database["public"]["Enums"]["catalog_state_enum"]
            | null
          created_at?: string | null
          custom_domain?: string | null
          decrypted_password?: never
          id?: number | null
          key_id?: string | null
          logo?: string | null
          message_404?: string | null
          meta_description?: string | null
          nonce?: string | null
          password?: string | null
          subdomain?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "catalog_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      item_selling_performance_view: {
        Row: {
          date: string | null
          gross_sales: number | null
          item_id: number | null
          status: Database["public"]["Enums"]["item_status"] | null
          total_quantity_sold: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_sale_item"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "item"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      payment_debt_expense_view: {
        Row: {
          created_at: string | null
          date: string | null
          debt_provider_id: number | null
          description: string | null
          expense_date: string | null
          expense_number: number | null
          expense_state:
            | Database["public"]["Enums"]["expense_state_enum"]
            | null
          expense_total: number | null
          expense_type: Database["public"]["Enums"]["expense_type_enum"] | null
          id: number | null
          payment_form_id: number | null
          provider_id: number | null
          status: Database["public"]["Enums"]["expense_status_enum"] | null
          total: number | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_expense_provider"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "provider"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_payment_debt_provider"
            columns: ["debt_provider_id"]
            isOneToOne: false
            referencedRelation: "debt_provider"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_payment_debt_provider"
            columns: ["debt_provider_id"]
            isOneToOne: false
            referencedRelation: "debt_provider_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_payment_debt_provider_method"
            columns: ["payment_form_id"]
            isOneToOne: false
            referencedRelation: "payment_form"
            referencedColumns: ["id"]
          }
        ]
      }
      payment_debt_sale_view: {
        Row: {
          client_id: number | null
          created_at: string | null
          date: string | null
          debt_client_id: number | null
          description: string | null
          id: number | null
          payment_form_id: number | null
          sale_date: string | null
          sale_number: number | null
          sale_state: Database["public"]["Enums"]["sale_state_enum"] | null
          sale_type: Database["public"]["Enums"]["sale_type_enum"] | null
          status: Database["public"]["Enums"]["sale_status_enum"] | null
          total: number | null
          total_applied: number | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_payment_debt_client"
            columns: ["debt_client_id"]
            isOneToOne: false
            referencedRelation: "debt_client"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_payment_debt_client"
            columns: ["debt_client_id"]
            isOneToOne: false
            referencedRelation: "debt_client_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_payment_debt_client_method"
            columns: ["payment_form_id"]
            isOneToOne: false
            referencedRelation: "payment_form"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_sale_client"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      add_column_to_view: {
        Args: {
          view_name: string
          new_column_name: string
        }
        Returns: undefined
      }
      check_sales_existence: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      delete_column_from_view: {
        Args: {
          view_name: string
          column_name: string
        }
        Returns: undefined
      }
      delete_user_storage_objects: {
        Args: {
          user_id: string
        }
        Returns: undefined
      }
      generate_slug: {
        Args: {
          user_id_in: string
          name_in: string
        }
        Returns: string
      }
      generate_unique_url: {
        Args: {
          business_name: string
        }
        Returns: string
      }
      get_active_users_count: {
        Args: {
          min_sales: number
          start_date: string
          end_date: string
        }
        Returns: number
      }
      get_base_slug: {
        Args: {
          name_in: string
        }
        Returns: string
      }
      get_catalog_id_for_authenticated_user: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_clients_for_authenticated_users: {
        Args: Record<PropertyKey, never>
        Returns: number[]
      }
      get_expenses_for_authenticated_users: {
        Args: Record<PropertyKey, never>
        Returns: number[]
      }
      get_items_for_authenticated_users: {
        Args: Record<PropertyKey, never>
        Returns: number[]
      }
      get_providers_for_authenticated_users: {
        Args: Record<PropertyKey, never>
        Returns: number[]
      }
      get_retained_users: {
        Args: {
          start_date: string
          end_date: string
        }
        Returns: string[]
      }
      get_retained_users_count: {
        Args: {
          start_date: string
          end_date: string
        }
        Returns: number
      }
      get_sales_for_authenticated_users: {
        Args: Record<PropertyKey, never>
        Returns: number[]
      }
      get_user_notification_tokens: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>[]
      }
      get_users_with_consecutive_sales: {
        Args: {
          start_date: string
          end_date: string
        }
        Returns: {
          result_user_id: string
        }[]
      }
      get_users_without_clients_notification_tokens: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>[]
      }
      get_users_without_products_notification_tokens: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>[]
      }
      get_users_without_providers_notification_tokens: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>[]
      }
      set_user_catalog: {
        Args: {
          input_user_id: string
        }
        Returns: undefined
      }
      unaccent: {
        Args: {
          "": string
        }
        Returns: string
      }
      unaccent_init: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
    }
    Enums: {
      business_type: "products" | "services" | "products and services"
      catalog_state_enum: "published" | "hidden"
      catalog_status: "draft" | "active"
      catalog_status_en: "active" | "inactive"
      debt_client_status: "paid" | "pending"
      debt_provider_status: "paid" | "pending"
      discount_type: "fixed" | "proportional"
      expense_state_enum: "active" | "deleted"
      expense_status_enum: "paid" | "debt"
      expense_type_enum: "open_expense" | "items_expense"
      item_status: "active" | "deleted"
      item_type: "product" | "service"
      name_code_enum: "card" | "cash" | "bank transfer" | "other"
      notificationtokenstatus: "inactive" | "active"
      notificationtype:
        | "inactiveUsers"
        | "userWithoutProducts"
        | "userWithoutClients"
        | "userWithoutProviders"
        | "noAction"
      payment_provider_name: "zettle" | "clip"
      sale_state_enum: "active" | "deleted"
      sale_status_enum: "paid" | "debt"
      sale_type_enum: "open_sale" | "items_sale"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
