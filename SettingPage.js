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
        <Text>Settting</Text>
      </View>
    );
  },  
});

module.exports = SettingPage;