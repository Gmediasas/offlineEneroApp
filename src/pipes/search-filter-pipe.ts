import {Pipe, PipeTransform} from '@angular/core'

@Pipe({  name: 'searchfilter' })
export class SearchFilterPipe implements PipeTransform {

  transform(items: Array <any>, field: string, value: string): any[] {
 
    // console.log("searchfilter....")
    // console.log(`Items: `, items )
    // console.log(`Field: ${field}` )
    // console.log(`Value: ${value}` )

    if (!items || value === '') {

        //Return all items
        return items 
        
    }else{

        // filter items with value search
        return items.filter(it => it[field].toLowerCase().indexOf(value.toLowerCase()) > -1 )

    }

  }

  applyFilter(item,field, filter): boolean {
    
    // console.log(`applyFilter`,item)
    // console.log(item[field])
        
    if (item[field].toLowerCase().indexOf(filter.toLowerCase()) === -1) {
        return false
    }

    if (item[field] !== filter[field]) {
        return false
    }

    return true

  }

}

