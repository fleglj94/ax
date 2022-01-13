import {render, fireEvent, screen} from '@testing-library/react';
import LoginForm from "./LoginForm";



describe('LoginForm', () => {

    it('should render',  () => {
        render(<LoginForm/>);
        const button = screen.getByTestId('button');
        const form = screen.getByTestId('form');
        const heading = screen.getByTestId('heading');
        const email = screen.getByTestId('email');
        const password = screen.getByTestId('password');
        expect(heading).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(form).toBeInTheDocument();
    });

    it ('should throw error without valid inputs',  () => {
        render(<LoginForm/>);
        const button = screen.getByTestId('button');
        const error = screen.getByTestId('error');
        fireEvent.click(button);
        expect(error).toHaveTextContent('All inputs are required!');
    })

    it ('should throw error if password is too short', () => {
        render(<LoginForm/>);
        const email = screen.getByTestId('email');
        const password = screen.getByTestId('password');
        const error = screen.getByTestId('error');
        const button = screen.getByTestId('button');
        fireEvent.change(email, {target: {value: 'test@test.com'}});
        fireEvent.change(password, {target: {value: 'lol'}});
        fireEvent.click(button);
        expect(error).toHaveTextContent('Password must be at least 6 characters!');
    })

    it ('should throw error if email is invalid', () => {
        render(<LoginForm/>);
        const email = screen.getByTestId('email');
        const password = screen.getByTestId('password');
        const error = screen.getByTestId('error');
        const button = screen.getByTestId('button');
        fireEvent.change(email, {target: {value: 'test@test'}});
        fireEvent.change(password, {target: {value: 'secret'}});
        fireEvent.click(button);
        expect(error).toHaveTextContent('Please enter a valid email');
    })

    it ('should not throw error with valid inputs', () => {
        render(<LoginForm/>);
        const email = screen.getByTestId('email');
        const password = screen.getByTestId('password');
        const error = screen.getByTestId('error');
        const button = screen.getByTestId('button');
        fireEvent.change(email, {target: {value: 'test@test.com'}});
        fireEvent.change(password, {target: {value: 'secret'}});
        fireEvent.click(button);
        expect(error).toHaveTextContent('');
    })
});









