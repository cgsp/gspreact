import React, { Component } from 'react'

// export function asyncComponent(importComponent) {
//   class AsyncComponent extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         component: null
//       };
//     }
//     /* eslint-disable */
//     async componentDidMount() {
//       const { default: component } = await importComponent();

//       this.setState({
//         component: component
//       });
//     }
//     /* eslint-enable */

//     /* eslint-disable */
//     render() {
//       const Component = this.state.component;

//       return Component ? <Component {...this.props} /> : null;
//     }
//     /* eslint-enable */
//   }

//   return AsyncComponent;
// }

/* eslint-disable */
export const asyncComponent = loadComponent => (
  class AsyncComponent extends Component {
    state = {
      Component: null,
    }

    componentWillMount() {
      if (this.hasLoadedComponent()) {
        return;
      }

      loadComponent()
        .then(module => module.default)
        .then((Component) => {
          this.setState({ Component });
        })
        .catch((err) => {
          console.error(`Cannot load component in <AsyncComponent />`);
          throw err;
        });
    }

    hasLoadedComponent() {
      return this.state.Component !== null;
    }

    render() {
      const { Component } = this.state;
      return (Component) ? <Component {...this.props} /> : null;
    }
  }
);
/* eslint-enable */
