```js
let array1 = [
    ['红', '绿', '蓝'],
    ['A', 'B', 'C'],
    ['S', 'M', 'L'],
]

let array2 = [
    ['红', '蓝'],
    ['A', 'B', 'C'],
    ['S'],
]

let array3 = [
    ['红', '绿', '蓝'],
]

function calc(transArr) {
    let resultArr = [];
    function get(array, index, val) {
        if(!array[index]) {
            resultArr.push(val);
            return;
        };

        array[index].forEach((v, i) => {
            get(array, index + 1, index === 0 ? [v] : [...val, v])
        })
    }
    get(transArr, 0);
    return resultArr;
}

console.log(calc(array1));
console.log(calc(array2));
console.log(calc(array3));
```

