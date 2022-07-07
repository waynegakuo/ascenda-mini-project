import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'savings'
})

export class SavingsPercentagePipe implements PipeTransform{
  transform(value: number, ourPrice: number): any {

    if(value > ourPrice){
      const difference = value - ourPrice;
      value = difference / value * 100
      return `Save ${Math.round(value *10)/10}% with us`
    }

    return false
  }

}
