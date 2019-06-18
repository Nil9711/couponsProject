import { User } from './User';

export class Customer {
    public constructor(

        public customerId?:number,
        public user?:User,
        public customerFirstName?:string,
        public customerLastName?:string
        
    ) {

    }
}

