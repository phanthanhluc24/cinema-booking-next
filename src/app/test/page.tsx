"use client"
import {toast} from "react-toastify"
export default function Toast() {
    // const seat:string[]=["2,5","3,8,9"]
    // const arraySeat:number[]=[]
    // for (let i = 0; i < seat.length; i++) {
    //     const arrayNumber=seat[i].split(",")
    //     for (let j = 0; j < arrayNumber.length; j++) {
    //         const convert=parseInt(arrayNumber[j],10)
    //         if (!isNaN(convert)) {
    //             arraySeat.push(convert)
    //         }
    //     }
    // }
    // console.log(arraySeat);
    const number:number[]=[1,3,5]
    for (let i = 0; i < number.length; i++) {
        for (let j=i + 1 ; j < number.length; j++) {
            if (number[j]>number[i]) {
                let Num:number=number[i]
                number[i]=number[j]
                number[j]=Num
            }
        }
    }
    
    console.log(number);
    
    
}
