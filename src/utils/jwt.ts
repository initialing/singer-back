import { User } from "./user";

export interface JWT extends User {
    expireTime: number;
}
