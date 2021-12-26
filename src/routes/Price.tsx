import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";

const Prices = styled.div``;

const PriceList = styled.div`
  display: flex;
  border-radius: 25px;
  height: 50px;
  margin: 10px 0;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  background-color: ${(props) => props.theme.tabColor};
`;

const PriceName = styled.span`
  color: ${(props) => props.theme.textColor};
`;
const PriceValue = styled.span`
  color: ${(props) => props.theme.accentColor};
`;
interface IPriceProps {
  coinId: string | undefined;
}

interface PriceInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
function Price({ coinId }: IPriceProps) {
  const { isLoading, data } = useQuery<PriceInfoData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  return (
    <>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <Prices>
          <PriceList>
            <PriceName>Current Prices : </PriceName>
            <PriceValue>${data?.quotes.USD.price.toFixed(2)}</PriceValue>
          </PriceList>
          <PriceList>
            <PriceName>Maximum Price : </PriceName>
            <PriceValue>${data?.quotes.USD.ath_price.toFixed(2)}</PriceValue>
          </PriceList>
          <PriceList>
            <PriceName>Percent Change 24 Hourss : </PriceName>
            <PriceValue>
              ${data?.quotes.USD.percent_change_24h.toFixed(2)}
            </PriceValue>
          </PriceList>
          <PriceList>
            <PriceName>Percent Change 7 days : </PriceName>
            <PriceValue>
              ${data?.quotes.USD.percent_change_7d.toFixed(2)}
            </PriceValue>
          </PriceList>
        </Prices>
      )}
    </>
  );
}

export default Price;
