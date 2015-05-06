'use strict';
var React = require('react-native');

var Data = [
  { in:true,  date:'2015-03-01' , title:'入境 🚁'},
  { in:false, date:'2015-03-24' , title:'出境 ✈'},
  { in:true,  date:'2015-04-01' , title:'入境 🚁'},
  { in:false, date:'2015-04-24' , title:'出境 ✈'},
  { in:true,  date:'2015-05-01' , title:'入境 🚁'},
  { in:false, date:'2015-05-04' , title:'出境 ✈'},
];

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

var HomePage =  React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      selectedTab: 'homeTab',
      dataSource: ds.cloneWithRows(Data),
    };
  },
  
  render: function() {
    return (
      <View>
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
});

module.exports = HomePage;