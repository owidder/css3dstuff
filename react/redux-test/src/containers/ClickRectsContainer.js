import {connect} from 'react-redux';

import {addRect, doClick} from '../actions';
import ClickRects from '../components/ClickRects';

const mapStateToProps = state => {
    return {rects: state.rects}
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: id => {
            dispatch(doClick(id))
        },
        addRect: (props) => {
            dispatch(addRect(props))
        }
    }
}

const ClickRectsContainer = connect({
    mapStateToProps,
    mapDispatchToProps
})(ClickRects);

export default ClickRectsContainer;