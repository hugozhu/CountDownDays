'use strict';
var React = require('react-native');

var {
  AppRegistry,
  Text,
  View,
  TabBarIOS,  
  ListView,
  NavigatorIOS,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
} = React;

var HomePage      = require('./HomePage');
var AddPage       = require('./AddPage');
var SettingPage   = require('./SettingPage');


var homepageInstance;
var CountDownDays = React.createClass({
  statics: {
    title: 'CountDownDays',
    description: 'Count how many days left that I am required to stay in this country',
  },  

  getInitialState: function() {
    return {
      selectedTab: 'homeTab',
    };
  },

  render: function() { 
      return ( 
        <TabBarIOS>
          <TabBarIOS.Item
            systemIcon="history"
            badge={undefined}
            selected={this.state.selectedTab === 'homeTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'homeTab'
              });
            }}>
            {this._render_home()}
          </TabBarIOS.Item>
          <TabBarIOS.Item
            systemIcon="more"
            selected={this.state.selectedTab === 'moreTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'moreTab'
              });
            }}>
            {this._render_more()}
          </TabBarIOS.Item>
        </TabBarIOS>
      );
  },

  onLogChanged: function() {
      //刷新数据
      homepageInstance.componentDidMount()
  },

  onAddPageButtonPress: function() {
      this.refs.nav_home.push({
          title: '增加记录',
          component: AddPage,
          passProps: {
              callback: this.onLogChanged,              
          },
      })
  },

  _render_home: function() {
    return (  
        <NavigatorIOS ref="nav_home" style={styles.container} 
          barTintColor='#000000' 
          tintColor='#FFFFFF'
          titleTextColor='#FFFFFF'
          initialRoute={{
            component: HomePage,            
            title: '出入境记录',
            rightButtonTitle: '＋',
            onRightButtonPress: this.onAddPageButtonPress,
            passProps: { 
                callback: function(homepage) {
                    //获取到homepage对象，供刷新使用
                    homepageInstance = homepage;
                }
            },
        }} />
    );
  },

  _render_more: function() {
    return (  
        <NavigatorIOS ref="nav_more" style={styles.container} 
            barTintColor='#000000' 
            tintColor='#FFFFFF'
            titleTextColor='#FFFFFF'        
            initialRoute={{
            component: SettingPage,
            title: '设置'
        }} />
    );
  },

});

var styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ECF6E8',
  },  
  head: {
      textAlign: 'center',
      fontSize: 25,  
      padding: 10,
  },
});

AppRegistry.registerComponent('CountDownDays', () => CountDownDays);