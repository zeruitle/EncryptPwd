/*
 *@file content_script
 *manifest: "run_at" set "document_end"
 *This script is injected immediately after the DOM is complete, but before subresources like images and frames have loaded.
 *If the login page is implemented using iframe etc., potentially this extension rise bug
 */

/**
 * @constructor
 * @interface
 */
//function InputDOMInterface(){}

/*
 *@type
 */
//InputDOMInterface.prototype.DOM = [];

var inputs = document.getElementsByTagName('input');
var realpwd = [];
var masterpwd = [];

//get realpwd input field object first
for(var i = 0; i < inputs.length; i++) {
    //find if there's an password input field
    if(inputs[i].type.toLowerCase() == 'password') {
        //get the password input id
        if(inputs[i].id) {
            //get password input element
            realpwd.push(document.getElementById(inputs[i].id));
        } else if(inputs[i].name) {
            //TODO:: this is not right
            //if input field dont have id
            realpwd.push(document.getElementsByName(inputs[i].name));
        } else {
            alert("No way input field dont have id and name");
        }
    }
}

//insert encryppwd input field after get all realpwd input field
for(var i = 0; i < realpwd.length; i++){
    //prepare the master input field
    var elements = "<input name='masterpwd"+i+"' id='masterpwd"+i+"' type='password' placeholder='EncryptPwd On' required>";
    var div = document.createElement('div');
    div.id = 'masterdiv'+i;
    div.innerHTML = elements;
    //get parent form
    //TODO:: need verify
    var pform;console.log(realpwd[i].name);
    try {
        //the form has id, return form object
        pform = realpwd[i].form;
    } catch(e) {
        //the form might not have id
        pform = realpwd[i].closest('form');
    }
    
    //insert masterpwd input field
    realpwd[i].parentNode.insertBefore(div,realpwd[i]);
    //get masterpwd element
    masterpwd.push(document.getElementById("masterpwd"+i));
    //set the realpwd input field to invisible
    realpwd[i].style.display = "none";
    //listen when user input masterpwd
    masterpwd[i].addEventListener("keyup", bindKeyup(i));
    //listen when user submit, destroy masterpwd
    pform.addEventListener("submit",removeMaster(i));
}

//bind masterpwd field keyup action
function bindKeyup(i){
    return function(){
        //trim input, no point to validate
        pwdTrim = masterpwd[i].value.trim();
        //make sure not accept empty input
        if(pwdTrim){
            //encrypt password
            pwdEncrypt = encryption(pwdTrim);
            //set realpwd.value as returned encrypted password
            realpwd[i].value = pwdEncrypt;
            console.log(realpwd[i].value);
        }
    }
}

//remove msterpwd when user submit
function removeMaster(i){
    return function(e){
        //e.preventDefault();
        //fine Im using removeChild for compatibility
        masterpwd[i].parentElement.removeChild(masterpwd[i]);
        realpwd[i].style.display = "initial";
    }
}

/*encrypt password here
 *new MD5 instance
 *var MD5 = new Hashes.MD5
 *new SHA1 instance
 *var SHA1 = new Hashes.SHA1
 *new SHA256 instance
 *var SHA256 =  new Hashes.SHA256
 *new SHA512 instace
 *var SHA512 = new Hashes.SHA512
 *new RIPEMD-160 instace
 *var RMD160 = new Hashes.RMD160
 */
function encryption(pwd){
    var MD5 = new Hashes.SHA256().hex(pwd)
    return MD5;
}