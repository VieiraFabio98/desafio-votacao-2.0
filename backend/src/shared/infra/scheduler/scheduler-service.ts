import cron, { ScheduledTask } from "node-cron"

class SchedulerService {
  private jobs: Map<string, ScheduledTask> = new Map()

  scheduleJob(id: string, date: Date, callBack: () => void) {
    const seconds = date.getSeconds()
    const minutes = date.getMinutes()
    const hours = date.getHours()
    const day = date.getDate()
    const month = date.getMonth() + 1 
    const year = date.getFullYear()

    const expression = `${seconds} ${minutes} ${hours} ${day} ${month} *`
    console.log(`⏰ Agendando job ${id} para: ${expression}`)

    const task = cron.schedule(expression, () => {
      callBack()
      this.jobs.get(id)?.stop()
      this.jobs.delete(id)
    })

    this.jobs.set(id, task)
  }

  calcelJob(id: string) {
    this.jobs.get(id)?.stop()
    this.jobs.delete(id)
  }
}

export const schedulerService = new SchedulerService()