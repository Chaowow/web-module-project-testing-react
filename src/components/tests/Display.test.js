import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import mockFetchShow from './../../api/fetchShow'

jest.mock('./../../api/fetchShow');

const exampleShowData = {
    name: 'Name of show',
    summary: 'Summary of show',
    seasons: [
        {
            id: 1,
            season: 'Season 1',
            episodes: []
        },
        {
            id: 2,
            season: 'Season 2',
            episodes: []
        }
    ]
};

test('renders without errors with no props', async () => {
    render(<Display />);
 });

test('renders Show component when the button is clicked ', async () => {
    mockFetchShow.mockResolvedValueOnce(exampleShowData);

    render(<Display />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    const show = await screen.findByTestId('show-container');

    expect(show).toBeInTheDocument();
 });

test('renders show season options matching your data when the button is clicked', async () => {
    mockFetchShow.mockResolvedValueOnce(exampleShowData);

    render(<Display />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId('season-option')
        expect(seasonOptions).toHaveLength(2);
      });
 });

 test('displayFunc is called when the fetch button is pressed', async () => {
    mockFetchShow.mockResolvedValueOnce(exampleShowData);
    const displayFunc = jest.fn();

    render(<Display displayFunc={displayFunc}/>);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled();
    })
 });

