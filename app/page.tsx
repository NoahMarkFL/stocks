import { InteractiveStockChart } from "@/components/InteractiveStockChart";
import { StockSelector } from "@/components/StockSelector";
import { ThemeToggle } from "@/components/theme-toggle";
import { getStockData } from "@/lib/get-stock-data";
import { companies } from "@/lib/stock-data";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Home({
  searchParams,
}: {
  searchParams: { ticker?: string };
}) {
  const ticker = searchParams.ticker || companies[0].ticker;
  const stockData = getStockData(ticker);

  return (
    <div className="min-h-screen pt-6 pb-12 lg:px-12 px-3">
      <nav className="w-full flex flex-row gap-2 justify-end">
        <ThemeToggle />
      </nav>
      <main className="w-full pt-20 flex gap-4 mx-auto max-w-screen-lg flex-col items-center">
        <StockSelector />
        <ErrorBoundary
          fallback={
            <span className="text-sm text-red-600">
              Error with Polygon.io API 😅 - Please try again later.
            </span>
          }
        >
          <Suspense
            fallback={
              <span className="justify-self-center self-center text-sm text-white">
                Fetching price…
              </span>
            }
          >
            <InteractiveStockChart chartData={stockData} ticker={ticker} />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
