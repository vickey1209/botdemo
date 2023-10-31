import QUEUE from "bull";
import { BULLKEYS} from "../../constants";
import {redisData} from '../../connections/redisConnection'
import {userTurnStarted} from '../../playing/userTurnStarted'

const delayTimer = (data: any) => {
    console.log('delayTimer ======================', data)
    let roundQueue = new QUEUE(BULLKEYS.ROUND_TIMER_START, redisData)
    let options = {
        delay:data.time,
        jobId: data.jobId,
        attempts: 1
    }

    roundQueue.add(data, options)
    roundQueue.process(async (jobData: any) => {
        console.log('jobData-============', jobData.data)
        userTurnStarted(jobData.data.tableId)
    })
}

export { delayTimer }
