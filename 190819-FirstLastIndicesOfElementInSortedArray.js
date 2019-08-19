/*
  Give a sorted array with possibly duplicated elements, find the incides of the first and last occurences of a target element.

  Return -1 if target is not found.
*/

const ArrayA = [1,3,3,5,7,8,9,9,9,15]
const ArrayB = [100, 150, 150, 153]
const ArrayC = [1,2,3,4,5,6,10]

class Solution {
  constructor () {}

  getRange (inputArray, inputTarget) {
    this.inputArray = inputArray
    this.inputTarget = inputTarget

    let returnArray = [-1, -1]

    this.inputArray.forEach((element, index) => {
      if (element === this.inputTarget) {
        if (returnArray[0] === -1) {
          returnArray[0] = index
        } else {
          returnArray[1] = index
        }
      }
    })

    return returnArray.includes(-1) ? [-1, -1] : returnArray
  }
}

let GetRange = new Solution()

console.log(GetRange.getRange(ArrayA, 9))
