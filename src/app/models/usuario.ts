export class Usuario{

    constructor(
    
        public id: number,
        public email: String,
        public role: String,
        public estado?: String,
        public password?: String,
        public nombre?: String,
        public area?:String
    ){}



}