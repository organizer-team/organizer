import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskItem from '../TaskItem';

test('renders task item correctly', () => {
  const task = {
    id: 1,
    title: 'Sample Task',
    duration: '1 hour',
    area: 'Work',
  };
  render(<TaskItem task={task} />);

  expect(screen.getByText('Sample Task')).toBeInTheDocument();
  expect(screen.getByText('1 hour')).toBeInTheDocument();
  expect(screen.getByText('Work')).toBeInTheDocument();
});
