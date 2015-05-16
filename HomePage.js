'use strict';
var React    = require('react-native');
var SQLite   = require('react-native-sqlite');
var EditPage = require('./EditPage');

var {
  Text,
  View,
  ListView,
  TouchableHighlight,
  StyleSheet,
} = React;

var database = SQLite.open("data.sqlite");

var HomePage =  React.createClass({
  getInitialState: function() {
    this.props.callback(this)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds,
    };
  },
  
  render: function() {
    return (
      <View style={[styles.scene, {backgroundColor: '#ECF6E8'}]}>
        <Text style={styles.head}>已在境内 56 天</Text>
        <ListView
          style={styles.listView} 
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}>
        </ListView>
      </View>
    );
  },

  componentDidMount: function () {
    var logs = [];
    database.executeSQL(
      "SELECT * FROM log ORDER BY log_date DESC",
      [],
      (row) => {
        logs.push(row);
      },
      (error) => {
        if (error) {
          throw error;
        } else {
          this.setState({dataSource: this.state.dataSource.cloneWithRows(logs)});
        }
      });
  },

  onLogChanged: function() {
    this.componentDidMount();
  },

  onEditPageButtonPress: function(row) {  
      this.props.navigator.push({
          title: '修改记录',
          component: EditPage,
          passProps: {
              callback: this.onLogChanged,
              log: row,
          },          
      })
  },

  renderRow: function(row: object, sectionID: number, rowID: number) { 
        if (row === null) {
            return (
              <View style={styles.separator} />
            );
        }
        return (
            <TouchableHighlight onPress={() => this.onEditPageButtonPress(row)}>
              <View>
                <View style={styles.separator} />
                <View style={styles.row}>
                  <View style={styles.cell}> 
                      <Text style={styles.date}>{row.log_date}</Text> 
                  </View>            
                  <View style={styles.cell}> 
                      <Text style={styles.title}>{row.log_type}</Text>                   
                  </View>
                </View>
              </View>
            </TouchableHighlight>
      );
  }, 
});

module.exports = HomePage;
module.exports.onLogChanged = function() {
    console.log("hello");
}

var styles = StyleSheet.create({
  scene: {
      paddingTop: 74,
      flex: 1,
  },
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
      height: 50,
      backgroundColor: '#eeeeee',
  },
  separator: {
    height: 1,
    backgroundColor: '#ffffff',
  },  
  listView: {
  }, 
  title: {
      fontSize: 20,
      textAlign: 'center',
  },  
  date: {
      fontSize: 20,    
      height:30,
      textAlign: 'center',
  },
});