import { User } from './User';

export class Customer {
    public constructor(

        public customerId?:number,
        public customerFirstName?:string,
        public customerLastName?:string,
        public user?:User
        
    ) {

    }
}

