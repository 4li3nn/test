import React, { fireEvent } from 'react'
import { observer } from 'mobx-react-lite'
import calculatorStore from './store'
import { LuDivide } from 'react-icons/lu'
import { IoClose, IoAddSharp } from 'react-icons/io5'
import { RiSubtractFill } from 'react-icons/ri'
import { TiEquals } from 'react-icons/ti'
import './style.scss'

const Calculator = observer(() => {
  const handleChangeCalculation = (event) => {
    const oldPosition = event.target.selectionStart
    const dataValid = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const checkValidKey = dataValid.some(
      (item) => item === event.nativeEvent.data
    )
    console.log(checkValidKey)
    if (checkValidKey) {
      calculatorStore.setCalculation(event.target.value)
    } else {
      event.target.value =
        event.target.value.slice(0, event.target.selectionStart - 1) +
        event.target.value.slice(
          event.target.selectionStart,
          event.target.value.length
        )
      event.target.selectionStart = oldPosition - 1
      event.target.selectionEnd = oldPosition - 1
      calculatorStore.setCalculation(event.target.value)
    }
  }
  return (
    <div className='wrapper'>
      <div className='calculator'>
        <div className='screen'>
          <div className='decor'>
            <div className='decor__item decor__item--red'></div>
            <div className='decor__item decor__item--yellow'></div>
            <div className='decor__item decor__item--green'></div>
          </div>
          <div className='calculating'>
            <input
              type='text'
              value={calculatorStore.calculation}
              onChange={(event) => handleChangeCalculation(event)}
              onClick={(event) => {
                console.log(event.target.selectionStart)
              }}
            />
          </div>
        </div>
        <div className='keyboard'>
          <table>
            <tbody>
              <tr>
                <td
                  className='background-rgb107-99-100'
                  onClick={() => calculatorStore.clearCalculation()}
                >
                  {calculatorStore.calculation.length > 0 ? 'C' : 'AC'}
                </td>
                <td className='background-rgb107-99-100'>+/-</td>
                <td className='background-rgb107-99-100'>%</td>
                <td
                  className='background-yellow'
                  onClick={() => {
                    calculatorStore.setOperator('/')
                  }}
                >
                  <LuDivide />
                </td>
              </tr>
              <tr>
                <td
                  onClick={() => {
                    calculatorStore.setNumber('7')
                  }}
                >
                  7
                </td>
                <td
                  onClick={() => {
                    calculatorStore.setNumber('8')
                  }}
                >
                  8
                </td>
                <td
                  onClick={() => {
                    calculatorStore.setNumber('9')
                  }}
                >
                  9
                </td>
                <td
                  className='background-yellow'
                  onClick={() => {
                    calculatorStore.setOperator('*')
                  }}
                >
                  <IoClose />
                </td>
              </tr>
              <tr>
                <td
                  onClick={() => {
                    calculatorStore.setNumber('4')
                  }}
                >
                  4
                </td>
                <td
                  onClick={() => {
                    calculatorStore.setNumber('5')
                  }}
                >
                  5
                </td>
                <td
                  onClick={() => {
                    calculatorStore.setNumber('6')
                  }}
                >
                  6
                </td>
                <td
                  className='background-yellow'
                  onClick={() => {
                    calculatorStore.setOperator('-')
                  }}
                >
                  <RiSubtractFill />
                </td>
              </tr>
              <tr>
                <td
                  onClick={() => {
                    calculatorStore.setNumber('1')
                  }}
                >
                  1
                </td>
                <td
                  onClick={() => {
                    calculatorStore.setNumber('2')
                  }}
                >
                  2
                </td>
                <td
                  onClick={() => {
                    calculatorStore.setNumber('3')
                  }}
                >
                  3
                </td>
                <td
                  className='background-yellow'
                  onClick={() => {
                    calculatorStore.setOperator('+')
                  }}
                >
                  <IoAddSharp />
                </td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  onClick={() => {
                    calculatorStore.setNumber('0')
                  }}
                >
                  0
                </td>
                <td>,</td>
                <td
                  className='background-yellow'
                  onClick={() => calculatorStore.calculate()}
                >
                  <TiEquals />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
})

export default Calculator
