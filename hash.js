/*
Written by Maria Galebach
7/23/18
Hashes the PDF text
 */

function hashText(text) {
    var hashed = sha256(text)
    return hashed
}