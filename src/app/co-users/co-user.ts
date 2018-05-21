import { UserRoles } from "@aaman/couser/user-roles";

export class CoUser {
    name: string;
    designation: string;
    email: string;
    phone: string;
    
    isAdmin: boolean;

    roles = new UserRoles();
    id: string;
}