var inputs = document.getElementsByTagName('input');

for(var i = 0; i < inputs.length; i++) {
    //find if there's an password input field
    if(inputs[i].type.toLowerCase() == 'password') {
        //get the password input id
        var id = inputs[i].id;
        //prepare the master input field
        var elements = "<input name='masterpwd' type='password'>";
        var div = document.createElement('div');
        div.id = 'masterdiv';

        //insert master input field
        inputs[i].addEventListener("click", function(){
            document.getElementById(id).appendChild(div);
            div.innerHTML = elements;
        });
    }
}