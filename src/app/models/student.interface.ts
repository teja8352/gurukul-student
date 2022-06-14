export interface Student extends TimeStamps, docID {
    email: string;
    first_name: string;
    last_name: string;
    mobile: string;
    dob: string;
    password?: string;
    location: Address;
}

interface Address {
    address?: string;
    pincode?: string;
    city?: string;
    state?: string;
    country?: string;
}

interface docID {
    id?: string;
}

interface TimeStamps {
    created_at?: any;
    updated_at?: any;
}