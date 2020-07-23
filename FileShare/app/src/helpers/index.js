import _ from 'lodash'

const KB = 1024
const MB = KB * KB
const TB = KB * KB * KB

export const betterNumber = (input) => {
    if(input > KB){
        return `${(input/KB).toPrecision(2)} KB`
    }
    if(input > MB){
        return `${(input/MB).toPrecision(2)} MB`
    }
    
}

export const betterNumberForSpeed = (input, round = true) => {


    if(input > MB){
        return round ? `${_.round(input/MB)} M` : `${(input/MB)} M` ;
    }

    if(input > KB){

        return round ? `${_.round(input/KB)} Kb` : `${(input/KB)} Kb` ;
    }

}