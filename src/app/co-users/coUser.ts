import {UserRoles} from './userRoles';

export class CoUser {
    name: string;
    designation: string;
    email: string;
    phone: string;
    
    isAdmin: boolean;

    roles = new UserRoles();
    id: string;
}