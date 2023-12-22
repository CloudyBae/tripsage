import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home', () => {
    it('should contain the text "Create New Travel Plan"', () => {
        // Arrange
        render(<Home />) 
        // Act
        const myElem = screen.getByText('Create New Travel Plan')
        // Assert
        expect(myElem).toBeInTheDocument();
    })
    it('"Create New Travel Plan" should link to the correct route', () => {
        // Arrange
        render(<Home />) 
        // Act
        const myElem = screen.getByRole('link', { name: 'Create New Travel Plan' })
        // Assert
        expect(myElem).toHaveAttribute('href', '/plan')
    })
    it('should contain the text "View Past Plans"', () => {
        // Arrange
        render(<Home />) 
        // Act
        const myElem = screen.getByText('View Past Plans')
        // Assert
        expect(myElem).toBeInTheDocument();
    })
    it('should have a heading', () => {
        // Arrange
        render(<Home />) 
        // Act
        const myElem = screen.getByRole('heading', {
            name: 'TripSage'
        })
        // Assert
        expect(myElem).toBeInTheDocument();
    })
})
