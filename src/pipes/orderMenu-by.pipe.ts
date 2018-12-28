import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'orderByMenu' })
export class OrderMenuByPipe implements PipeTransform {

    transform(records: Array<any>, args?: any): any {

        // console.log("records: ", records)
        // console.log("property: ", args.property)
        // console.log("direction: ", args.direction)


        if (records instanceof Array) {

            return records.sort(function (a, b) {

                if (a[args.property] != undefined) {

                    if (a[args.property] < b[args.property]) {
                        return -1 * args.direction
                    } else if (a[args.property] > b[args.property]) {
                        return 1 * args.direction
                    } else {
                        return 0
                    }

                } else {
                    return 0
                }

            })

        } else {

            return 0

        }

    }

}

