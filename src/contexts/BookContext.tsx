import React, { createContext, useContext } from 'react';
import { supabaseClient } from '../utility/supabaseClient'; // Import the Supabase client instance

type CheckoutRecord = {
  id: string;
  book_copy_id: number;
  patron_account_id: number;
  is_returned: boolean;
  return_date: string;
};

type FineDetails = {
  id: string;
  book_copy_id: number;
  patron_account_id: number;
  is_returned: boolean;
  fine: number;
  due_date: string;
}[];

type BookContextType = {
  decreaseBookCopyCount: (bookCopyId: number) => Promise<void>;
  calculateOverdueFine: () => Promise<FineDetails>;
};

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBookContext = (): BookContextType => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
};

type BookProviderProps = {
  children: React.ReactNode;
};

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const decreaseBookCopyCount = async (bookCopyId: number) => {
    // Implement the decreaseBookCopyCount function logic here
    // Make the necessary API calls to execute the function

    // Example implementation:
    try {
      const response = await fetch(`/api/decreaseBookCopyCount?book_copy_id=${bookCopyId}`);
      if (!response.ok) {
        throw new Error('Failed to decrease book copy count');
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  const calculateOverdueFine = async () => {
    try {
      const { data, error } = await supabaseClient
        .from('checkout')
        .select('*')
        .eq('return_status', false);

      if (error) {
        throw new Error('Failed to fetch overdue records');
      }

      const currentDate = new Date();
      const fineDetails: FineDetails = [];

      if (data && data.length) {
        data.forEach((record: any) => {
          const returnDate = new Date(record.return_date);
          const timeDiff = Math.abs(currentDate.getTime() - returnDate.getTime());
          const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
          const fineAmount = daysDiff * 10; // Assuming the fine amount is Rs. 10 per day

          fineDetails.push({
            id: record.id,
            book_copy_id: record.book_copy_id,
            patron_account_id: record.patron_account_id,
            is_returned: record.is_returned,
            fine: fineAmount,
            due_date: record.return_date,
          });
        });
      }

      return fineDetails;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  const contextValue: BookContextType = {
    decreaseBookCopyCount,
    calculateOverdueFine,
  };

  return <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>;
};
