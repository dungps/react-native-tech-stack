import React, { Component } from 'react';
import {
    Text,
    TouchableWithoutFeedback,
    View,
    UIManager,
    LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class ListItem extends Component {
    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    renderDescription() {
        if (this.props.expanded) {
            return (
                <CardSection>
                    <View style={{ flex: 1 }} >
                        <Text>{this.props.library.description}</Text>
                    </View>
                </CardSection>
            );
        }
    }

    onPress() {
        this.props.selectLibrary(this.props.library.id);
    }

    render() {
        return (
            <TouchableWithoutFeedback
                onPress={this.onPress.bind(this)}
            >
                <View>
                    <CardSection>
                        <Text style={styles.titleStyle}>{this.props.library.title}</Text>
                    </CardSection>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
}

const mapStateToProps = (state, props) => {
    const expanded = state.selectedLibraryId === props.library.id;

    return { expanded };
}

export default connect(mapStateToProps, actions)(ListItem);