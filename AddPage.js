'use strict';
var React = require('react-native');

var {
  Text,
  View,
  ListView,
  TouchableHighlight,
  StyleSheet,  
} = React;

var Data = [{label: '类型'}, '.', {label: '日期'}, '-', '=', '-', 'save'];

var AddPage =  React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(Data),
    };
  },

  onPress: function () {
      this.props.navigator.push({
          title: '选择类型',
          component: SelectLogType2,
      })
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
              <TouchableHighlight onPress={this.onPress} 
                underlayColor='#cccccc'
                style={[{padding: 10}]}>
                <Text style={[{alignSelf: 'center', color:'#0000FF'}]}>保存</Text>
              </TouchableHighlight>
            </View>
          )       
      } else {
          return (
              <TouchableHighlight onPress={this.onPress} 
                    underlayColor='#cccccc'
                    style={[{backgroundColor: '#ffffff', padding: 10}]}>
                    <View style={styles.row}>
                      <View style={styles.cell}> 
                      <Text style={styles.label}>{row.label}</Text>
                      </View>
                      <Text style={styles.value}>出境</Text>
                      <Text style={styles.arrow}>&gt;</Text>
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





class SelectLogType extends AddPage {
  constructor(props) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([{id:'in', label:'境内'},{id:'out', label:'境外'}]),
    };
  }

  renderRow(row: object, sectionID: number, rowID: number) {
    var height = 0.5;
    if (rowID == 1) {
      height = 0;
    }
    return (        
            <TouchableHighlight onPress={this.onPress} 
              underlayColor='#cccccc'
              style={[{backgroundColor: '#ffffff'}]}>
              <View style={{flex: 1, flexDirection:'column'}}>  
                <View style={[styles.row, {padding: 10}]}>
                  <View style={styles.cell}> 
                  <Text style={styles.label}>{row.label}</Text>
                  </View>
                </View>
                <View style={{flex: 1, marginLeft: 10, height: height, backgroundColor:"#aabbaa"}}/>
              </View>  
        </TouchableHighlight>
    );
  }

  onPress() {

  }

  render() {
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
  }  
};



var SelectLogType2 = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([{id:'in', label:'境内'},{id:'out', label:'境外'}]),
    };
  },

  renderRow: function(row: object, sectionID: number, rowID: number) {
    var height = 0.5;
    if (rowID == 1) {
      height = 0;
    }
    return (        
        <TouchableHighlight onPress={this.onPress} 
              underlayColor='#cccccc'
              style={[{backgroundColor: '#ffffff'}]}>
              <View style={{flex: 1, flexDirection:'column'}}>  
                <View style={[styles.row, {padding: 10}]}>
                  <View style={styles.cell}> 
                  <Text style={styles.label}>{row.label}</Text>
                  </View>
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
    fontSize: 8,
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
