let formChecker = (function(){

    //This will check the phone number.
    function numbersOnlyTest(testStr){
        console.log("Checking numbers");
        console.log(numbersOnlyTest);
        let numCheck = /^[0-9]{10}$/;
        if(numCheck.test(testStr)){
            return true;
        }
        return false;
    }

    //This will check the characters.
    function charsOnlyTest(testStr){
        console.log("Checking characters");
        console.log(charsOnlyTest);
        let nameCheck = /^[a-zA-z]+$/;
        if(nameCheck.test(testStr)){
            return true;
        }
        return false;
    }

    //This will check the code.
    function codeTest(testStr){
        console.log("Checking magic code");
        console.log(codeTest);
        let codeCheck = /^[a-zA-Z]+[1-4]{1}[1-5]{1}$/;
        if(codeCheck.test(testStr)){
            return true;
        }
        return false;
    }

    //This will check the email address.
    function emailTest(testStr){
        console.log("Checking email");
        console.log(emailTest);
        let emailCheck = /^[a-zA-Z0-9.]+@[a-zA-Z]+\.{1}[a-zA-Z]{2,6}$/;
        if(emailCheck.test(testStr)){
            return true;
        }
        return false;
    }

    //This will check if every field is completed.
    function hasValue(testStr){
        console.log("Checking hasValue");
        console.log(hasValue);
        if(testStr!=null && testStr.length>=1){
            return true;
        }
        return false;
    }

    //This will check the button.
    function radioCheckedValue(checkName){
        console.log("Checking identity");
        console.log(radioCheckedValue);
        if(event.target.querySelector(`input[name=${checkName}]:checked`)){
            return event.target.querySelector(`input[name=${checkName}]:checked`).value;
        }
            return null;
    }

    //This will check if the user enter the 'magic word' to unlock the message.
    function wordTest(testStr){
      console.log("Checking instructions");
      console.log(wordTest);
      let wordCheck = /(Smash Mouth)/;
      if (wordCheck.test(testStr)){
        console.log("Secret discovered!");
        document.body.style.backgroundImage = "url('https://i.imgur.com/55VLSGH.gif')";
        let music=document.querySelector("audio")
        music.currentTime = 0;
        music.play();
      }
      return false;
    }

    //This will check the errors.
    function errorsCheck(valuesList){
        console.log("Checking errors");
        console.log(errorsCheck);
        let errors=[];
            valuesList.forEach((item) => {
                if((item.func)(item.val)==false){
                    errors.push(`<p>${item.errMsg}</p>`);
                }
            });
        return errors;
    }

    //This will allow the form to submit if there is no error, otherwise it will display the error messages.
    function canSubmit(errorsList){
        console.log(canSubmit);
        if(errorsList.length>0){
            showErrors(errorsList);
            return false;
        }
        return true;
    }

    //This will display error messages
    function showErrors(errorsList){
        let errorDisplay = event.target.querySelector("#errors");
        console.log(errorDisplay);
        errorDisplay.innerHTML=errorsList.join('');
    }

    //This will check the form for errors.
    function checkForm(event){
        event.preventDefault()
        //
        let submitValues = {};
        submitValues.identity = radioCheckedValue('identity');
        submitValues.first_name = event.target.querySelector("#first_name").value;
        submitValues.last_name = event.target.querySelector("#last_name").value;
        submitValues.phone = event.target.querySelector("#phone").value;
        submitValues.email = event.target.querySelector("#email").value;
        submitValues.home_address = event.target.querySelector("#home_address").value;
        submitValues.city = event.target.querySelector("#city").value;
        submitValues.code = event.target.querySelector("#code").value;
        submitValues.area = event.target.querySelector("select[name=area]").value;
        submitValues.instructions = event.target.querySelector("#instructions").value;
        console.log(submitValues);

        let errorsList = errorsCheck(
            [
                {val:submitValues.identity, func:hasValue ,errMsg:"Identity is missing"},
                {val:submitValues.first_name, func:charsOnlyTest, errMsg:"First name is missing"},
                {val:submitValues.last_name, func:charsOnlyTest, errMsg:"Last name is missing"},
                {val:submitValues.phone, func:numbersOnlyTest, errMsg:"Phone number is invalid/missing"},
                {val:submitValues.email, func:emailTest, errMsg:"Email is invalid/missing"},
                {val:submitValues.home_address, func:hasValue, errMsg:"Address is missing"},
                {val:submitValues.city, func:charsOnlyTest, errMsg:"City is invalid/missing"},
                {val:submitValues.area, func:hasValue, errMsg:"Area is missing"},
                {val:submitValues.code, func:codeTest, errMsg:"Magic code is invalid/missing"},
                {val:submitValues.instructions, func:wordTest, errMsg: "Instruction is missing"}
            ]);

        if(canSubmit(errorsList)){
            console.log("All done! Let's submit");
            console.table(submitValues);
            document.getElementById('errors').innerHTML="You are all set! Thank you for joining!";
            event.target.reset();
        }


    }
    return {
        initForm: function(userForm){
            console.log(userForm);
            userForm.addEventListener("submit", checkForm);
        }
    }
})();
