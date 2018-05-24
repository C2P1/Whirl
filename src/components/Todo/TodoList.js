import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ListView,
  ActivityIndicator,
  Text
} from 'react-native';
import TodoItem from './TodoItem';
import Amplify, { API, Auth } from 'aws-amplify';

class todoList extends Component {
  state = {
    isLoading: true
  };

  async componentDidMount() {
    const path = '/Todo/' + this.state.email;
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.setState({
      dataSource: ds.cloneWithRows(this.props.apiResponse),
      isLoading: !this.state.isLoading
    });
  }

  render() {
    if (this.state.isLoading) {
      return <View />;
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={rowData => (
          <TodoItem
            todo={rowData.Content}
            user={rowData.User}
            strikethrough={rowData.Strikethrough}
            onDeletePressed={() =>
              this.props.onDeletePressed(rowData.Content, rowData.User)
            }
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  }
});

export default todoList;