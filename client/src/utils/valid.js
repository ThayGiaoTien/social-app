//create a function with set of err={}
//check data input, if input data is invalid, add this error to err
//we need to check input require, length, validate email, confirm password


const valid=({fullname, username, email, password, cf_password})=>{
    const err={}

    if(!fullname){
        err.fullname=("Please add your fullname.")
    } else if(fullname.length>25){
        err.fullname=("Full name is up to 25 characters.")
    }
    if(!username){
        err.username=("Please add your username.")
    } else if(username.replace(/ /g, '').length>25){
        err.username=("Username is up to 25 characters.")
    }
    if(!email){
        err.email= "Please input your email."
    } else if(!validateEmail){
        err.email= "Email format is incorrect."
    }
    if(!password){
        err.password="Please add your password."
    } else if(password.length<6){
        err.password="Password must be at least 6 characters."
    }
    if(cf_password!==password){
        err.cf_password="Confirm password did not match."
    }
    return {
        errMsg: err,
        errLength: Object.keys(err).length //get keyword length of err
    }
}
const validateEmail=(email)=>{
    //eslint-disable-next-line
    const re=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}
export default valid