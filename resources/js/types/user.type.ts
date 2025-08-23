export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    role: string;
    status: 'active' | 'banned';
    profilePic?: string | null;
    empId?: string | null;
    subId: number;
    emailVerifiedAt?: Date | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
}
