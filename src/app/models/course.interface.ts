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

interface docID {
    id?: string;
}

interface TimeStamps {
    created_at?: any;
    updated_at?: any;
}