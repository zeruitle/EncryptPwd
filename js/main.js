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
function InputDOMInterface(){}

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
    
    //insert masterpwd input field
    realpwd[i].parentNode.insertBefore(div,realpwd[i]);
    //get masterpwd element
    masterpwd.push(document.getElementById("masterpwd"+i));
    //set the realpwd input field to invisible
    realpwd[i].style.display = "none";
    //listen when user input masterpwd
    masterpwd[i].addEventListener("keyup", bindKeyup(i));
}

//bind masterpwd field keyup action
function bindKeyup(i){
    return function(){
        //TODO:: validate input, and security
        
        //TODO:: encrypt password
        
        //TODO:: set realpwd.value as returned encrypted password
        realpwd[i].value = masterpwd[i].value;
        console.log(realpwd[i].value);
    }
}