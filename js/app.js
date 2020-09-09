
    budgetFeedback = document.querySelector(".budget-feedback");
    expenseFeedback = document.querySelector(".expense-feedback");
    budgetForm = document.getElementById("budget-form");
    budgetInput = document.getElementById("budget-input");
    budgetAmount = document.getElementById("budget-amount");
    expenseAmount = document.getElementById("expense-amount");
    balance = document.getElementById("balance");
    balanceAmount = document.getElementById("balance-amount");
    expenseForm = document.getElementById("expense-form");
    expenseInput = document.getElementById("expense-input");
    amountInput = document.getElementById("amount-input");
    expenseList = document.getElementById("expense-list");
    itemList = [];
    itemID = 0;

    
//submit budegt form
function submitBudgetForm(){
  const value= budgetInput.value;
  if(value=="" || value<0){
  budgetFeedback.classList.add("showItem");
  budgetFeedback.innerHTML = `<p> Cannot be empty or negative</p>`;
  setTimeout(function(){
    budgetFeedback.classList.remove("showItem");
  },4000);
}else{
  budgetAmount.textContent= value;
  budgetInput.value="";
  showBalance();
  }  
}


//show balance
function showBalance(){
  const expense= totalExpense();
  const totalBalance = parseInt(budgetAmount.textContent)-expense; 
  balanceAmount.textContent= totalBalance;
  console.log(expense);
  if(totalBalance<0){
    balance.classList.remove("showGreen", "showBlack");
    balance.classList.add("showRed");
  }
  else if(totalBalance>0){
    balance.classList.remove("showRed", "showBlack");
    balance.classList.add("showGreen");
  }
  if(totalBalance===0){
    balance.classList.remove("showGreen", "showRed");
    balance.classList.add("showBlack");
  }
}

//submit expense method
function submitExpenseForm(){
  const expenseValue= expenseInput.value;
  const amountValue= amountInput.value;
  if(expenseValue=== "" || amountValue==="" || amountValue<0){
    expenseFeedback.classList.add("showItem");
    expenseFeedback.innerHTML= `<p> cannot be empty or negative </p>`;
    setTimeout(function(){
      expenseFeedback.classList.remove("showItem");
    },4000)
  }else{
    let amount = parseInt(amountValue);
    expenseInput.value="";
    amountInput.value="";

    let expense = {
      id: itemID,
      title: expenseValue,
      amount: amount,
    }
    itemID++;
    itemList.push(expense);
    addExpense(expense);
    showBalance();
  }
}

//add expense
function addExpense(expenses){
  const div = document.createElement('div');
  div.classList.add('expense');
  div.innerHTML= `<div class="expense-item d-flex justify-content-between align-items-baseline">

<h6 class="expense-title mb-0 text-uppercase list-item">${expenses.title}</h6>
<h5 class="expense-amount mb-0 list-item">${expenses.amount}</h5>

  <div class="expense-icons list-item">

   <a href="#" class="edit-icon mx-2" data-id="${expenses.id}">
    <i class="fas fa-edit"></i>
   </a>
   <a href="#" class="delete-icon" data-id="${expenses.id}">
    <i class="fas fa-trash"></i>
   </a>
  </div>
 </div>
 `;
 expenseList.appendChild(div);
}




//total expense
function totalExpense(){
  let total=0;
  if(itemList.length>0){
    total= itemList.reduce(function(acc,curr){
      acc+=curr.amount;
      return acc;
    },0);
  }
  expenseAmount.textContent=total;
  return total;
}


  //edit expense
  function editExpense(element){
    let id= parseInt(element.dataset.id);
    const expenseTitle= itemList[id].title;
    const expenseAMount= itemList[id].amount;
    const balanceAMOUNT= parseInt(balanceAmount.textContent);
    const expenseAMOUNT= parseInt(expenseAmount.textContent);

    let parent= element.parentElement.parentElement.parentElement;
    expenseList.removeChild(parent);
    delete itemList[id];

    balanceAmount.textContent= balanceAMOUNT + expenseAMount;
    expenseAmount.textContent= expenseAMOUNT - expenseAMount;

    expenseInput.value= expenseTitle;
    amountInput.value= expenseAMount;
  }

  //delete expense
  function deleteExpense(element){
    console.log(element);
    let id= parseInt(element.dataset.id);
    const expenseAMount= itemList[id].amount;
    const balanceAMOUNT= parseInt(balanceAmount.textContent);
    const expenseAMOUNT= parseInt(expenseAmount.textContent);

    let parent= element.parentElement.parentElement.parentElement;
    expenseList.removeChild(parent);
    delete itemList[id];

    balanceAmount.textContent= balanceAMOUNT + expenseAMount;
    expenseAmount.textContent= expenseAMOUNT - expenseAMount;
    console.log(parent);
  }



//budegetform submit
budgetForm.addEventListener("submit", function(event){
  event.preventDefault();
  submitBudgetForm();
});

//expenseform submit
expenseForm.addEventListener("submit", function(event){
  event.preventDefault();
  submitExpenseForm();
});

//expense click
expenseList.addEventListener("click", function(event){
if(event.target.parentElement.classList.contains("edit-icon")){
  editExpense(event.target.parentElement);
}
else if(event.target.parentElement.classList.contains("delete-icon")){
  deleteExpense(event.target.parentElement);
}

});

