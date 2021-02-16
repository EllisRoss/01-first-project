import {act, render, screen} from '@testing-library/react';
import SocialNetworkApp from "./App";
import ReactDOM from 'react-dom';

test('renders learn react link', () => {
  // render(<SocialNetworkApp />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();


  act(() => {
    /* fire events that update state */
    const div = document.createElement('div');
    ReactDOM.render(<SocialNetworkApp/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

});
