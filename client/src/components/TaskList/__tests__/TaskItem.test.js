import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskItem from '../TaskItem';

describe('TaskItem', () => {
  const task = {
    title: 'Sample Task',
    start_time: '2022-03-01T09:00:00.000Z',
    end_time: '2022-03-01T10:00:00.000Z',
    area: {
      title: 'Work',
      color_code: 'blue',
    },
  };

  beforeEach(() => {
    render(<TaskItem task={task} />);
  });

  it('renders task title correctly', () => {
    expect(screen.getByText('Sample Task')).toBeInTheDocument();
  });

  it('renders task time correctly', () => {
    // Adjust the time format according to your locale
    expect(screen.getByText('10:00 AM-11:00 AM')).toBeInTheDocument();
  });

  it('renders task area correctly', () => {
    expect(screen.getByText('Work')).toBeInTheDocument();
  });

  it('renders task area color correctly', () => {
    expect(
      document.querySelector(`.bg-${task.area.color_code}`)
    ).toBeInTheDocument();
  });
});
