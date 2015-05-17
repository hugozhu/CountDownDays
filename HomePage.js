'use strict';
var React    = require('react-native');
var SQLite   = require('react-native-sqlite');
var EditPage = require('./EditPage');
var Forms    = require('./Forms');

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
      total: '...',
      dataSource: ds,
    };
  },
  
  renderHeader: function() {
    return (
      <View style={styles.separator}/>
    )
  },

  render: function() {
    return (
      <View style={[styles.scene]}>
        <View style={[{backgroundColor:'#FFFFFF'}]}>
          <Text style={styles.head}>已在境内 <Text style={[{color: '#FF0000'}]}>{this.state.total}</Text> 天</Text>
        </View>
        <ListView
          style={styles.listView} 
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderHeader={this.renderHeader}
          renderRow={this.renderRow}>
        </ListView>
      </View>
    );
  },

  componentDidMount: function () {
    var logs = [];
    database.executeSQL(
      "SELECT * FROM log  ORDER BY log_date DESC LIMIT 60",
      [],
      (row) => {
        logs.push(row);
      },
      (error) => {
        if (error) {
          throw error;
        } else {
          this.setState({
            total: 10,
            dataSource: this.state.dataSource.cloneWithRows(logs)}
          );
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
    return (
        <TouchableHighlight
            underlayColor='#cccccc'
            style={[{backgroundColor: '#ffffff'}]}          
            onPress={() => this.onEditPageButtonPress(row)}>
          <View>
            <View style={styles.row}>
              <View style={styles.cell}> 
                  <Text style={styles.date}>{row.log_date}</Text> 
              </View>            
              <View style={styles.cell}> 
                  <Text style={styles.title}>{Forms.SelectLogType.getLabel(row.log_type)}</Text> 
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        </TouchableHighlight>
    );
  }, 
});

module.exports = HomePage;

var styles = StyleSheet.create({
  scene: {
      backgroundColor: '#eeeeee',
      paddingTop: 65,
      flex: 1,
  },
  head: {
      textAlign: 'center',
      fontSize: 20,  
      padding: 15,
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
  },

  separator: {
    height: 0.5,
    backgroundColor: '#cccccc',
  },    

  listView: {
    backgroundColor: '#eeeeee',    
  }, 

  title: {
      textAlign: 'center',
  },  
  date: {
      textAlign: 'center',
  },
});