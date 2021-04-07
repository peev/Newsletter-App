import { CREATE_FEED, GET_ALL_FEEDS, GET_FEED, ADD_NEWSLETTER, REMOVE_NEWSLETTER, CLEAR_FEED } from '../actions/actionTypes';

const initialState = {
    feed: {
        _id: '',
        name: '',
        newsletters: [],
    },
    feeds: [],
};

const feedReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_FEED:
            return {
                ...state,
                feeds: [...state.feeds, action.payload],
            };
        case GET_FEED:
            return {
                ...state,
                feed: action.payload,
            };
        case GET_ALL_FEEDS:
            return {
                ...state,
                feeds: action.payload,
            };
        case ADD_NEWSLETTER:
            return {
                ...state,
                feed: {
                    ...state.feed,
                    newsletters: [...state.feed.newsletters, action.payload],
                },
            };
        case REMOVE_NEWSLETTER:
            return {
                ...state,
                feed: {
                    ...state.feed,
                    newsletters: state.feed.newsletters.filter((x) => x._id !== action.payload),
                },
            };
        case CLEAR_FEED:
            return {
                ...state,
                feed: initialState.feed,
            };
        default:
            return { ...state };
    }
};

export default feedReducer;
