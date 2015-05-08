'use strict';
var React = require('react-native');
var t     = require('tcomb-form-native');

var {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,  
} = React;

var Form = t.form.Form;
var LogType = t.enums({
  'in': '入境',
  'out': '出境',
});
var Log = t.struct({
  logType: LogType,               // a required number
  logDate: t.Dat        // a boolean
});
var options = {
  auto: 'none',
  fields: {
    logType: {
      label: '类型:',
    },
    logDate: {
        label: '日期:',
        mode: 'date',
    },   
  }  
}; 
var value = {
    logType: 'in',
    logDate: new Date(),
}
var AddPage =  React.createClass({
  onPress: function () {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); 
    }
  },

  render: function() {
    return (
      <View style={[styles.scene, {backgroundColor: '#ECF6E8', padding: 10}]}>        
        <Form
          ref="form"
          type={Log}
          value={value} 
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>保存</Text>
        </TouchableHighlight>
      </View>
    );
  },  
});

module.exports = AddPage;


var styles = StyleSheet.create({
  scene: {
      paddingTop: 74,
      flex: 1,
  },  
  title: {
      fontSize: 20,
      textAlign: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },  
});
