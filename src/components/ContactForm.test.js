import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header = screen.queryByText('Contact Form');
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/Contact Form/);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, 'abc');
    const errorMsg = screen.queryByText(/error:/i);
    expect(errorMsg).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const buddon = screen.getByRole('button');
    userEvent.click(buddon);
    const firstError = screen.queryByText(/Error: firstName must have at least 5 characters./i);
    expect(firstError).toBeInTheDocument();
    const secondError = screen.queryByText(/Error: email must be a valid email address./i);
    expect(secondError).toBeInTheDocument();
    const thirdError = screen.queryByText(/Error: lastName is a required field./i);
    expect(thirdError).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/First Name*/i);
    const lastName = screen.getByLabelText(/Last Name*/i);
    userEvent.type(firstName, 'Beanza');
    userEvent.type(lastName, 'Beanza');
    const buddon = screen.getByRole('button');
    userEvent.click(buddon); 
    const secondError = screen.queryByText(/Error: email must be a valid email address./i);
    expect(secondError).toBeInTheDocument();   
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, 'Beanza');
    const secondError = screen.queryByText(/Error: email must be a valid email address./i);
    expect(secondError).toBeInTheDocument();   
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    const buddon = screen.getByRole('button');
    userEvent.click(buddon); 
    const lastName = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastName, ' ');
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/First Name*/i);
    const lastName = screen.getByLabelText(/Last Name*/i);
    const email = screen.getByLabelText(/Email*/i);
    const buddon = screen.getByRole('button');
    userEvent.type(firstName, 'Beanza');
    userEvent.type(lastName, 'Burnt');
    userEvent.type(email, 'beenza@benza.com');
    userEvent.click(buddon);
    const one = screen.queryByText(/First Name:/i)
    const two = screen.queryByText(/Last Name:/i)
    const three = screen.queryByText(/Email:/i)
    expect(one).toBeInTheDocument();
    expect(two).toBeInTheDocument();
    expect(three).toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByLabelText(/First Name*/i);
    const lastName = screen.getByLabelText(/Last Name*/i);
    const email = screen.getByLabelText(/Email*/i);
    const message = screen.getByLabelText(/Message*/i)
    const buddon = screen.getByRole('button');
    userEvent.type(firstName, 'Beanza');
    userEvent.type(lastName, 'Burnt');
    userEvent.type(email, 'beenza@benza.com');
    userEvent.type(message, 'Beeenza')
    userEvent.click(buddon);
    const one = screen.queryByText(/First Name:/i)
    const two = screen.queryByText(/Last Name:/i)
    const three = screen.queryByText(/Email:/i)
    const four = screen.queryByText(/Message:/i)
    expect(one).toBeInTheDocument();
    expect(two).toBeInTheDocument();
    expect(three).toBeInTheDocument();
    expect(four).toBeInTheDocument();
});