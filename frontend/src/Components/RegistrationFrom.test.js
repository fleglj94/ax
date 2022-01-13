import {render, fireEvent, screen} from '@testing-library/react';
import RegistrationForm from "./RegistrationForm";


describe('RegistrationForm', () => {
    it('should render', () => {
        render(<RegistrationForm/>);
        const heading = screen.getByTestId('heading');
        const fName = screen.getByTestId('fName');
        const lName = screen.getByTestId('lName');
        const email = screen.getByTestId('email');
        const password = screen.getByTestId('password');
        const button = screen.getByTestId('button');
        expect(heading).toBeInTheDocument();
        expect(fName).toBeInTheDocument();
        expect(lName).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it('should be able to write to inputs', () => {
        render(<RegistrationForm/>);
        const fName = screen.getByTestId('fName');
        const lName = screen.getByTestId('lName');
        const email = screen.getByTestId('email');
        const password = screen.getByTestId('password');
        const button = screen.getByTestId('button');
        const error = screen.getByTestId('error');
        fireEvent.change(email, {target: {value: 'test@test.com'}});
        fireEvent.change(password, {target: {value: 'secret'}});
        fireEvent.change(fName, {target: {value: 'test'}});
        fireEvent.change(lName, {target: {value: 'testLast'}});
        expect(email.value).toBe('test@test.com');
        expect(password.value).toBe('secret');
        expect(fName.value).toBe('test');
        expect(lName.value).toBe('testLast');
        fireEvent.click(button);
        expect(error).toHaveTextContent('');
    });

    it('should throw error without a valid inputs', () => {
        render(<RegistrationForm/>);
        const button = screen.getByTestId('button');
        const error = screen.getByTestId('error');
        fireEvent.click(button);
        expect(error).toHaveTextContent('All inputs are required!');
    });

    it('should throw error if name is too long', () => {
        render(<RegistrationForm/>);
        const fName = screen.getByTestId('fName');
        const lName = screen.getByTestId('lName');
        const email = screen.getByTestId('email');
        const password = screen.getByTestId('password');
        const button = screen.getByTestId('button');
        const error = screen.getByTestId('error');
        fireEvent.change(email, {target: {value: 'test@test.com'}});
        fireEvent.change(password, {target: {value: 'secret'}});
        fireEvent.change(fName, {target: {value: 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest'}});
        fireEvent.change(lName, {target: {value: 'testLast'}});
        fireEvent.click(button);
        expect(error).toHaveTextContent('First name or Last name cannot be longer than 50 characters');
    });

    it('should throw error if email is not valid', () => {
        render(<RegistrationForm/>);
        const fName = screen.getByTestId('fName');
        const lName = screen.getByTestId('lName');
        const email = screen.getByTestId('email');
        const password = screen.getByTestId('password');
        const button = screen.getByTestId('button');
        const error = screen.getByTestId('error');
        fireEvent.change(email, {target: {value: 'test@test'}});
        fireEvent.change(password, {target: {value: 'secret'}});
        fireEvent.change(fName, {target: {value: 'test'}});
        fireEvent.change(lName, {target: {value: 'testLast'}});
        fireEvent.click(button);
        expect(error).toHaveTextContent('Please enter a valid email');
    });

    it('should throw error if password is too short', () => {
        render(<RegistrationForm/>);
        const fName = screen.getByTestId('fName');
        const lName = screen.getByTestId('lName');
        const email = screen.getByTestId('email');
        const password = screen.getByTestId('password');
        const button = screen.getByTestId('button');
        const error = screen.getByTestId('error');
        fireEvent.change(email, {target: {value: 'test@test.com'}});
        fireEvent.change(password, {target: {value: 'test'}});
        fireEvent.change(fName, {target: {value: 'test'}});
        fireEvent.change(lName, {target: {value: 'testLast'}});
        fireEvent.click(button);
        expect(error).toHaveTextContent('Password must be at least 6 characters!');

    });

})

