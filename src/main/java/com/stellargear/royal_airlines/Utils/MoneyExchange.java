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

    public Money convertCOPtoUSD (double copValue) {
        Money cop = Money.of(CurrencyUnit.of("COP"),  new BigDecimal(copValue));
        BigDecimal convertedAmount = cop.getAmount().divide(COP_EXCHANGE_RATE, 2, RoundingMode.HALF_UP);
        return Money.of(CurrencyUnit.USD, convertedAmount);
    }

    public Money calculateFees (double fees, double basePrice) {
        Money amount = Money.of(CurrencyUnit.USD, basePrice);
        Money totalPrice = amount.multipliedBy(fees, RoundingMode.DOWN);
        return totalPrice.convertedTo(CurrencyUnit.of("COP"), COP_EXCHANGE_RATE, RoundingMode.DOWN);
    }

    public double getAmountFromMoney (double value) {
        Money valueToExtract = convertCOPtoUSD(value);
        return valueToExtract.getAmount().doubleValue();
    }
}
