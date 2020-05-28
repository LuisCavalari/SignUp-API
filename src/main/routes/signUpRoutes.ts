import { Router } from 'express'
import { makeSignUpController } from '../factories/singUp'
import { adaptRoute } from '../adapters/expressRouteAdapter'

export default (router: Router): void => {
  const signUpController = makeSignUpController()
  router.post('/signup', adaptRoute(signUpController))
}
