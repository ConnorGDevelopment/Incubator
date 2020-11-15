function addValueToPassword(button) {
    var currVal=$("passcode").val();
    if(button=='bksp') {
        $("#passcode").val(currVal.substring(0, currVal.length-1));
    } else {
        $("passcode").val(currVal.concat(button));
    }
}

$("#btnEnter").click(function () {
    var password = getPassword();
    if(document.getElementById("passcode").value===password){
        if (localStorage.getItem("user")===null){
            $("btnEnter").attr("href","#signup").button();
        } else {
            $("#btnEnter").attr("href","#userHome").button();
        }
    } else {
        alert("Incorrect password, please try again");
    }
})

function getPassword() {
    if (typeof(Storage) == undefined) {
        alert("Your browser does not support HTML5 localStorage. Try upgrading.");
    } else if(localStorage.getItem("user") !=null) {
        return JSON.parse(localStorage.getItem("user")).NewPassword;
    } else {
        return "2345";
    }
}