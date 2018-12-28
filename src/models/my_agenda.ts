export class MyAgenda {

  constructor(){

  }
  
  saveMySchedule(schedules_data, conferences_data) {

    let save_schedule = []
    // console.log(`Conferences(storage)`, this.allSchedule)
    // console.log(`My Conferences(server):`,  this.conferences )

    if (schedules_data === null) {

      console.log("No hay conferencias en este evento")

    } else {

      conferences_data.forEach(conferences => {

        schedules_data.forEach(schedule_data => {

          console.log("xxx:",schedule_data)

          if(schedule_data.dataSchedls!==null){

            let schedule_found = schedule_data.dataSchedls.find(schedule => {

              return conferences.idConferencia == schedule.schdlUID;

            });

            if (schedule_found !== undefined && schedule_found !== null) {

              // console.log( `My conference: `, schedule_found )

              let schedule_exist = save_schedule.find(my_schedules => {

                return my_schedules.schdlUID == schedule_found.schdlUID;

              });

              if (schedule_exist == undefined && schedule_exist !== null && schedule_exist !== '') {

                schedule_found.dateStartSchdl = schedule_found.dateStartSchdl_UNIX
                schedule_found.dateFinishSchdl = schedule_found.dateFinishSchdl_UNIX

                save_schedule.push(schedule_found)

              } else {

                console.log("shedule all days and save")

              }

            }

            
          }
            
          // console.log( `conference: `, schedule_found )

        })

      })

    }

    console.log(save_schedule)
    return save_schedule

  }

}