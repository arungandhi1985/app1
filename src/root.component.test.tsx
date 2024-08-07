import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App1 from "./root.component";


// Mock the @verint/utils module
jest.mock('@verint/utils', () => {
  const { Subject } = require('rxjs');
  const mockSubject = new Subject();

  return {
    sendMessage: jest.fn(),
    getMessage: jest.fn(() => mockSubject.asObservable()),
    mockSubject,
  };
});

describe('App1 Component', () => {
  let utils: any;

  beforeEach(() => {
    utils = require('@verint/utils');
    utils.mockSubject.next();
  });

  it('renders without crashing', () => {
    render(<App1 name="App1" />);
    expect(screen.getByText('App1')).toBeInTheDocument();
    expect(screen.getByText('App1 is mounted!')).toBeInTheDocument();
    expect(screen.getByText('Send Message to app2')).toBeInTheDocument();
    expect(screen.getByText('Messages from app2:')).toBeInTheDocument();
  });

  it('displays messages from App2', async () => {
    render(<App1 name="App1" />);

    // Simulate a message from App2
    const mockMessage = {
      from: 'App2',
      text: 'Hello from App2',
    };

    act(() => {
      utils.mockSubject.next(mockMessage);
    });


    // Wait for the message to appear in the DOM
    await waitFor(() => {
      expect(screen.getByText('Hello from App2')).toBeInTheDocument();
    });
  });

  it('sends a message when the button is clicked', () => {
    const { sendMessage } = utils;
    render(<App1 name="App1" />);

    // Click the button to send a message to App2
    fireEvent.click(screen.getByText('Send Message to app2'));

    expect(sendMessage).toHaveBeenCalledWith(expect.objectContaining({ from: 'App1', text: expect.any(String) }));
  });
});
