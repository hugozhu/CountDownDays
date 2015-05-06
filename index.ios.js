'use strict';
var React = require('react-native');

var {
  AppRegistry,
  Text,
  View,
  TabBarIOS,  
  ListView,
  Navigator,
  NavigatorIOS,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
} = React;

var NavigationBar = require('react-native-navbar');
var HomePage      = require('./HomePage');
var AddPage       = require('./AddPage');
var SettingPage   = require('./SettingPage');

var CountDownDays = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.'
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

  renderRow: function(row: object, sectionID: number, rowID: number) { 
        return ( 
            <TouchableHighlight onPress={() => this._pressRow(rowID)}>
              <View>
                <View style={styles.row}>
                  <View style={styles.cell}> 
                      <Text style={styles.date}>{row.date}</Text>
                  </View>            
                  <View style={styles.cell}> 
                      <Text style={styles.title}>{row.title}</Text>                   
                  </View>
                </View>              
                <View style={styles.separator} />
              </View>
            </TouchableHighlight>
      );
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
              selectedTab: 'homeTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          {this._render_home()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="more"
          selected={this.state.selectedTab === 'moreTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'moreTab',
              presses: this.state.presses + 1
            });
          }}>
          {this._render_more()}
        </TabBarIOS.Item>
      </TabBarIOS>
      );
  }, 

  _render_home: function() {
    return (  
      <Navigator
        style={styles.navigator}
        renderScene={this.renderScene}
        initialRoute={{
          component: HomePage,
          navigationBar: <NavigationBar title="出入境记录" 
                                        customNext={<AddDate/>} />
      }}>        
      </Navigator>
    );
  },

  _render_more: function() {
    return (  
      <Navigator
        style={styles.navigator}
        renderScene={this.renderScene}
        initialRoute={{
          component: SettingPage,
          navigationBar: <NavigationBar title="设置"/>
      }}>        
      </Navigator>
    );
  },

});

/**
 * Custom `Next` button component
 */
class AddDate extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => {
          this.props.navigator.push({
            title: 'Add Record',
            component: AddPage,
            passProps: {foo: 'bar'}
          });
        }}>
        <Text style={styles.btn_add}>Add</Text>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  head: {
      textAlign: 'center',
      fontSize: 25,  
      padding: 10,
  },  

  btn_add: {
      color: '#0000FF',
      fontSize: 16,  
      marginBottom: 8,
      marginRight: 20,
      textAlign: 'center',
  },  
});

AppRegistry.registerComponent('CountDownDays', () => CountDownDays);