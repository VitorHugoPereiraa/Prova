import { getLocalStorage } from './getLocalStorage'

 function isAuthenticate(){
    const user = getLocalStorage('user_id')

    if(!user){
        return false
    }else{
        return true
    }

}

export { isAuthenticate }