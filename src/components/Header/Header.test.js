
import React from "react";
import { render, screen } from '@testing-library/react';
import Header from "../Header/header";
describe("Header component", () => {
    test('renders Header title', () => {
        render(<Header />);
        const title = screen.getByText('Welcome to Weather Statistics');
        expect(title).toBeInTheDocument();
      });
    });