'use strict';
var React = require('react-native');
var SQLite = require('react-native-sqlite');
var Forms  = require('./Forms');

var {
  Text,
  View,
  ListView,
  TouchableHighlight,
  DatePickerIOS,
  StyleSheet,  
} = React;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var Data = [{label: '类型'}, '.', {label: '日期'}, '=', 'save',  '=', 'delete'];

var EditPage =  React.createClass({
  getDataSource: function(items: Array<any>): ListView.DataSource {
    return ds.cloneWithRows(items);
  },

  getInitialState: function() {
    return {
      dataSource: this.getDataSource(Data),
      logType: this.props.log.log_type,
      logDate: new Date(this.props.log.log_date),
    };
  },

  onSaveLog: function() {
    var type = this.state.logType;    
    var date = Forms.formateDate(this.state.logDate);

    var log = this.props.log;
    var callback = this.props.callback;
    var navigator = this.props.navigator;

    SQLite.open("data.sqlite", function (error, database) {
        if (error) {
          console.log("Failed to open database:", error);
          return;
        }

        database.executeSQL(
          "UPDATE log set log_date=?, log_type=?, modified=? WHERE id=?",
           [date, type, 0, log.id], 
           ()=>{},
           (error)=>{
              var success = true;
              if (error) {
                alert(error);
                success = false;
              }
              console.log("Query complete!");
              database.close(function (error) {
                if (error) {
                  console.log("Failed to close database:", error);
                  return
                }

                //保存成功，返回到所有记录
                if (success) {
                  callback();
                  navigator.pop();
                }
              });
           });
    });      
  },

onDeleteLog: function() {
    var log = this.props.log;
    var callback = this.props.callback;
    var navigator = this.props.navigator;

    SQLite.open("data.sqlite", function (error, database) {
        if (error) {
          console.log("Failed to open database:", error);
          return;
        }

        database.executeSQL(
          "DELETE FROM log WHERE id=?",
           [log.id], 
           ()=>{},
           (error)=>{
              var success = true;
              if (error) {
                alert(error);
                success = false;
              }
              console.log("Query complete!");
              database.close(function (error) {
                if (error) {
                  console.log("Failed to close database:", error);
                  return
                }

                //保存成功，返回到所有记录
                if (success) {
                  callback();
                  navigator.pop();
                }
              });
           });
    });      
  },  

  onSelectLogType: function () {
      this.props.navigator.push({
          title: '选择类型',
          component: Forms.SelectLogType,
          passProps: {
              logType: this.state.logType, 
              callback: this.selectLogTypeCallback,
          },
      })
  },

  selectLogTypeCallback: function(logType) {
      this.setState({
          dataSource: this.getDataSource(Data),
          logType: logType,
      });
  },

  onSelectLogDate: function () {
      this.props.navigator.push({
          title: '选择日期',
          component: Forms.SelectLogDate,
          passProps: {
                        date: this.state.logDate, 
                        callback: this.selectLogDateCallback,
                    },
      })
  },  

  selectLogDateCallback: function(logDate) {
      this.setState({
          dataSource: this.getDataSource(Data),        
          logDate: logDate,
      });
  },

  renderHeader: function() {
    return (
      <View style={styles.separator}/>
    )
  },

  renderRow: function(row: object, sectionID: number, rowID: number) {
      if (row == '.') {
          return (
            <View style={styles.separator2}/>
          )
      } else if (row == '-') {
          return (
            <View style={styles.separator}/>
          )
      } else if (row == '=') {
          return (
            <View> 
              <View style={styles.separator}/>
              <View style={styles.space}/>
              <View style={styles.separator}/>
            </View>
          )
      } else if (row == 'save') {
          return (
            <View style={[{backgroundColor: '#ffffff'}]}>
              <TouchableHighlight onPress={this.onSaveLog} 
                underlayColor='#cccccc'
                style={[{padding: 10}]}>
                <Text style={[{alignSelf: 'center', color:'#0000FF'}]}>保存</Text>
              </TouchableHighlight>
            </View>
          )   
      } else if (row == 'delete') {
          return (
            <View style={[{backgroundColor: '#FF0000'}]}>
              <TouchableHighlight onPress={this.onDeleteLog} 
                underlayColor='#cccccc'
                style={[{padding: 10}]}>
                <Text style={[{alignSelf: 'center', color:'#FFFFFF'}]}>删除</Text>
              </TouchableHighlight>
            </View>
          )
      } else if (rowID == 0) {
          return (
              <TouchableHighlight onPress={this.onSelectLogType} 
                    underlayColor='#cccccc'
                    style={[{backgroundColor: '#ffffff', padding: 10}]}>
                    <View style={styles.row}>
                      <View style={styles.cell}> 
                      <Text style={styles.label}>{row.label}</Text>
                      </View>
                      <Text style={styles.value}>{Forms.SelectLogType.getLabel(this.state.logType)}</Text>
                      <Text style={styles.arrow}>﹥</Text>
                    </View>
              </TouchableHighlight>
          )           
      } else {
          return (
              <TouchableHighlight onPress={this.onSelectLogDate} 
                    underlayColor='#cccccc'
                    style={[{backgroundColor: '#ffffff', padding: 10}]}>
                    <View style={styles.row}>
                      <View style={styles.cell}> 
                      <Text style={styles.label}>{row.label}</Text>
                      </View>
                      <Text style={styles.value}>{this.state.logDate.toDateString()}</Text>
                      <Text style={styles.arrow}>﹥</Text>
                    </View>
              </TouchableHighlight>
          )               
      }
  },

  render: function() {
    return (
      <View style={[styles.scene, { padding: 0}]}>
        <ListView
          style={styles.listView} 
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderHeader={this.renderHeader}
          renderFooter={this.renderHeader}
          renderRow={this.renderRow}/>
      </View>
    );
  },
});


module.exports = EditPage;

var styles = StyleSheet.create({
  scene: {
      paddingTop: 74,
      flex: 1,
      backgroundColor: '#eeeeee',
  },  
  listView: {
    backgroundColor: '#eeeeee',
  },
  space: {
    height: 15,
  },  
  separator: {
    height: 0.5,
    backgroundColor: '#cccccc',
  },   
  separator2: {
    marginLeft: 10,
    height: 0.5,
    backgroundColor: '#cccccc',
  },  
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0,
  },
  cell: {
      flex: 1,      
  },
  label: {
      fontSize: 12,
      textAlign: 'left',
  },  
  value:{
    fontSize: 12,
    textAlign: 'right',
    marginRight: 10,
  },  
  arrow:{
    fontSize: 7,
    textAlign: 'right',
    color:'#cccccc',
  },
  button: {
    marginLeft:150,
    marginRight:150,
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },  
});