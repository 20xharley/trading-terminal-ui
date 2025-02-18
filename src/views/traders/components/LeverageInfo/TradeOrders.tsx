import React, { useState } from 'react';
import { NoData } from '../../../../components/NoData';
import { TokenSide } from '../../../../components/TokenSide';
import { formatCurrency } from '../../../../utils/numbers';
import { OrderType } from '../../../../utils/type';
import { useTradeOrders } from './hooks/useTradeOrders';
import { Loading } from '../../../../components/Loading';
import { chainLogos } from '../../../../utils/constant';
import { chainOptions } from '../../../positions/hooks/usePositionsConfig';
interface TradeOrdersProps {
  wallet: string;
}
export const TradeOrders: React.FC<TradeOrdersProps> = ({ wallet }) => {
  const [chainId, setChainId] = useState<number>();

  const { items, loading } = useTradeOrders({
    wallet: wallet,
    page: 1,
    size: 999,
    chainId: chainId,
  });

  return (
    <div>
      <div className="flex flex-col xl:(flex-row justify-between)">
        <div />
        <div className="flex mb-12px xl:mb-0 w-100% xl:w-auto items-center color-#cdcdcd text-14px font-700">
          {chainOptions.map(({ label, value }, i) => {
            const active = value === chainId;
            const color = active ? 'color-black' : 'color-white';
            const bg = active ? 'bg-primary' : 'bg-#d9d9d9 bg-opacity-10';
            return (
              <div
                key={i}
                className={`${color} ${bg} uppercase text-12px px-14px min-w-82px h-32px mx-5px rounded-10px flex items-center justify-center font-700 cursor-pointer hover-opacity-75`}
                onClick={() => {
                  setChainId(value);
                }}
              >
                {chainLogos[value] && (
                  <img className="mr-6px" src={chainLogos[value]} width={12} height={12} />
                )}
                {label}
              </div>
            );
          })}
        </div>
      </div>
      {loading && !items.length ? (
        <div className="h-250px flex items-center justify-center">
          <div className="w-300px">
            <Loading />
          </div>
        </div>
      ) : !items.length ? (
        <div className="h-250px flex justify-center items-center">
          <NoData />
        </div>
      ) : (
        <div className="relative">
          <div className="xl:table w-100% xl:border-spacing-y-12px">
            <div className="hidden xl:table-row [&>.table-cell]:px-17px">
              <label className="table-cell text-14px color-#cdcdcd">Order Type</label>
              <label className="table-cell text-14px color-#cdcdcd">Type</label>
              <label className="table-cell text-14px color-#cdcdcd">Order</label>
              <label className="table-cell text-14px color-#cdcdcd">Trigger Condition</label>
              <label className="table-cell text-14px color-#cdcdcd">Mark Price</label>
            </div>
            {items.map((item, i) => (
              <div
                className="xl:table-row xl:h-56px [&>.vertical-middle]:px-17px [&:hover>.vertical-middle]:bg-#5E5E5E"
                key={i}
              >
                <div className="xl:hidden bg-#34343B p-14px rounded-10px mb-12px">
                  <div className="b-b-1px b-dashed b-#5E5E5E pb-10px flex justify-between">
                    <TokenSide
                      side={item.side}
                      size={'md'}
                      symbol={item.indexToken.symbol}
                      chainId={item.chainId}
                    />
                  </div>
                  <div className="flex justify-between text-14px mt-14px">
                    <label className="color-#cdcdcd">Type</label>
                    <label className="color-white">{OrderType[item.type]}</label>
                  </div>
                  <div className="flex justify-between text-14px mt-14px">
                    <label className="color-#cdcdcd">Order</label>
                    <label className="color-white">{item.action}</label>
                  </div>
                  <div className="flex justify-between text-14px mt-14px">
                    <label className="color-#cdcdcd">Condition</label>
                    <label className="color-white">{item.triggerCondition}</label>
                  </div>
                  <div className="flex justify-between text-14px mt-14px">
                    <label className="color-#cdcdcd">Mark Price</label>
                    <label className="color-white">{formatCurrency(item.markPrice)}</label>
                  </div>
                </div>

                <div className="hidden xl:table-cell vertical-middle bg-#34343B rounded-l-10px">
                  <TokenSide
                    side={item.side}
                    size={'md'}
                    symbol={item.indexToken.symbol}
                    chainId={item.chainId}
                  />
                </div>
                <div className="hidden xl:table-cell vertical-middle bg-#34343B">
                  <label className="color-white">{OrderType[item.type]}</label>
                </div>
                <div className="hidden xl:table-cell vertical-middle bg-#34343B">
                  <label className="color-white">{item.action}</label>
                </div>
                <div className="hidden xl:table-cell vertical-middle bg-#34343B">
                  <label className="color-white">{item.triggerCondition}</label>
                </div>
                <div className="hidden xl:table-cell vertical-middle bg-#34343B rounded-r-10px">
                  <label className="color-white">{formatCurrency(item.markPrice)}</label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
