/*
  
  Ciphy: simple Hill Cipher by Anwar Ali-Ahmad

  Copyright, MIT License

*/

function Ciphy() {

  this.factorial = function(n) { // n!
    var result = 1;
    for (var i = n; i > 0; i--) { // n*(n-1)*(n-2)...
      result *= i;
    }
    return result;
  }

  this.charCodeArray = function(n, plaintext) {
    var arr = [];
    var plaintext_vector = [];
    while(plaintext.length % n != 0 ) { //Adding extra entries until plaintext can fully be divided into groups of n
      plaintext += plaintext[plaintext.length-1];
    }
    for (var i = 0; i < plaintext.length; i++) { 

      plaintext_vector.push(plaintext.charCodeAt(i));
      if (plaintext_vector.length % n == 0) {
        arr.push(plaintext_vector);
        plaintext_vector = [];
      }
    }
    return arr;
  }

  this.hillCipher = function(cipher, plaintext, return_char) {
    var plainchar = this.charCodeArray(cipher[0].length, plaintext.toUpperCase()); // array of n length vectors
    var ciphertext = "";
    var cipherchar = [];
    return_char = return_char || false;
    var sum = 0; 
    for (var k = 0; k < plainchar.length; k++) { // Loop through each plaintext vector, n length
      for (var i = 0; i < cipher.length; i++) { // Loop through each row, n length
        for (var j = 0; j < cipher[i].length; j++) { // Loop through each row entry, n length.
          sum += cipher[i][j]*plainchar[k][j];
        }

        ciphertext += String.fromCharCode(sum);
        cipherchar.push(sum);
        sum = 0;
      }
    }
    if (return_char)
      return cipherchar;
    return ciphertext;
  }

  this
}

var cipher = [[1, 0],
              [2, 1]];

var cipher2 = [[2,0,0],
              [0,-2,0],
              [0,0,2]];
var cipher2_inv = [ [1/2, 0, 0],
                    [0, -1/2, 0],
                    [0, 0, 1/2]
                  ]; 

var ciphy = new Ciphy();

var plaintext = "hellothere";
var charr = ciphy.hillCipher(cipher2, plaintext, true);
var text = ciphy.hillCipher(cipher2, plaintext);
console.log(charr);
var text2 = ciphy.hillCipher(cipher2_inv, text, true);
console.log(text2);




