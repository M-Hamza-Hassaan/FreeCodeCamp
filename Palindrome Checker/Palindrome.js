//Calling the input field
let input = document.getElementById("text-input");
//Calling the button
let btn = document.getElementById("check-btn");
//result will be shown here
let res = document.getElementById("result");
btn.onclick = function(){ 
    let text = input.value;
    let len = text.length;
    let mid = Math.floor(len/2);
    let palindrome = true;
    if (!text) {
        alert("Please input a value");
        return;
    }
    text1 = text.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    for ( let i = 0; i < mid; i++ ) {
        if (text1[i] !== text1[len - 1 - i]) {
            palindrome = false;
            break;
        }
    }
    if(palindrome){
        res.textContent = text + " is a Palindrome";
    }else{
        res.textContent = text + " is not a Palindrome";
    }
}