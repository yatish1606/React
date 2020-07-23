import _ from 'lodash'

const KB = 1024
const MB = KB * KB
const TB = KB * KB * KB

export const betterNumber = (input) => {
    if(input > KB){
        return `${input/KB} KB`
    }
    if(input > MB){
        return `${input/MB} MB`
    
}