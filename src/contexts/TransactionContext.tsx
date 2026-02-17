import { useEffect, useState, type ReactNode, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get("/transactions");

    const filtered = query
      ? response.data.filter((transaction: Transaction) =>
          transaction.description.toLowerCase().includes(query.toLowerCase()),
        )
      : response.data;

    setTransactions(filtered);
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { category, description, price, type } = data;
      const response = await api.post("transactions", {
        description,
        category,
        type,
        price,
        createdAt: new Date(),
      });

      setTransactions((state) => [response.data, ...state]);
    },
    [],
  );

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
