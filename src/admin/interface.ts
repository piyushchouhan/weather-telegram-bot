// src/admin/interfaces.ts

export interface User {
    id: number;
    email: string;
    blocked: boolean;
  }
  
  export interface Settings {
    apiKey: string;
    city: string;
  }