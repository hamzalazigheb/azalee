import { NextResponse } from 'next/server';

// Free API endpoint using Yahoo Finance (no API key required)
const YAHOO_FINANCE_BASE = 'https://query1.finance.yahoo.com/v8/finance/chart';

// Symbols mapping
const SYMBOLS = {
  cac40: '^FCHI',      // CAC 40
  sp500: '^GSPC',      // S&P 500
  msciWorld: 'URTH'    // iShares MSCI World ETF (proxy for MSCI World)
};

async function fetchYahooFinanceData(symbol) {
  try {
    // Utiliser interval=1m pour des données plus fréquentes (1 minute)
    const url = `${YAHOO_FINANCE_BASE}/${symbol}?interval=1m&range=1d`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://finance.yahoo.com/'
      },
      // ✅ Désactiver le cache pour données en temps réel
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.chart || !data.chart.result || data.chart.result.length === 0) {
      throw new Error('No data returned from API');
    }

    const result = data.chart.result[0];
    const quote = result.indicators?.quote?.[0];
    const meta = result.meta;

    if (!quote || !meta) {
      throw new Error('Invalid data structure');
    }

    // ✅ Prioriser le prix réel du marché (regularMarketPrice)
    // Si le marché est fermé, utiliser le dernier prix disponible
    const currentPrice = meta.regularMarketPrice || 
                        meta.previousClose || 
                        meta.chartPreviousClose || 
                        0;
    
    // ✅ Prix de clôture précédent pour calculer le changement
    const previousClose = meta.previousClose || meta.chartPreviousClose || currentPrice;
    const change = currentPrice - previousClose;
    const changePercent = previousClose !== 0 ? (change / previousClose) * 100 : 0;

    // ✅ Vérifier si le marché est ouvert
    // REGULAR = marché ouvert, CLOSED = fermé, PRE/POST = avant/après heures
    const isMarketOpen = meta.marketState === 'REGULAR' || 
                        meta.marketState === 'PRE' || 
                        meta.marketState === 'POST';
    
    const marketState = meta.marketState || 'UNKNOWN';

    return {
      value: currentPrice,
      change: changePercent,
      previousClose: previousClose,
      isMarketOpen: isMarketOpen,
      marketState: marketState,
      // Timestamp de la dernière mise à jour
      lastUpdate: meta.regularMarketTime || Date.now()
    };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return null;
  }
}

export async function GET() {
  try {
    // Fetch all market data in parallel
    const [cac40Data, sp500Data, msciWorldData] = await Promise.all([
      fetchYahooFinanceData(SYMBOLS.cac40),
      fetchYahooFinanceData(SYMBOLS.sp500),
      fetchYahooFinanceData(SYMBOLS.msciWorld)
    ]);

    // Calculate average return (historical S&P 500 average ~7% annually)
    const averageReturn = 7.0;

    return NextResponse.json({
      success: true,
      data: {
        cac40: cac40Data || { value: 0, change: 0, isMarketOpen: false, marketState: 'UNKNOWN' },
        sp500: sp500Data || { value: 0, change: 0, isMarketOpen: false, marketState: 'UNKNOWN' },
        msciWorld: msciWorldData || { value: 0, change: 0, isMarketOpen: false, marketState: 'UNKNOWN' },
        averageReturn: averageReturn,
        lastUpdated: new Date().toISOString()
      }
    }, {
      // ✅ Désactiver le cache côté réponse
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error fetching market data:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch market data',
        data: {
          cac40: { value: 7245.69, change: 1.2 },
          sp500: { value: 4783.35, change: 0.8 },
          msciWorld: { value: 2156.78, change: 0.5 },
          averageReturn: 7.0
        }
      },
      { status: 500 }
    );
  }
}

