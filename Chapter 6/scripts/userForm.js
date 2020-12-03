function addValueToPassword(button) {
    var currVal=$("#passcode").val();
    if (button === "bksp") {
        $("#passcode").val(currVal.substring(0, currVal.length - 1));
    } else {
        $("#passcode").val(currVal.concat(button));
    }
}

function enterPassword() {
    var password = getPassword();
    if(document.getElementById("passcode").value == password) {
        if(localStorage.getItem("user") == null) {
            $("#btnEnter").attr("href", "#signup").button();
        } else {
            $("#btnEnter").attr("href", "#userHome").button();
        }
    }
}

function getPassword() {
    if(typeof(Storage) == "undefined") {
        alert("Bad");
    } else if (localStorage.getItem("user") != null) {
        return JSON.parse(localStorage.getItem("user")).NewPassword;
    } else {
        return "2345";
    }
}

function submitUserForm() {
    saveUserForm();
    return true
}

function checkUserForm() {
    var d = new Date();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var year = d.getFullYear();
    var currentDate = year + "/" + (("" + month).length < 2 ? "0" : "") +  (("" + date).length < 2 ? "0" : "") + date;
    if(
        ($("#txtFirstName").val() != "") &&
        ($("#txtLastName").val() != "") &&
        ($("#datBirthdate").val() != "") &&
        ($("#datBirthdate").val() <= currentDate) &&
        ($("#txtHealthCardNumber").val() != "")) 
    {
        return true;
    } else {
        return false;
    }
}

function saveUserForm() {
    if(checkUserForm()) {
        var user = {
            "FirstName" : $("#txtFirstName").val(),
            "LastName" : $("#txtLastName").val(),
            "HealthCardNumber" : $("#txtHealthCardNumber").val(),
            "NewPassword" : $("#changePassword").val(),
            "DOB" : $("#datBirthdate").val()
        };
        try {
            localStorage.setItem("user", JSON.stringify(user));
            alert("Saving Information");
            $.mobile.changePage("#userHome");
        } catch(e) {
            if (window.navigator.vendor === "Google Inc.") {
                if(e === DOMException.QUOTA_EXCEEDED_ERR) {
                    alert("Error: Local Storage Limit Exceeds");
                }
            } else if (e == QUOTA_EXCEEDED_ERR) {
                alert("Error: Saving to Local Storage");
            }
            console.log(e);
        }
    } else {
        alert("Please Complete the Form Properly")
    }
}

function showUserForm() {
    try {
        var user = JSON.parse(localStorage.getItem("user"));
    } catch(e) {
        if (window.navigator.vendor === "Google Inc.") {
            if(e === DOMException.QUOTA_EXCEEDED_ERR) {
                alert("Error: Local Storage Limit Exceeds");
            }
        } else if (e == QUOTA_EXCEEDED_ERR) {
            alert("Error: Saving to Local Storage");
        }
        console.log(e);
    }
    if(user != null) {
        $("#personalInfo").empty();
        $("#txtFirstName").val(user.FirstName);
        $("#txtLastName").val(user.LastName);
        $("#txtHealthCardNumber").val(user.HealthCardNumber);
        $("#changePassword").val(user.NewPassword);
        $("#datBirthdate").val(user.DOB);
        
        $("#personalInfo").append(
            user.FirstName + "<br>" + 
            user.LastName + "<br>" +
            user.HealthCardNumber + "<br>" +
            user.DOB + "<br>"
            )
    }
}

$(document).on("pageshow", function(){
    if($(".ui-page-active").attr("id") === "personal") {
        showUserForm();
    } else if($(".ui-page-active").attr("id") === "body") {
        showRecords();
    }
})

function addRecord() {
    if (localStorage.getItem("records") !== null) {
        var tempWeight = $("#numRecordWeight").val()
        var tempHeight = $("#numRecordHeight").val()
        var tempRecord = {
            "Index": JSON.parse(localStorage.getItem("records")).length,
            "Date": $("#datRecordDate").val(),
            "Weight": tempWeight,
            "Height": tempHeight,
            "BMI": tempWeight / (tempHeight * tempHeight),
        }
        var records = JSON.parse(localStorage.getItem("records"))
        records.push(tempRecord)
        localStorage.setItem("records", JSON.stringify(records))
    } else {
       var tempWeight = $("#numRecordWeight").val()
       var tempHeight = $("#numRecordHeight").val()
       var tempRecord = {
        "Index": 0,
        "Date": $("#datRecordDate").val(),
        "Weight": tempWeight,
        "Height": tempHeight,
        "BMI": tempWeight / (tempHeight * tempHeight),
        }
        var records = []
        records.push(tempRecord)
        localStorage.setItem("records", JSON.stringify(records))
   }
}

function clearRecord() {
    if(localStorage.getItem("records") !== null) {
        localStorage.removeItem("records")
        showRecords()
    }
}

function showRecords() {
    try {
        var records = JSON.parse(localStorage.getItem("records"));
    } catch(e) {
        if (window.navigator.vendor === "Google Inc.") {
            if(e === DOMException.QUOTA_EXCEEDED_ERR) {
                alert("Error: Local Storage Limit Exceeds");
            }
        } else if (e == QUOTA_EXCEEDED_ERR) {
            alert("Error: Saving to Local Storage");
        }
        console.log(e);
    }
    if(records != null) {
        $("#tblRecords").html(
            "<thead>" + 
                "<tr>" +
                    "<th>Date</th>" +
                    "<th>Height</th>" +
                    "<th>Weight</th>" +
                    "<th>BMI</th>" +
                    "<th>Delete</th>" +
                "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
        );
        for(let i=0; i < records.length; i++){
            $("#tblRecords tbody").append(
                "<tr>" +
                    "<td>" + records[i].Date + "</td>" +
                    "<td>" + records[i].Height + "</td>" +
                    "<td>" + records[i].Weight + "</td>" +
                    "<td>" + records[i].BMI + "</td>" +
                    "<td>" + "<a data-inline='true' data-mini='true' data-role='button' href='#' onclick='deleteRecord("+i+") data-icon='delete' data-iconpos='notext'> </a> " + "</td>" +
                "</tr"
            )
        }
    } else {
        $("#tblRecords").html(
            "<thead>" + 
                "<tr>" +
                    "<th>Date</th>" +
                    "<th>Height</th>" +
                    "<th>Weight</th>" +
                    "<th>BMI</th>" +
                    "<th>Delete</th>" +
                "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
        );
    }
}