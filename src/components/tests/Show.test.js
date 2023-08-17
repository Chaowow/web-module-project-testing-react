import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

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

test('renders without errors', () => {
    render(<Show show={exampleShowData} selectedSeason={'none'}/>);
 });

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} />);
    const loading = screen.getByTestId('loading-container');

    expect(loading).toBeInTheDocument();
 });

test('renders same number of options seasons are passed in', () => {
    render(<Show show={exampleShowData} selectedSeason={'none'}/>);
    const seasonOptions = screen.queryAllByTestId('season-option');

    expect(seasonOptions).toHaveLength(2);
 });

test('handleSelect is called when an season is selected', async () => {
    const handleSelect = jest.fn();

    render(<Show show={exampleShowData} selectedSeason={'none'} handleSelect={handleSelect} />);
    const select = screen.getByLabelText(/select a season/i);

    userEvent.selectOptions(select, ['2']);
    
    await waitFor(() => {
        expect(handleSelect).toBeCalledTimes(1);
      });
 });

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const { rerender } = render(<Show show={exampleShowData} selectedSeason={'none'} />);
    let episodes = screen.queryByTestId('episodes-container');

    expect(episodes).not.toBeInTheDocument();

    rerender(<Show show={exampleShowData} selectedSeason={1} />);
    episodes = screen.queryByTestId('episodes-container');

    expect(episodes).toBeInTheDocument();
 });


