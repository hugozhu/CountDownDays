'use strict';

var React  = require('react-native');

var {
  Text,
  View,
  ListView,
  TouchableHighlight,
  DatePickerIOS,
  StyleSheet,  
} = React;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var formateDate =  function toJSONLocal (date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
}

var SelectLogType = React.createClass({
  statics: {
      DATA: [{id:'in', label:'境内'},{id:'out', label:'境外'},{id:'arrival', label:'入境'},{id:'departure', label:'出境'}],
      getLabel: function(logType) {
        for (var i in SelectLogType.DATA) {          
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
    if (rowID == SelectLogType.DATA.length-1) {
      //最后一行不加分隔线
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
          <Text style={[{paddingTop: 80, paddingLeft: 20, color:'#0000FF'}]}>请选择记录日期：</Text>  
          <DatePickerIOS
              date={this.state.date}
              mode="date"
              onDateChange={this.onDateChange}
            />
        </View>       
      );
  }
});

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
});



module.exports = {
  SelectLogType: SelectLogType,
  SelectLogDate: SelectLogDate,
  formateDate: formateDate,
  styles: styles,
}