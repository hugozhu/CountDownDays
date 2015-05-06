'use strict';
var React = require('react-native');

var {
  AppRegistry,
  Text,
  View,
  TabBarIOS,  
  ListView,
  Navigator,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
} = React;

var NavigationBar = require('react-native-navbar');
var HomePage      = require('./HomePage');
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
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'homeTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'homeTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          {this._render_home('#783E33', 'Home Tab')}
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
          {this._render_more('#21551C', 'More Tab')}
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
      <TouchableOpacity onPress={() => alert('next') }>
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
  row: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0,
  },
  cell: {
      flex: 1,
      padding: 10,
      backgroundColor: '#eeeeee',
  },  
  separator: {
    height: 1,
    backgroundColor: '#ffffff',
  },  
  listView: {
    backgroundColor: '#eeeeee',
  }, 
  title: {
      fontSize: 20,
      textAlign: 'center',
  },  
  date: {
      fontSize: 20,    
      textAlign: 'center',
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