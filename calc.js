class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)//here the slice is used to delete the number from the last index//
    }
  // the append and choose operation function is used to choose and set the value in the calculator//
    appendNumber(number) {
     if(number=== '-' && this.currentOperand.includes('.'))return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {
    if(this.currentOperand === '')return // once the first operand is type then we type current operand at that time it need to compute the value after that we check the value is !=== empty string then make the computation//
    if(this.previousOperand !== '') {
        this.compute()
    }
     this.operation = operation
     this.previousOperand= this.currentOperand
     this.currentOperand=''
    }
  
    compute() {
        let computation
        const prev =parseFloat(this.previousOperand)
        const current= parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current))return
        switch (this.operation) {
            case '+':
              computation = prev + current
              break
            case '-':
              computation = prev - current
              break
            case '*':
              computation = prev * current
              break
            case '÷':
              computation = prev / current
              break
            default:
              return
          }
          this.currentOperand = computation
          this.operation = undefined
          this.previousOperand = ''
    }
// getdisplay is used to format the decimal places of a number with commmas and also used to display the period . before the current value typed and also after the current value .(period) typed // 

getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
  updateDisplay() {
      this.currentOperandTextElement.innerText =this.currentOperand
      if(this.operation !=null){// here we use $ for the concatenation of the operands and after adding this the operator which we are clicking is displayed//
            this.previousOperandTextElement.innerText =`${this.previousOperand}${this.operation}`
        // here the previous operand is visible after performing the calculation also to make it hide we use else
      }
      else{
        this.previousOperandTextElement.innerText =''
      }
    }

  }
  
  
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })

  
  