'use strict';
var React = require('react-native');

var {
  Text,
  View,
  StyleSheet,  
} = React;

var SettingPage =  React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'moreTab',
    };
  },
  
  render: function() {
    return (
      <View style={styles.scene}>
        <Text> 选择 移民国家 等... </Text>
      </View>
    );
  },  
});

module.exports = SettingPage;

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
