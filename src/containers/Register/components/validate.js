/* eslint-disable */

/**
 * Messages code 
 */
const empty_field = 'Campo vazio'
const invalid_userName = 'E-mail inválido'

function validate(user) {
    
    const errors = {};

    if (!user.email) {
        errors.email = empty_field
    } else if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email)) {
        errors.email = invalid_userName
    }
    if (!user.password) {
        errors.password = empty_field
    }
    
    return errors
}


export default validate;
