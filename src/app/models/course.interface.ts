export interface Course extends TimeStamps, docID {
    title: string;
    description?: string;
}

export interface Test extends TimeStamps, docID {
    course_id: string;
    title: string;
    description?: string;
    start_date: string;
    end_date: string;
    file_urls?: Array<any>;
}

export interface Order extends TimeStamps, docID {
    student_id: string;
    course_id: string;
    status: boolean;
    payment_id?: string;
}

interface docID {
    id?: string;
}

interface TimeStamps {
    created_at?: any;
    updated_at?: any;
}