
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as Yup from 'yup';


let values: number[] = new Array(2);
let lastOperator = '';
values[0] = 0;

let FirstNumber1 = 0;
let SecondNumber1 = 0;
let CountWhat2 = 0;
let CountWhat = 0;

function App() {
  let [numberString, setNumberString] = useState('');
  let [history1String, setHistory1String] = useState('');
  let [history2StringCalc, setHistory2StringCalc] = useState('');
  let [history2StringResult, setHistory2StringResult] = useState('');
  let [history3StringCalc, setHistory3StringCalc] = useState('');
  let [history3StringResult, setHistory3StringResult] = useState('');

  function mainFunction(digit: number, remove: boolean) {
    if (remove) {
      setNumberString(prev => '');
      values[0] = 0;
      values[1] = 0;
      lastOperator = '';
    } else {
      setNumberString(prev => prev + digit);
    }
  }

  function addDecimal() {
    if (!numberString.includes(".")) {
      setNumberString(prev => prev + ".");
    }
  }

  function popFromNumber() {
    if (numberString.length === 0) {
      return numberString;
    }
    setNumberString(prev => prev.slice(0, -1));
  }

  function clear() {
    if(CountWhat>=1){
      setHistory3StringCalc(history2StringCalc);
      setHistory3StringResult(history2StringResult);
    }
    if (history1String !== '') {
      if(history1String!=""&&numberString!=""){
        setHistory2StringCalc(history1String);
        setHistory2StringResult(numberString);
        CountWhat+=1;
      }
    }

    setNumberString('');
    values[0] = 0;
    values[1] = 0;
    lastOperator = '';
    setHistory1String('');
  }

  // Added function to format number to 8 decimal places
  function formatNumberTo8Decimals(num: number): string {
    return num.toFixed(8);
  }

  function answer() {
    if (lastOperator === '') return;

    values[1] = Number(numberString);
    let result = values[0];
    
    if (CountWhat2 == 0) {
      if (numberString == "") {
        FirstNumber1 = 0;
      }
      else {
        FirstNumber1 = Number(numberString);
        CountWhat2 += 1;
      }
    }
    else if (CountWhat2 == 1) {
      if (numberString == "") {
        SecondNumber1 = 0;
      }
      else {
        SecondNumber1 = Number(numberString);
        CountWhat2 = 0;
      }
    }

    if(String(FirstNumber1)!="" && lastOperator!="" && String(SecondNumber1)!=""){
      setHistory1String(`${FirstNumber1} ${lastOperator} ${SecondNumber1}`);
    }
    if (lastOperator === '+') {
      result += values[1];
    } else if (lastOperator === '-') {
      result -= values[1];
    } else if (lastOperator === 'x') {
      result *= values[1];
    } else if (lastOperator === '/') {
      result /= values[1];
    } else if (lastOperator === '%') {
      result /= 100;
    }

    values[0] = result;
    values[1] = 0;
    lastOperator = '';

    setNumberString(result.toString());
  }

  function operatorPushed(operator: string) {
    if (numberString === '') {
      setNumberString("0");
    }
    if(operator==='%'){
      let result = Number(numberString);
      setNumberString(String(result/100));
      return;
    }

    if (CountWhat2 == 0) {
      if (numberString == "") {
        FirstNumber1 = 0;
      }
      else {
        FirstNumber1 = Number(numberString);
        CountWhat2 += 1;
      }
    }
    else if (CountWhat2 == 1) {
      if (numberString == "") {
        SecondNumber1 = 0;
      }
      else {
        SecondNumber1 = Number(numberString);
        CountWhat2 = 0;
      }
    }
    if (lastOperator !== '') {
      answer();
    }

    values[0] = Number(numberString);
    values[1] = 0;
    lastOperator = operator;
    setNumberString('');
    setHistory1String(`${numberString} ${operator}`);
  }

  /////////////////////////////////  UI     ///////////////////////////////

  const shouldEnableHorizontalScroll = numberString.length > 12;
  return (
    <View style={styles.viewStyle}>
      <View style={styles.history1}>
        <View style={styles.history11}>
          <Text style={styles.historyTopText}>{history3StringCalc}</Text>
          <Text style={styles.historyBottomText}>{history3StringResult}</Text>
        </View>
      </View>
      <View style={styles.history2}>
        <Text style={styles.historyTopText}>{history2StringCalc}</Text>
        <Text style={styles.historyBottomText}>{history2StringResult}</Text>
      </View>

      <View style={styles.result}>
        <Text style={styles.calculation}>{history1String}</Text>
        <ScrollView scrollEnabled={shouldEnableHorizontalScroll} horizontal={shouldEnableHorizontalScroll}>
        <Text style={styles.results}>{numberString}</Text>
        </ScrollView>
      </View>

      <View style={styles.buttons}>
        <View style={styles.btnGroup1}>
          <TouchableOpacity
            onPress={() => clear()}
            style={styles.whiteButtons}>
            <Text style={styles.whiteBtnText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => popFromNumber()} style={styles.whiteButtons}>
            <Text style={styles.whiteBtnText}>CE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>operatorPushed("%")} style={styles.whiteButtons}>
            <Text style={styles.whiteBtnText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => operatorPushed('/')} style={styles.yellowButtons}>
            <Text
              style={styles.yellowBtnText}>
              /
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnGroup2}>
          <TouchableOpacity
            onPress={() => mainFunction(7, false)}
            style={styles.greyButtons}>
            <Text style={styles.greyBtnText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => mainFunction(8, false)}
            style={styles.greyButtons}>
            <Text style={styles.greyBtnText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => mainFunction(9, false)}
            style={styles.greyButtons}>
            <Text style={styles.greyBtnText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => operatorPushed('x')} style={styles.yellowButtons}>
            <Text
              style={styles.yellowBtnText}>
              x
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnGroup2}>
          <TouchableOpacity
            onPress={() => mainFunction(4, false)}
            style={styles.greyButtons}>
            <Text style={styles.greyBtnText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => mainFunction(5, false)}
            style={styles.greyButtons}>
            <Text style={styles.greyBtnText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => mainFunction(6, false)}
            style={styles.greyButtons}>
            <Text style={styles.greyBtnText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => operatorPushed('-')} style={styles.yellowButtons}>
            <Text
              style={styles.yellowBtnText}>
              -
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnGroup2}>
          <TouchableOpacity
            onPress={() => mainFunction(1, false)}
            style={styles.greyButtons}>
            <Text style={styles.greyBtnText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => mainFunction(2, false)}
            style={styles.greyButtons}>
            <Text style={styles.greyBtnText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => mainFunction(3, false)}
            style={styles.greyButtons}>
            <Text style={styles.greyBtnText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => operatorPushed('+')} style={styles.yellowButtons}>
            <Text
              style={styles.yellowBtnText}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnGroup3}>
          <TouchableOpacity
            onPress={() => mainFunction(0, false)}
            style={styles.bigGreyBtn}>
            <Text style={styles.greyBtnText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => addDecimal()}
            style={styles.greyButtons}>
            <Text style={styles.greyBtnText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => answer()}
            style={styles.yellowButtons}>
            <Text style={styles.yellowBtnText}>=</Text>
          </TouchableOpacity>
        </View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#17181A',
    width: '100%',
    height: '100%',
  },
  history1: {
    justifyContent: 'space-between',
  },
  history11: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
  },
  history2: {
    width: '100%',
    height: 100,
  },
  result: {
    maxHeight: 100,
    marginTop: 70,
    marginBottom: 5,
    textAlign:'right',
  },
  buttons: {
    height: '100%',
    flexDirection: 'column',
    marginTop: 40,
  },
  btnGroup1: {
    marginRight: 40,
    marginLeft: 38,
    flexDirection: 'row',
    gap: 30,
  },
  btnGroup2: {
    marginTop: 20,
    marginRight: 40,
    marginLeft: 38,
    flexDirection: 'row',
    gap: 30,
  },
  btnGroup3: {
    marginTop: 20,
    marginRight: 40,
    marginLeft: 38,
    flexDirection: 'row',
    gap: 30,
  },
  whiteButtons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 62,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#D4D4D2',
  },
  yellowButtons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 62,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#FF9500',
  },
  greyButtons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 62,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#505050',
  },
  bigGreyBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 154,
    height: 62,
    borderRadius: 60,
    backgroundColor: '#505050',
  },
  whiteBtnText: {
    color: '#1C1C1C',
    fontFamily: 'Poppins',
    fontSize: 28,
    marginBottom: 2,
  },
  yellowBtnText: {
    color: '#D4D4D2',
    fontFamily: 'Poppins-Medium',
    fontSize: 28,
    marginBottom: 2,
  },
  greyBtnText: {
    color: '#D4D4D2',
    fontFamily: 'Poppins-Medium',
    fontSize: 28,
    marginBottom: 2,
  },
  calculation: {
    color: '#828282',
    fontSize: 30,
    textAlign: 'right',
    marginRight: 25,
  },
  results: {
    color: '#D4D4D2',
    fontSize: 55,
    textAlign: 'right',
    marginRight: 25,
  },
  historyTopText: {
    color: '#828282',
    textAlign: 'right',
    marginRight: 25,
    fontSize: 15,
  },
  historyBottomText: {
    color: '#D4D4D2',
    textAlign: 'right',
    marginRight: 25,
    fontSize: 15,
  },
});

export default App;
