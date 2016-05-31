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
        var id = inputs[i].id;
        //get password input element
        realpwd.push(document.getElementById(id));
    }
}

//insert encryppwd input field after get all realpwd input field
for(var i = 0; i < realpwd.length; i++){
    //prepare the master input field
    var elements = "<input name='masterpwd"+i+"' id='masterpwd"+i+"' type='password' placeholder='EncryptPwd On'>";
    var div = document.createElement('div');
    div.id = 'masterdiv'+i;
    div.innerHTML = elements;
    //get parent form
    var pform = realpwd[i].form;
    
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
        //TODO:: encrypt password
        pwdEncrypt = encryption(pwdTrim);
        //TODO:: set realpwd.value as returned encrypted password
        realpwd[i].value = pwdEncrypt;
        console.log(realpwd[i].value);
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

//encrypt password here
function encryption(pwd){
    
}