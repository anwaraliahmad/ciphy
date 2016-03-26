/*
  
  Ciphy: simple Hill Cipher by Anwar Ali-Ahmad, Cameron Yang

  Copyright, MIT License

*/

function Ciphy() {

  this.getFactorial = function(n) {
    var result = 1;
    for (var i = n; i > 0; i--) { // n*(n-1)*(n-2)...
      result *= i;
    }
    return result;
  }

  

  this.getCharCodeArray = function(n, plaintext) {
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

  this.getCiphertext = function(cipher, plaintext) {
    var plainchar = this.getCharCodeArray(cipher[0].length, plaintext.toUpperCase()); // array of n length vectors
    var ciphertext = "";
    var sum = 0; 
    for (var k = 0; k < plainchar.length; k++) { // Loop through each plaintext vector, n length
      for (var i = 0; i < cipher.length; i++) { // Loop through each row, n length
        for (var j = 0; j < cipher[i].length; j++) { // Loop through each row entry, n length.
          sum += cipher[i][j]*plainchar[k][j];
        }

        ciphertext += String.fromCharCode(sum);
        sum = 0;
      }
    }
    console.log(ciphertext);
  }
}

var cipher = [[1, 0],
              [2, 1]];

var cipher2 = [[2,0,0],
              [0,-2,0],
              [0,0,2]];

var ciphy = new Ciphy();

ciphy.getCiphertext(cipher2, "hellothere");