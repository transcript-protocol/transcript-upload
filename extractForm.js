/*
Maria Galebach
7/24/18
Property of EmblemEDU
Extracts info from form
*/

class Upload {
    constructor(username, studentName, password) {
        this.username = username
        this.studentName = studentName
        this.password = password
    }
}

function createUpload(username, studentName, password) {
    return new Upload(username, studentName, password)
}

function getInfo() {
    var username = document.getElementById("username").value
    var studentName = document.getElementById("studentName").value
    var password = document.getElementById("password").value
    var whateverBro = createUpload(username, studentName, password)
    console.log(whateverBro)
    return whateverBro
}

function main() {
    // getInfo()
    console.log("Hash: " + hash)
}