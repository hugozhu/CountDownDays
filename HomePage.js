'use strict';
var React    = require('react-native');

var Data = [
  { in:true,  date:'2015-03-01' , title:'入境 🚁'},
  { in:false, date:'2015-03-24' , title:'出境 ✈'},
  { in:true,  date:'2015-04-01' , title:'入境 🚁'},
  { in:false, date:'2015-04-24' , title:'出境 ✈'},
  { in:true,  date:'2015-05-01' , title:'入境 🚁'},
  { in:false, date:'2015-05-04' , title:'出境 ✈'},
  null,
];

var {
  Text,
  View,
  ListView,
  TouchableHighlight,
  StyleSheet,
} = React;

var EditPage = require('./EditPage');

var HomePage =  React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(Data),
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


  onEditPageButtonPress: function(id) {  
      this.props.navigator.push({
          title: '修改记录',
          component: EditPage,
      })
  },

  renderRow: function(row: object, sectionID: number, rowID: number) { 
        if (row === null) {
            return (
              <View style={styles.separator} />
            );
        }
        return (
            <TouchableHighlight onPress={() => this.onEditPageButtonPress(rowID)}>
              <View>
                <View style={styles.separator} />
                <View style={styles.row}>
                  <View style={styles.cell}> 
                      <Text style={styles.date}>{row.date}</Text> 
                  </View>            
                  <View style={styles.cell}> 
                      <Text style={styles.title}>{row.title}</Text>                   
                  </View>
                </View>
              </View>
            </TouchableHighlight>
      );
  }, 
});

module.exports = HomePage;

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