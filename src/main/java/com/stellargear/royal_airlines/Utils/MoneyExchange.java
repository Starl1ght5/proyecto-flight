package com.stellargear.royal_airlines.Utils;

import org.joda.money.CurrencyUnit;
import org.joda.money.Money;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class MoneyExchange {

    private static final BigDecimal COP_EXCHANGE_RATE = new BigDecimal("4000.00");


    public Money convertUSDtoCOP (double usdValue) {
        Money usd = Money.of(CurrencyUnit.USD, usdValue);
        return usd.convertedTo(CurrencyUnit.of("COP"), COP_EXCHANGE_RATE, RoundingMode.DOWN);
    }

    public Money calculateFees (double fees, double basePrice) {
        Money amount = Money.of(CurrencyUnit.USD, basePrice);
        Money totalPrice = amount.multipliedBy(fees, RoundingMode.DOWN);
        return totalPrice.convertedTo(CurrencyUnit.of("COP"), COP_EXCHANGE_RATE, RoundingMode.DOWN);
    }
}
