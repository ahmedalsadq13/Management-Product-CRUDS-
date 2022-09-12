type nu = number;
type st = string;
type bool = boolean;

const args: number[] = [1, 2, 3];
const args2: number[]= [4, 5, 6];

const obj : {
    firstName: string,
    lastName: string,
    age: number,
    location: string
} = {

    firstName : "Ahmed",
    lastName : "Mohamed Elsadek",
    age: 26, 
    location: "Hurghada" 
}

const obj2 : {
    country: string
} = {
   
    country: "Egypt" 
}

const sum = (a: any, b: any, c: any) : any  => a + b + c

