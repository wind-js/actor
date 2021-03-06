/**
 * Copyright (c) 2018-present, tarant
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Actor from '../../../lib/actor-system/actor'
import IActorSupervisor, { SupervisionStrategies } from '../../../lib/actor-system/supervision/actor-supervisor'
import FailingActor from './failing-actor'
import uuid from '../../../lib/helper/uuid'

export default class ParentOfFailingActorActor extends Actor {
  private readonly customSupervisor: IActorSupervisor

  public constructor(supervisor: IActorSupervisor) {
    super(uuid())
    this.customSupervisor = supervisor
  }

  public supervise(actor: Actor, exception: any, message: any): SupervisionStrategies {
    return this.customSupervisor.supervise(actor, exception, message)
  }

  public async newFailingActor(ofException: any): Promise<FailingActor> {
    return this.actorOf(FailingActor, [ofException])
  }
}
