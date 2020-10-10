import { isSameDay, format } from 'date-fns'

export function cekPergantianHari(messageBeforeThis, messageObject){
    if(messageBeforeThis === 'undefined' || messageBeforeThis === undefined){
        return false;
    }

    const check = isSameDay(
        new Date(messageBeforeThis.createdAt),
        new Date(messageObject.createdAt)
    )

    return check
}

export function getTime(timestamp){
    return format(new Date(timestamp), "hh:mm a")
}

export function getTimeOnly(timestamp){
    return format(new Date(timestamp), "hh:mm")
}