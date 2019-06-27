import { Company } from './Company';

export class User {
    public constructor( 
                        public userId?:number,
                        public userName?:string,
                        public userPassword?:string,
                        public userType?:string,
                        public company?:Company,

                        )
        {

        }
}