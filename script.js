//设置DOM节点，h1单选，button全选，ById特选
const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
//先设false保持在第一个数字，之后每点一个operator变成true然后return，就开始打第二个数字
let isFirstDigitOfNextValue = false;

//先设false保持在第一个数字，每点一个operator就会变成true就会return，就开始打第二个数字,operator后面不能打小数点。h1如果数字里不包含小数点了就可加小数点，一个数字只有一个decimal。三元运算符：if truthy ? 执行A ：falsy 执行B。 一个条件后面会跟一个问号（?），如果条件为truthy ，则问号后面的表达式A 将会执行；表达式A 后面跟着一个冒号（:），如果条件为falsy ，则冒号后面的表达式B 将会执行。defult value是‘0’字符串把number放回去，等于是一个数字的开始，如果有几个数字就是累加。2+3.5+4
function handleNumberClick(number) {
  if(isFirstDigitOfNextValue) {
    calculatorDisplay.textContent = number;
    isFirstDigitOfNextValue = false;
  } else {
    const previoursValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = previoursValue === '0'? number : previoursValue + number;
  }
}


//如果输入第一个数后点击operator就返回变true，不能加decimal需要输入新的数字。如果显示内容没有小数点那么在现有的数字后加小数点 if((条件)) {补充条件`${variable}.`}; 变量
function handleDecimalClick() {
  if (isFirstDigitOfNextValue) return;
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}


//function根据value来判断 const object = keys(keys都是firstOperator) 6/2=3 6=3= 点击第二个operator的时候match calculate用第一个keys去计算，如果输入两个等号显示secondNumber
const calculate = {
  "/": (firstNumber,secondNumber)=> firstNumber / secondNumber,
  "*": (firstNumber,secondNumber)=> firstNumber * secondNumber,
  "+": (firstNumber,secondNumber)=> firstNumber + secondNumber,
  "-": (firstNumber,secondNumber)=> firstNumber - secondNumber,
  "=": (firstNumber,secondNumber)=> secondNumber,
};

// function calculate(operator, firstNumber, secondNumber) {
//   let result = 0;
//   if (operator ==="/") {
//     result = firstNumber / secondNumber;
//   } else if (operator === "*") {
//     result = firstNumber * secondNumber;
//   } else if (operator === "+") {
//     result = firstNumber + secondNumber;
//   } else if (operator === "-") {
//     result = firstNumber - secondNumber;
//   } else if (operator === "=") {
//     result = secondNumber
//   }

//   return result;
// }

//function 作野 (pass arguement的语义化代称) 需要考虑if condition的情况
function handleOperatorClick(operator) {
  //3+-1=2 当同时点击两个operator，第二个operator把第一个覆盖，return停止计算
  const currentValue = Number(calculatorDisplay.textContent);
  console.log("currentValue", currentValue);
  if(operatorValue && isFirstDigitOfNextValue) {
    operatorValue = operator;
    return;
  }
  //+6= 当输入没有firstValue，将currentValue赋值给firstValue就没有计算了，
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    //3+6= 3+6+ object pass[第一次计算的值]firstOperator存在operatorValue里面，要call（）里面的function，要传arguement的值进去
    //const result = calculate(operatorValue, firstValue, currentValue);
    const result = calculate[operatorValue](firstValue, currentValue);
    console.log("result", result);
    calculatorDisplay.textContent = result;
    //3+6+8
    firstValue =result;
  } 
  isFirstDigitOfNextValue = true;
  //用operatorValue接第一个数字存到firstValue里面
  operatorValue = operator;
}


// 用array方法，for loop三种情况，当inputBtn不包含class说明就是数字，都会call handleNumberClick,当class是operator就说明inputBtn是operator就调用handleOperatorClikck这个function。decimal只有一个，括号里面不需要value，不是variables要加引号，其他的有多个操作需要pass value判断是谁
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => handleNumberClick(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => handleOperatorClick(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
     inputBtn.addEventListener("click", () => handleDecimalClick());
  }
});


// function放前后都可以用，当点击C键时所有情况清空并回到显示0，clearAll全部返回初始值
function clearAll() {
  firstValue = 0;
  operatorValue = "";
  isFirstDigitOfNextValue = false;
  calculatorDisplay.textContent = "0";
}

clearBtn.addEventListener("click", clearAll)

const currentNumber = sum[1++100]