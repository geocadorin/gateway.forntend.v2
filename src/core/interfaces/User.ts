// export interface CreateUserRequest {
//     name: string;
//     email: string;
//     password: string;
//     customerId?: string; 
//     blocked: boolean;
// }

 export interface User {
    id: string;
    name: string;
    email: string;
    customerId?: string;
    blocked: boolean;
    roles: string[];
    plan: string;
}
