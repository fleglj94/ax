import {render, fireEvent} from '@testing-library/react';
import LoginForm from "./LoginForm";


const {queryByTestId} = render(<LoginForm/>);
const heading  = queryByTestId('heading');
const email = queryByTestId('email');
const password = queryByTestId('password');
const button = queryByTestId('button');
const link = queryByTestId('link');
const error = queryByTestId('error');

it('renders component correctly', () => {
    expect(heading).toBeTruthy();
    expect(email).toBeTruthy();
    expect(password).toBeTruthy();
    expect(button).toBeTruthy();
    expect(button.innerHTML).toBe('Sign in')
    expect(link).toBeTruthy();
});

it ('should throw error without valid inputs', async () => {
    const {getByText} = render(<LoginForm/>);
    fireEvent.click(button);
    const message = error.textContent;
    expect(message).toBe('All inputs are required!');
})

it ('should be able to write to inputs', () => {
    fireEvent.change(email, {target: {value: 'test@test.com'}});
    fireEvent.change(password, {target: {value: 'secret'}});
    expect(email.value).toBe('test@test.com');
    expect(password.value).toBe('secret');
})


