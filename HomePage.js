'use strict';
var React    = require('react-native');
var SQLite   = require('react-native-sqlite');
var EditPage = require('./EditPage');
var Forms    = require('./Forms');
var {LocationUtil} = require('NativeModules');

LocationUtil.helloworld("hugozhu",
    (results) => {
        alert('Error: ' + results);
    }, 
    (results) => {
        alert('Success: ' + results);
    });

var {
  Text,
  View,
  ListView,
  TouchableHighlight,
  StyleSheet,
} = React;

var database = SQLite.open("data.sqlite");

console.log(Forms.styles)

var HomePage =  React.createClass({
  getInitialState: function() {
    this.props.callback(this)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      total: '...',
      dataSource: ds,
      initialPosition: 'unknown',
      lastPosition: 'unknown',      
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

  watchID: (null: ?number),

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
            dataSource: this.state.dataSource.cloneWithRows(logs)
          });
        }
      });

    database.executeSQL(
      "SELECT count(*) as c FROM log WHERE log_type=?",
      ['in'],
      (row) => {
          this.setState({
            total: row.c,
          });
      },
      (error) => {
        
      });

    // navigator.geolocation.getCurrentPosition(
    //   (initialPosition) => {
    //         this.setState({initialPosition}),
    //         console.log(initialPosition)
    //   },
    //   (error) => console.log(error),
    //   {enableHighAccuracy: false, timeout: 100, maximumAge: 1000}
    // );

    // this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
    //   this.setState({lastPosition});
    // });    

  },

 componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
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
    var style_row = {};
    if (row.log_type == 'arrival') {
        style_row = { backgroundColor:'#ee0000' };
    } else if (row.log_type == 'departure') {
        style_row = { backgroundColor:'#0000ee' };
    }
    return (
        <TouchableHighlight
            underlayColor='#cccccc'
            style={[{backgroundColor: '#ffffff'}]}          
            onPress={() => this.onEditPageButtonPress(row)}>
          <View>
            <View style={[styles.row, style_row]}>
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