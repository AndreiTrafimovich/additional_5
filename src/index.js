module.exports = function check(str, bracketsConfig) {
    let checkedArr = str.split("");
    var a = 0;

    function findCurrentBracketsPair(curVal) {
        return bracketsConfig.find(function (element) {
            if (element[0] == curVal || element[1] == curVal) {
                return true;
            }

            return false;
        });
    }

    function findCloseIndex(array, index, openTagCounter) {
        let resultIndex = 0;
        let curVal = array[index];

        let curentBracketsPair = findCurrentBracketsPair(curVal);

        if (!curentBracketsPair) {
            return false;
        }

        //isCloseTag
        if (curVal === curentBracketsPair[1] && (curentBracketsPair[1] !== curentBracketsPair[0] || openTagCounter[curVal] === 1)) {
            if (curentBracketsPair[1] === curentBracketsPair[0]) {
                openTagCounter[curVal] = 0;
            }
            return index;
        }

        //isOpenTag
        if (curVal === curentBracketsPair[0]) {
            if (curentBracketsPair[1] === curentBracketsPair[0]) {
                openTagCounter[curVal] = 1;
            }

            resultIndex = findCloseIndex(array, index + 1, openTagCounter);
            if (array[resultIndex] !== curentBracketsPair[1]) {
                throw new Error('OOPS!');
            }
        }

        if (resultIndex < array.length - 1) {
            return findCloseIndex(array, resultIndex + 1, openTagCounter);
        } else {
            return array.length;
        }
    }

    try {
        let result = findCloseIndex(checkedArr, 0, {});
        return result === checkedArr.length;
    }
    catch (e) {
        return false;
    }

    return true;
}