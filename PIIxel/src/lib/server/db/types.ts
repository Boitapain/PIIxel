export interface Profile {
    id: string;
    ip_address: string;
    role: string;
    ui_language: string; 
    created_at: Date;       
}

export type profile = Profile[];