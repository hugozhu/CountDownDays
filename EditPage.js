'use strict';
var React = require('react-native');

var {
  Text,
  View,
  StyleSheet,  
} = React;

var EditPage =  React.createClass({
  render: function() {
    return (
      <View style={[styles.scene, {backgroundColor: '#ECF6E8'}]}>
        <Text>Edit</Text>
      </View>
    );
  },  
});

module.exports = EditPage;


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
