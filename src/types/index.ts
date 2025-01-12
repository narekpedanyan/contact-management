export interface TContact {
    id: string;
    name: string;
    userName: string;
    bio?: string;
    imageUrl?: string;
}

export type TContactFormValues = Omit<TContact, "id">;