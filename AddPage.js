'use strict';
var React = require('react-native');

var {
  Text,
  View,
  StyleSheet,  
} = React;

var styles = StyleSheet.create({  
  title: {
      fontSize: 20,
      textAlign: 'center',
  },  
});

var AddPage =  React.createClass({
  render: function() {
    return (
      <View>
        <Text>Add</Text>
      </View>
    );
  },  
});

module.exports = AddPage;