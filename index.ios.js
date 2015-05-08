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

var CountDownDays = React.createClass({
  statics: {
    title: 'CountDownDays',
    description: 'Count how many days left that I am required to stay in this country',
  },

  renderScene(route, navigator) {
    var Component = route.component;
    var navBar = route.navigationBar;

    if (navBar) {
      navBar = React.addons.cloneWithProps(navBar, {
        navigator: navigator,
        route: route
      });
    }

    return (
      <View style={styles.navigator}>
        {navBar}
        <Component navigator={navigator} route={route} />
      </View>
    );
  },

  handleNext() {
    alert('Next button click handler');
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

  onAddPageButtonPress: function() {
      this.refs.nav_home.push({
          title: '增加记录',
          component: AddPage
      })
  },

  _render_home: function() {
    return (  
        <NavigatorIOS ref="nav_home" style={styles.container} initialRoute={{
            component: HomePage,
            title: '出入境记录',
            rightButtonTitle: '增加',
            onRightButtonPress: this.onAddPageButtonPress,
        }} />
    );
  },

  _render_more: function() {
    return (  
        <NavigatorIOS ref="nav_more" style={styles.container} initialRoute={{
            component: SettingPage,
            title: '设置'
        }} />
    );
  },

});

var styles = StyleSheet.create({
  container: {
      flex: 1
  },  
  head: {
      textAlign: 'center',
      fontSize: 25,  
      padding: 10,
  },
});

AppRegistry.registerComponent('CountDownDays', () => CountDownDays);