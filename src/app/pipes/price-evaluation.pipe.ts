import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'priceEvaluation'
})
export class PriceEvaluationPipe implements PipeTransform{
  transform(value: number, currencyValue: string): any {

    if(currencyValue === 'USD' || currencyValue === 'SGD' || currencyValue === 'CNY') {
      return Math.round(value);
    }

    else if ( currencyValue === 'KRW') {
      return Math.round(value/100)*100;
    }

    return value
  }

}
