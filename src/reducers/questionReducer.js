const DUMMY_STATE = {
  questions : [
    {
      stimulus: `Here is my store.js calling the routerMiddleware. Here is my rootReducer applying the routerReducer
      Here is my App.js component calling and firing push. Now the action gets dispatched with this error:`,
      stem: `Cannot read property 'push' of undefined`,
      choices: [
        `import rootReducer from '../reducers'`,
        `import { render as mount } from 'react-dom'`,
        `sync store and routing history`,
        `const root = document.getElementById`,
        `import { combineReducers } from 'redux'`
      ],
      right_choice: 1
    },
    {
      stimulus: `Here is my store.js calling the routerMiddleware. Here is my rootReducer applying the routerReducer
      Here is my App.js component calling and firing push. Now the action gets dispatched with this error:`,
      stem: `Cannot read property 'push' of undefined`,
      choices: [
        `import rootReducer from '../reducers'`,
        `import { render as mount } from 'react-dom'`,
        `sync store and routing history`,
        `const root = document.getElementById`,
        `import { combineReducers } from 'redux'`
      ],
      right_choice: 4
    },
    {
      stimulus: `Here is my store.js calling the routerMiddleware. Here is my rootReducer applying the routerReducer
      Here is my App.js component calling and firing push. Now the action gets dispatched with this error:`,
      stem: `Cannot read property 'push' of undefined`,
      choices: [
        `import rootReducer from '../reducers'`,
        `import { render as mount } from 'react-dom'`,
        `sync store and routing history`,
        `const root = document.getElementById`,
        `import { combineReducers } from 'redux'`
      ],
      right_choice: 6
    },
  ],
};

export default function (state = DUMMY_STATE, action) {
  switch(action.type) {
    default:
      return state;
  }
}