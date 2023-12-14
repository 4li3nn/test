import { makeAutoObservable } from 'mobx'

class CalculatorStore {
  calculation = ''

  constructor() {
    makeAutoObservable(this)
  }
  setCalculation(calculation) {
    this.calculation = calculation
  }
  // getCalculation() {
  //   if (this.calculation === '') return 0
  //   if (this.calculation.length > 1) {
  //     let content = this.calculation.replace('/', '÷')
  //     content = content.replace('*', '×')
  //     return content
  //   }
  //   return this.calculation
  // }
  setNumber(number) {
    this.calculation += number
  }
  setOperator(operator) {
    if (this.calculation === '') return
    if (this.calculation[this.calculation.length - 1] === operator) return
    if (
      this.calculation[this.calculation.length - 1] === '+' ||
      this.calculation[this.calculation.length - 1] === '-' ||
      this.calculation[this.calculation.length - 1] === '*' ||
      this.calculation[this.calculation.length - 1] === '/'
    ) {
      this.calculation = this.calculation.slice(0, -1)
    }
    this.calculation += operator
  }
  clearCalculation() {
    this.calculation = ''
  }
  calculate() {
    if (this.calculation === '') return
    if (
      this.calculation[this.calculation.length - 1] === '+' ||
      this.calculation[this.calculation.length - 1] === '-' ||
      this.calculation[this.calculation.length - 1] === '*' ||
      this.calculation[this.calculation.length - 1] === '/'
    ) {
      this.calculation = this.calculation.slice(0, -1)
    }
    let result = eval(this.calculation)
    this.calculation = result.toString()
  }
}

export default new CalculatorStore()
