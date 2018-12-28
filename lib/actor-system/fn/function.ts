import Actor from '../actor'
import ActorSystem from '../actor-system'

export default class FunctionActor extends Actor {
  public static for(system: ActorSystem, fn: any): (...args: any[]) => Promise<any> {
    const actor = system.actorOf(FunctionActor, [fn])
    // tslint:disable-next-line
    return function() {
      return actor.execute.apply((actor as any).ref, (arguments as unknown) as any[])
    }
  }

  private fn: (...args: any[]) => Promise<any>

  constructor(fn: (...args: any[]) => Promise<any>) {
    super()
    this.fn = fn
  }

  public async execute(...args: any[]): Promise<any> {
    return await this.fn.apply(this, args)
  }
}
