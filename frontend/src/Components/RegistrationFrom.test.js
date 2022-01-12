import {render, fireEvent} from '@testing-library/react';
import RegistrationForm from "./RegistrationForm";


const {queryByTestId} = render(<RegistrationForm/>);
const heading  = queryByTestId('heading');
const fName = queryByTestId('fName');
const lName = queryByTestId('lName');
const email = queryByTestId('email');
const password = queryByTestId('password');
const button = queryByTestId('button');
const error = queryByTestId('error');

it('should render',  () => {
    expect(heading).toBeDefined();
    expect(fName).toBeDefined();
    expect(lName).toBeDefined();
    expect(email).toBeDefined();
    expect(password).toBeDefined();
    expect(button).toBeDefined();
});

it ('should be able to write to inputs', () => {
    fireEvent.change(email, {target: {value: 'test@test.com'}});
    fireEvent.change(password, {target: {value: 'secret'}});
    fireEvent.change(fName, {target: {value: 'test'}});
    fireEvent.change(lName, {target: {value: 'testLast'}});
    expect(email.value).toBe('test@test.com');
    expect(password.value).toBe('secret');
    expect(fName.value).toBe('test');
    expect(lName.value).toBe('testLast');
});