const clientForm = document.querySelector('#clientform');
const balanceDisplay = document.querySelector('.balance');
const cashRegisterForm = document.querySelector('#cashregisterform');
const returnDisplay = document.querySelector('#return');

let balance, b, n;

clientForm.addEventListener("submit", (e) => {
  e.preventDefault();
  b = parseFloat(e.target.bill.value);
  n = parseFloat(e.target.note.value)
  balance = n - b;
  balanceDisplay.style = "padding-left: 10px"
  balanceDisplay.textContent = balance


console.log(balance);

cashRegisterForm.addEventListener("submit", (a) => {
  a.preventDefault();
  let penny = parseFloat(a.target.penny.value);
  let nickel = parseFloat(a.target.nickel.value);
  let dime = parseFloat(a.target.dime.value);
  let quarter = parseFloat(a.target.quarter.value);
  let one = parseFloat(a.target.one.value);
  let five = parseFloat(a.target.five.value);
  let ten = parseFloat(a.target.ten.value);
  let twenty = parseFloat(a.target.twenty.value);
  let oneHundred = parseFloat(a.target.onehundred.value);
 let cid = [["PENNY", penny], ["NICKEL", nickel], ["DIME", dime], ["QUARTER", quarter], ["ONE", one], ["FIVE", five], ["TEN", ten], ["TWENTY", twenty], ["ONE HUNDRED", oneHundred]];
 console.log(cid)
function checkCashRegister(price, cash, cid) {
  var difference = cash - price;
  const originalDiff = difference;
  var objectReturn = {
    status: '',
    change: []
  }

let arrCurrency = [
    ["ONE HUNDRED", 100], 
    ["TWENTY", 20], 
    ["TEN", 10], 
    ["FIVE", 5], 
    ["ONE", 1], 
    ["QUARTER", 0.25],
    ["DIME", 0.1],
    ["NICKEL", 0.05],
    ["PENNY", 0.01]
    ]

    cid.reverse();

  var cidSum = 0;
  for(let i = 0; i<cid.length; i++){
    cidSum += cid[i][1];
  }

  var result = [...arrCurrency];

  for(let i = 0; i<arrCurrency.length; i++){
    let returnMoney = 0; 
    let bill = cid[i][1]/arrCurrency[i][1]
      bill.toFixed(2);
      while(difference.toFixed(2)>=arrCurrency[i][1] && bill>=1){
        difference -= arrCurrency[i][1];
        returnMoney += arrCurrency[i][1];
        bill--;

      }
        if(returnMoney>0){
          if(returnMoney - Math.floor(returnMoney) !== 0){result[i][1]= returnMoney.toFixed(2)
          result[i][1] = parseFloat(result[i][1])}else{
            result[i][1]= returnMoney;
          }

        }else{
          result[i][1]= returnMoney;
        }
  }

  let sumResult = 0;

  for(let i = 0; i<cid.length; i++){
    sumResult += result[i][1];
  }
  sumResult = sumResult.toFixed(2);

  if(cidSum < originalDiff || sumResult < originalDiff){
    objectReturn.status = 'INSUFFICIENT_FUNDS'; 
  }else if(cidSum == originalDiff){
      objectReturn.status = 'CLOSED';
      objectReturn.change = cid;
    }else{
      let resultFiltered =[];
      for(let a = 0; a<result.length; a++){
        if(result[a][1]!==0){
          resultFiltered.push(result[a]);  
        } 
        }
     objectReturn.status = 'OPEN';
     objectReturn.change = resultFiltered;
    }
     returnDisplay.textContent = objectReturn.status + " " + objectReturn.change + " Dollars";
}

checkCashRegister(b, n, cid);

});
});