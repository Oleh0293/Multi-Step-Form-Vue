export type PhoneNumber = string;

export interface Experience {
    company: string;
    position: string;
    dateFrom: string;
    dateTo: string;
}

export interface Form {
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    phone?: PhoneNumber;
    email?: string;
    experiences?: Experience[];
}
