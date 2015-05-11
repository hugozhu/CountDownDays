'use strict';
var React = require('react-native');

var {
  Text,
  View,
  ListView,
  TouchableHighlight,
  DatePickerIOS,
  StyleSheet,  
} = React;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var Data = [{label: '类型'}, '.', {label: '日期'}, '-', '=', '-', 'save'];

var AddPage =  React.createClass({
  getDataSource: function(items: Array<any>): ListView.DataSource {
    return ds.cloneWithRows(items);
  },

  getInitialState: function() {
    return {
      dataSource: this.getDataSource(Data),
      logType: 'in',
      logDate: new Date(),
    };
  },

  onAddLog: function() {
      alert(this.state.logType+" "+this.state.logDate);
  },

  onSelectLogType: function () {
      this.props.navigator.push({
          title: '选择类型',
          component: SelectLogType,
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
          component: SelectLogDate,
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
            <View style={styles.space}/>
          )
      } else if (row == 'save') {
          return (
            <View style={[{backgroundColor: '#ffffff'}]}>
              <TouchableHighlight onPress={this.onAddLog} 
                underlayColor='#cccccc'
                style={[{padding: 10}]}>
                <Text style={[{alignSelf: 'center', color:'#0000FF'}]}>保存</Text>
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
                      <Text style={styles.value}>{SelectLogType.getLabel(this.state.logType)}</Text>
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

var SelectLogType = React.createClass({
  statics: {
      DATA: [{id:'in', label:'境内'},{id:'out', label:'境外'}],
      getLabel: function(logType) {
        for (var i in SelectLogType.DATA) {
          console.log(SelectLogType.DATA[i].id, logType)
          if (SelectLogType.DATA[i].id==logType) {
            return SelectLogType.DATA[i].label;
          }
        }
        return "境内";
      },
  },  

  getDataSource: function(items: Array<any>): ListView.DataSource {
    return ds.cloneWithRows(items);
  },

  getInitialState: function() {
    return {
      dataSource: this.getDataSource(SelectLogType.DATA),
      selectedId: this.props.logType,
    };
  },

  onPress: function(id) {
    this.props.callback(id);
    this.props.navigator.pop();
  },

  renderRow: function(row: object, sectionID: number, rowID: number) {
    var height = 0.5;
    if (rowID == 1) {
      height = 0;
    }
    return (        
        <TouchableHighlight onPress={() => this.onPress(row.id)} 
              underlayColor='#cccccc'
              style={[{backgroundColor: '#ffffff'}]}>
              <View style={{flex: 1, flexDirection:'column'}}>  
                <View style={[styles.row, {padding: 10}]}>
                  <View style={styles.cell}> 
                  <Text style={styles.label}>{row.label}</Text>
                  </View>
                  {this.state.selectedId == row.id ? <Text style={styles.arrow}>✔</Text> : null}
                </View>
                <View style={{flex: 1, marginLeft: 10, height: height, backgroundColor:"#aabbaa"}}/>        
              </View>  
        </TouchableHighlight>
    );
  },

  renderHeader: function() {
    return (
      <View style={styles.separator}/>
    )
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


var SelectLogDate = React.createClass({
  getDefaultProps: function () {
    return {
      date: new Date(),
    };
  },

  getInitialState: function() {
    return {
      date: this.props.date,
    };
  },  

  onDateChange: function(t) {
    this.props.callback(t);
    this.setState({
      date: t,
    })
  },

  render: function() {
      return (
        <View>
          <DatePickerIOS
              date={this.state.date}
              mode="date"
              onDateChange={this.onDateChange}
            />
        </View>       
      );
  }
});


module.exports = AddPage;

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
