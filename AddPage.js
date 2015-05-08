'use strict';
var React = require('react-native');

var {
  Text,
  View,
  StyleSheet,  
} = React;

var AddPage =  React.createClass({
  render: function() {
    return (
      <View style={[styles.scene, {backgroundColor: '#ECF6E8'}]}>
        <Text>Add</Text>
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
});
