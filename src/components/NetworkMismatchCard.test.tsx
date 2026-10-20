import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NetworkMismatchCard from './NetworkMismatchCard';

describe('NetworkMismatchCard', () => {
  it('renders only when the wallet network does not match', () => {
    const { rerender } = render(<NetworkMismatchCard networkMismatch={false} />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    rerender(<NetworkMismatchCard networkMismatch />);
    expect(screen.getByRole('status')).toHaveTextContent('Switch to Testnet in Freighter');
  });

  it('shows network switching help when requested', () => {
    render(<NetworkMismatchCard networkMismatch />);

    const helpButton = screen.getByRole('button', { name: 'Why am I seeing this?' });
    expect(helpButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText(/This app uses Stellar Testnet/)).not.toBeInTheDocument();

    fireEvent.click(helpButton);

    expect(screen.getByRole('button', { name: 'Hide help' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    expect(screen.getByText(/This app uses Stellar Testnet/)).toBeInTheDocument();
  });

  it('dismisses the network warning', () => {
    render(<NetworkMismatchCard networkMismatch />);

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss network warning' }));

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
