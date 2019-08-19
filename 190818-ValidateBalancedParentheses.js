/**
 * Check string to ensure that all brackets are balanced
 * 
 * This implementation is not entirely usable as it does not discard the characters within two matching brackets and report the remaining unclosed external brackets instead
 */

let test1 = '(There) {is} []' // true
let test2 = ''                // true
let test3 = '((()))'          // true
let test4 = '[( resolve )]{}' // true
let test5 = '({[)]}'          // false
let test6 = '({['             // false
let test7 = '}])'             // false

function errorObject (errorString, sequence) {
  this.errorString = errorString
  this.sequence = sequence
}

function bracketObject (bracketChar, bracketIndex) {
  this.bracketChar = bracketChar
  this.bracketIndex = bracketIndex
}

let isBracketBalanced = (openingChar, closingChar) => {
  switch(closingChar) {
    case ')':
      if (openingChar !== '(') return false
      break
    case '}':
      if (openingChar !== '{') return false
      break
    case ']':
      if (openingChar !== '[') return false
      break
    default:
        return false
  }
  return true
}

let testSolution = (inputString) => {
  // Split string
  // Read each character
  // Store start bracket characters in an array ({[
  // If meet enclosing bracket character
  // Compare it with last entry of start bracket character array
  // Pop start bracket character if match
  // Return false if not match
  let stringArray = inputString.split('')
  let openingBrackets = []
  let errors = []
  let solutionOutcome = true
  
  stringArray.forEach((char, index) => {
    if (
      char === '(' ||
      char === '{' ||
      char === '['
    ) {
      let openBracketObject = new bracketObject
      openBracketObject.bracketChar = char
      openBracketObject.bracketIndex = index
      openingBrackets.push(openBracketObject)
    } else if (
      char === ')' ||
      char === '}' ||
      char === ']'
    ) {
      closeBracketObject = new bracketObject
      closeBracketObject.bracketChar = char
      closeBracketObject.index = index

      // Safeguard: Empty Array
      if (openingBrackets.length === 0) {
        let _errorObject = new errorObject(`Syntax error: Undexpected token ${char} at ${index + 1}}`, index)
        errors.push(_errorObject)
        return
      }

      let openedBracketObject = openingBrackets.pop()
      
      // Could be improved
      if (!isBracketBalanced(openedBracketObject.bracketChar, char)) {
        openingBrackets.push(openedBracketObject)
        let _errorObject = new errorObject(`Syntax error: Unexpected token ${char} at ${index + 1}`, index)
        errors.push(_errorObject)
      }
    }
  })

  if (openingBrackets.length !== 0) {
    openingBrackets.forEach(openingBracket => {
      let _errorObject = new errorObject(`Syntax error: Unclosed bracket ${openingBracket.bracketChar} at ${openingBracket.bracketIndex}`, openingBracket.bracketIndex)
      errors.push(_errorObject)
    })
  }

  if (errors.length !== 0) {
    solutionOutcome = false
    
    errors.sort(function (a, b) {
      return a.sequence - b.sequence
    })

    errors.forEach(error => {
      console.log(error.errorString)
    })
  }
  return solutionOutcome
}

console.log(testSolution(test1)) // true
console.log(testSolution(test2)) // true
console.log(testSolution(test3)) // true
console.log(testSolution(test4)) // true
console.log(testSolution(test5)) // false
console.log(testSolution(test6)) // false
console.log(testSolution(test7)) // false
