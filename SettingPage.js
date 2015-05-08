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

var SettingPage =  React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'moreTab',
    };
  },
  
  render: function() {
    return (
      <View>
        <Text> Settting </Text>
        <Text> Settting 12312 3</Text>
      </View>
    );
  },  
});

module.exports = SettingPage;