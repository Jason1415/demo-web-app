import { IUser } from '../user/user';

export interface IUserToken {
    userId : number;
    user : IUser;
    expirationDate : Date;
    token : string;
    isActive : boolean;
    createdOn : string;
    updatedOn : string;
}
